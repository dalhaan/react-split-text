import { PropsWithChildren } from 'react';
import gsap from 'gsap';
import { By } from './sharedTypes';
declare type SplitTextProps = PropsWithChildren<{
    as?: any;
    by?: By;
    animate?: boolean;
}>;
export declare const SplitText: import("react").MemoExoticComponent<({ as, by, animate, children, }: SplitTextProps) => import("react").DetailedReactHTMLElement<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
export declare const useStaggerAnimation: ({ enabled, targets, onComplete, }: {
    enabled: boolean;
    targets: gsap.TweenTarget;
    onComplete?: (() => void) | undefined;
}) => {
    ref: import("react").MutableRefObject<HTMLDivElement | null>;
};
export {};
