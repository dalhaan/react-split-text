import {
  Children,
  createElement,
  memo,
  PropsWithChildren,
  useEffect,
  useState,
  useRef,
  ReactNode,
} from 'react';
import gsap from 'gsap';

import { splitString } from './utils/splitString';
import { createContext, useContextSelector } from 'use-context-selector';

import { By } from './sharedTypes';

type SplitTextContextValue = {
  hasAnimationEnded: boolean;
  setHasAnimationEnded: (hasAnimationEnded: boolean) => void;
  by: By;
};

const SplitTextContext = createContext<SplitTextContextValue | null>(null);

type SplitTextProps = PropsWithChildren<{
  as?: any;
  by?: By;
  animate?: boolean;
}>;

export const SplitText = memo(
  ({
    as = 'span',
    by: localBy = 'WORD',
    animate = false,
    children,
  }: SplitTextProps) => {
    // Backup children to replace split text once animation has ended so screen readers don't have a hard time.
    const childrenBackup = useRef<ReactNode>(children);

    const [hasAnimationEnded, setHasAnimationEnded] = useState(false);

    const hasParentAnimationEnded = useContextSelector(
      SplitTextContext,
      (state) => Boolean(state?.hasAnimationEnded)
    );

    const parentBy = useContextSelector(SplitTextContext, (state) => state?.by);

    const by = parentBy || localBy;

    const onAnimationEnd = () => {
      setHasAnimationEnded(true);
    };

    const { ref } = useStaggerAnimation({
      enabled: animate,
      targets: by === 'WORD' ? '.word' : '.char',
      onComplete: onAnimationEnd,
    });

    return createElement(
      as,
      { ref },
      <SplitTextContext.Provider
        value={{ hasAnimationEnded, setHasAnimationEnded, by: localBy }}
      >
        {/* Render original children once animation has completed so screen readers don't have any issues */}
        {hasParentAnimationEnded || hasAnimationEnded
          ? childrenBackup.current
          : Children.map(children, (child) => {
              if (typeof child === 'string') {
                return splitString(child, by);
              } else {
                return <>{child}</>;
              }
            })}
      </SplitTextContext.Provider>
    );
  }
);

const useStaggerAnimation = ({
  enabled,
  targets,
  onComplete,
}: {
  enabled: boolean;
  targets: gsap.TweenTarget;
  onComplete?: () => void;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let context: gsap.Context | null = null;

    if (enabled) {
      context = gsap.context(() => {
        gsap.from(targets, {
          duration: 0.8,
          yPercent: 70,
          skewY: 8,
          opacity: 0,
          ease: 'back',
          stagger: 0.03,
          onComplete,
        });
      }, ref);
    }

    return () => {
      if (context) {
        context.revert();
      }
    };
  }, [enabled, targets]);

  return { ref };
};
