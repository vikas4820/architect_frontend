declare module 'aos' {
  export function init(options?: {
    duration?: number;
    easing?: string;
    once?: boolean;
    mirror?: boolean;
    anchorPlacement?: string;
    offset?: number;
    delay?: number;
  }): void;

  export function refresh(): void;
}
