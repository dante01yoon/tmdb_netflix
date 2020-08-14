import { useLayoutEffect, useState } from "react";

export const WINDOW_BREAKPOINT = {
  s499: 499,
  s799: 799,
  s1099: 1099,
  s1399: 1399,
  l1400: 1400,
};

export const getWindowCardCount = (breakpoint) => {
  switch (breakpoint) {
    case 499:
      return 2;
    case 799:
      return 3;
    case 1099:
      return 4;
    case 1399:
      return 5;
    default:
      return 6;
  }
};

export const getWindowCardPadding = (breakpoint) => {
  switch (breakpoint) {
    case 499:
      return 10;
    case 799:
      return 20;
    case 1099:
      return 30;
    case 1399:
      return 40;
    default:
      return 20;
  }
};

const useResponsiveLayout = () => {
  const getWindowBreakpoint = () => {
    console.log(window.innerWidth);
    if (window) {
      const windowWidth = window.innerWidth;
      if (windowWidth < 500) {
        return WINDOW_BREAKPOINT.s499;
      } else if (windowWidth < 800) {
        return WINDOW_BREAKPOINT.s799;
      } else if (windowWidth < 1100) {
        return WINDOW_BREAKPOINT.s1099;
      } else if (windowWidth < 1400) {
        return WINDOW_BREAKPOINT.s1399;
      }
      return WINDOW_BREAKPOINT.l1400;
    }
  };

  const initialState = {
    breakPoint: WINDOW_BREAKPOINT.l1400,
    cardCount: 6,
    cardPadding: 20,
  };

  const [state, setState] = useState(initialState);

  const resizeHandler = (e) => {
    console.log("resizing...");
    const currentBreakPoint = getWindowBreakpoint();
    const cardCount = getWindowCardCount(currentBreakPoint);
    const cardPadding = getWindowCardPadding(currentBreakPoint);
    const currentWindowValue = {
      breakPoint: currentBreakPoint,
      cardCount,
      cardPadding,
    };
    setState(currentWindowValue);
  };

  useLayoutEffect(() => {
    if (window) {
      window.addEventListener("resize", resizeHandler);

      return () => {
        window.removeEventListener("resize", resizeHandler);
      };
    }
  }, []);

  return [state, setState];
};

export default useResponsiveLayout;
