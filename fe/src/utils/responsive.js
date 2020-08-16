import { useLayoutEffect, useState } from "react";

export const WINDOW_BREAKPOINT = {
  s499: 499,
  s799: 799,
  s1099: 1099,
  s1399: 1399,
  l1400: 1400,
};

const WINDOW_CARD_COUNT = {
  s499: 2,
  s799: 3,
  s1099: 4,
  s1399: 5,
  l1400: 6,
};

export const getWindowCardCount = (breakpoint) => {
  switch (breakpoint) {
    case 499:
      return WINDOW_CARD_COUNT.s499;
    case 799:
      return WINDOW_CARD_COUNT.s799;
    case 1099:
      return WINDOW_CARD_COUNT.s1099;
    case 1399:
      return WINDOW_CARD_COUNT.s1399;
    default:
      return WINDOW_CARD_COUNT.l1400;
  }
};

const WINDOW_PADDING = {
  s499: 20,
  s799: 26,
  s1099: 42,
  s1399: 54,
  l1400: 57,
};

export const getWindowCardPadding = (breakpoint) => {
  switch (breakpoint) {
    case 499:
      return WINDOW_PADDING.s499;
    case 799:
      return WINDOW_PADDING.s799;
    case 1099:
      return WINDOW_PADDING.s1099;
    case 1399:
      return WINDOW_PADDING.s1399;
    default:
      return WINDOW_PADDING.l1400;
  }
};

const WINDOW_CARD_WIDTH = {
  s499: 49,
  s799: 32.6,
  s1099: 24.35,
  s1399: 19.45,
  l1400: 16.17,
};

const getWindowCardWidthPercentage = (breakpoint) => {
  switch (breakpoint) {
    case 499:
      return WINDOW_CARD_WIDTH.s499;
    case 799:
      return WINDOW_CARD_WIDTH.s799;
    case 1099:
      return WINDOW_CARD_WIDTH.s1099;
    case 1399:
      return WINDOW_CARD_WIDTH.s1399;
    default:
      return WINDOW_CARD_WIDTH.l1400;
  }
};

const useResponsiveLayout = () => {
  const initialState = {
    breakPoint: WINDOW_BREAKPOINT.l1400,
    cardExposedInRow: WINDOW_CARD_COUNT.l1400,
    cardPadding: WINDOW_PADDING.l1400,
    cardTransitionPx: "0px",
    cardWidth: WINDOW_CARD_WIDTH.l1400,
  };

  const [state, setState] = useState(initialState);

  const getCardTransitionPx = (breakPoint) => {
    const cardCount = getWindowCardCount(breakPoint);
    const totalMargin = (cardCount - 1) * 7;
    const totalCardWidth = cardCount * getWindowCardWidthPercentage(breakPoint);
    return `${totalMargin}px + ${totalCardWidth}%`;
  };

  const getWindowBreakpoint = () => {
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

  const resizeHandler = (e) => {
    console.log("resizing...");
    const currentBreakPoint = getWindowBreakpoint();
    const cardExposedInRow = getWindowCardCount(currentBreakPoint);
    const cardPadding = getWindowCardPadding(currentBreakPoint);
    const cardWidth = getWindowCardWidthPercentage(currentBreakPoint);
    const cardTransitionRate = getCardTransitionPx(currentBreakPoint);
    const currentWindowValue = {
      breakPoint: currentBreakPoint,
      cardExposedInRow,
      cardPadding,
      cardTransitionRate,
      cardWidth,
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
