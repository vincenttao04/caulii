import { useRef, useState, useCallback } from "react";

const SWIPE_THRESHOLD = 100;
const MAX_ROTATION = 15;
const VERTICAL_DAMPING = 0.1;

export type SwipeState = {
  x: number;
  y: number;
  isActive: boolean;
};

export type UseSwipeGestureReturn = {
  swipeState: SwipeState;
  handlers: {
    onMouseDown: (e: React.MouseEvent) => void;
    onTouchStart: (e: React.TouchEvent) => void;
  };
  getTransform: () => string;
  isResetting: boolean;
};

export function useSwipeGesture(
  onSwipeComplete: (direction: "left" | "right") => void,
): UseSwipeGestureReturn {
  const [swipeState, setSwipeState] = useState<SwipeState>({
    x: 0,
    y: 0,
    isActive: false,
  });

  const [isResetting, setIsResetting] = useState(false);

  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const isDraggingRef = useRef(false);

  const handlePointerMove = useCallback((clientX: number, clientY: number) => {
    if (!startPosRef.current || !isDraggingRef.current) return;

    const deltaX = clientX - startPosRef.current.x;
    const deltaY = clientY - startPosRef.current.y;

    // Apply damping to vertical movement
    const constrainedY = deltaY * VERTICAL_DAMPING;

    setSwipeState({
      x: deltaX,
      y: constrainedY,
      isActive: true,
    });
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;

    // Determine if swipe threshold was reached
    if (Math.abs(swipeState.x) > SWIPE_THRESHOLD) {
      setIsResetting(true);
      onSwipeComplete(swipeState.x > 0 ? "right" : "left");

      // Reset after animation
      setTimeout(() => {
        setSwipeState({ x: 0, y: 0, isActive: false });
        setIsResetting(false);
      }, 300);
    } else {
      // Snap back to center
      setIsResetting(true);
      setTimeout(() => {
        setSwipeState({ x: 0, y: 0, isActive: false });
        setIsResetting(false);
      }, 300);
    }
  }, [swipeState.x, onSwipeComplete]);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isResetting) return;

      isDraggingRef.current = true;
      startPosRef.current = { x: e.clientX, y: e.clientY };

      const handleMove = (moveEvent: MouseEvent) => {
        handlePointerMove(moveEvent.clientX, moveEvent.clientY);
      };

      const handleUp = () => {
        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("mouseup", handleUp);
        handlePointerUp();
      };

      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleUp);
    },
    [handlePointerMove, handlePointerUp, isResetting],
  );

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (isResetting || e.touches.length !== 1) return;

      const touch = e.touches[0];
      isDraggingRef.current = true;
      startPosRef.current = { x: touch.clientX, y: touch.clientY };

      const handleMove = (moveEvent: TouchEvent) => {
        if (moveEvent.touches.length === 1) {
          handlePointerMove(
            moveEvent.touches[0].clientX,
            moveEvent.touches[0].clientY,
          );
        }
      };

      const handleUp = () => {
        document.removeEventListener("touchmove", handleMove);
        document.removeEventListener("touchend", handleUp);
        handlePointerUp();
      };

      document.addEventListener("touchmove", handleMove, { passive: true });
      document.addEventListener("touchend", handleUp);
    },
    [handlePointerMove, handlePointerUp, isResetting],
  );

  const getTransform = useCallback((): string => {
    const rotation = (swipeState.x / 100) * MAX_ROTATION;
    const x = swipeState.x;
    const y = swipeState.y;

    return `translate3d(${x}px, ${y}px, 0) rotateZ(${rotation}deg)`;
  }, [swipeState.x, swipeState.y]);

  return {
    swipeState,
    handlers: {
      onMouseDown,
      onTouchStart,
    },
    getTransform,
    isResetting,
  };
}
