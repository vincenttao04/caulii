import { PointerEvent, useCallback, useEffect, useRef, useState } from "react";

const SWIPE_THRESHOLD = 130;
const EXIT_DISTANCE = 520;
const EXIT_DURATION_MS = 380;
const SNAP_DURATION_MS = 320;
const MAX_ROTATION = 7;
const MAX_DRAG_DISTANCE = 260;
const FADE_DURATION_MS = 120;

export type SwipeState = {
  x: number;
  y: number;
  isActive: boolean;
};

type AnimationPhase = "idle" | "dragging" | "snapping" | "exiting" | "fading";

export type UseSwipeGestureReturn = {
  swipeState: SwipeState;
  handlers: {
    onPointerDown: (event: PointerEvent<HTMLDivElement>) => void;
    onPointerMove: (event: PointerEvent<HTMLDivElement>) => void;
    onPointerUp: (event: PointerEvent<HTMLDivElement>) => void;
    onPointerCancel: (event: PointerEvent<HTMLDivElement>) => void;
  };
  getTransform: () => string;
  getTransition: () => string;
  getOpacity: () => number;
  getNextOpacity: () => number;
  getNextTransition: () => string;
  swipe: (direction: "left" | "right") => void;
  isAnimating: boolean;
};

export function useSwipeGesture(
  onSwipeComplete: (direction: "left" | "right") => void,
): UseSwipeGestureReturn {
  const [swipeState, setSwipeState] = useState<SwipeState>({
    x: 0,
    y: 0,
    isActive: false,
  });

  const [phase, setPhase] = useState<AnimationPhase>("idle");
  const startXRef = useRef(0);
  const activePointerIdRef = useRef<number | null>(null);
  const latestXRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  const clearAnimationTimeout = useCallback(() => {
    if (!timeoutRef.current) return;

    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  }, []);

  useEffect(() => clearAnimationTimeout, [clearAnimationTimeout]);

  const setControlledPosition = useCallback((x: number, isActive: boolean) => {
    latestXRef.current = x;
    setSwipeState({
      x,
      y: 0,
      isActive,
    });
  }, []);

  const snapBack = useCallback(() => {
    setPhase("snapping");
    setControlledPosition(0, false);

    clearAnimationTimeout();
    timeoutRef.current = window.setTimeout(() => {
      setPhase("idle");
      timeoutRef.current = null;
    }, SNAP_DURATION_MS);
  }, [clearAnimationTimeout, setControlledPosition]);

  const finishSwipe = useCallback(
    (direction: "left" | "right") => {
      const exitX = direction === "right" ? EXIT_DISTANCE : -EXIT_DISTANCE;

      setPhase("exiting");
      setControlledPosition(exitX, false);

      clearAnimationTimeout();
      timeoutRef.current = window.setTimeout(() => {
        setPhase("fading");

        timeoutRef.current = window.setTimeout(() => {
          onSwipeComplete(direction);
          timeoutRef.current = null;
        }, FADE_DURATION_MS);
      }, EXIT_DURATION_MS);
    },
    [clearAnimationTimeout, onSwipeComplete, setControlledPosition],
  );

  const endGesture = useCallback(() => {
    const finalX = latestXRef.current;

    activePointerIdRef.current = null;

    if (Math.abs(finalX) >= SWIPE_THRESHOLD) {
      finishSwipe(finalX > 0 ? "right" : "left");
      return;
    }

    snapBack();
  }, [finishSwipe, snapBack]);

  const onPointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (phase === "exiting" || phase === "fading") return;

      clearAnimationTimeout();
      activePointerIdRef.current = event.pointerId;
      startXRef.current = event.clientX;
      latestXRef.current = 0;
      setPhase("dragging");
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [clearAnimationTimeout, phase],
  );

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (
        activePointerIdRef.current !== event.pointerId ||
        phase !== "dragging"
      ) {
        return;
      }

      const rawX = event.clientX - startXRef.current;
      const constrainedX = Math.max(
        -MAX_DRAG_DISTANCE,
        Math.min(MAX_DRAG_DISTANCE, rawX),
      );

      setControlledPosition(constrainedX, true);
    },
    [phase, setControlledPosition],
  );

  const onPointerUp = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (activePointerIdRef.current !== event.pointerId) return;

      event.currentTarget.releasePointerCapture(event.pointerId);
      endGesture();
    },
    [endGesture],
  );

  const onPointerCancel = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (activePointerIdRef.current !== event.pointerId) return;

      activePointerIdRef.current = null;
      snapBack();
    },
    [snapBack],
  );

  const getTransform = useCallback((): string => {
    const rotation = Math.max(
      -MAX_ROTATION,
      Math.min(MAX_ROTATION, (swipeState.x / SWIPE_THRESHOLD) * MAX_ROTATION),
    );
    const x = swipeState.x;

    return `translate3d(${x}px, 0, 0) rotateZ(${rotation}deg)`;
  }, [swipeState.x]);

  const getTransition = useCallback((): string => {
    if (phase === "dragging") return "none";
    if (phase === "fading") {
      return `opacity ${FADE_DURATION_MS}ms ease`;
    }

    const duration = phase === "exiting" ? EXIT_DURATION_MS : SNAP_DURATION_MS;
    return `transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`;
  }, [phase]);

  const getOpacity = useCallback((): number => {
    return phase === "fading" ? 0 : 1;
  }, [phase]);

  const getNextOpacity = useCallback((): number => {
    return phase === "fading" ? 1 : 0;
  }, [phase]);

  const getNextTransition = useCallback((): string => {
    return `opacity ${FADE_DURATION_MS}ms ease`;
  }, []);

  return {
    swipeState,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
    },
    getTransform,
    getTransition,
    getOpacity,
    getNextOpacity,
    getNextTransition,
    swipe: finishSwipe,
    isAnimating:
      phase === "snapping" || phase === "exiting" || phase === "fading",
  };
}
