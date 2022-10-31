import {
  PropsWithChildren,
  useRef,
  useState,
  useLayoutEffect,
  createElement,
  ReactNode,
} from 'react';
import { splitLines } from './utils/splitLines';
import { splitString } from './utils/splitString';

export const SplitLine = ({
  as = 'span',
  children,
}: PropsWithChildren<{ as?: any }>) => {
  const ref = useRef<HTMLElement | null>(null);

  const [wrappedLines, setWrappedLines] = useState<ReactNode[] | null>(null);

  if (typeof children !== 'string') {
    console.warn('TestLine: children must be a string.', children);
    return createElement(as, null, children);
  }

  useLayoutEffect(() => {
    if (ref.current) {
      setWrappedLines(splitLines(ref.current));
    }
  }, []);

  return createElement(
    as,
    { ref },
    wrappedLines || splitString(children, 'WORD')
  );
};
