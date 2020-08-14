import { useLayoutEffect, useState } from "react";

export const WINDOW_BREAKPOINT = {
  s499: 499,
  s799: 799,
  s1099: 1099,
  s1399: 1399,
  l1400: 1400,
};

export const getWindowCardCount = (breakpoint) => {
  switch (WINDOW_BREAKPOINT) {
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
  switch (WINDOW_BREAKPOINT) {
    case 499:
      return 20;
    case 799:
      return 20;
    case 1099:
      return 20;
    case 1399:
      return 20;
    default:
      return 20;
  }
};

const useResponsiveLayout = () => {
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

  // const BREAKPOINT_ACTION = "breakpoint";
  // const CARD_PADDING_ACTION = "cardPadding";
  // const CARD_COUNT = "cardCount";

  // const windowReducer = (state, { type, payload }) => {
  //   switch (type) {
  //     case BREAKPOINT_ACTION:
  //       return {
  //         ...state,
  //         breakPoint: payload.breakPoint,
  //       };
  //     case CARD_PADDING_ACTION:
  //       return {
  //         ...state,
  //         cadPadding: payload.cardPadding,
  //       };
  //     case CARD_COUNT:
  //       return {
  //         ...state,
  //         cardCount: payload.cardCount,
  //       };
  //   }
  // };

  // const [windowState, windowDispatch] = useReducer(initialState, windowReducer);

  const initialState = {
    breakPoint: WINDOW_BREAKPOINT.l1400,
    cardCount: 6,
    cardPadding: 20,
  };

  const [state, setState] = useState(initialState);

  const resizeHandler = (e) => {
    console.log("resizing...");
    const currentBreakPoint = getWindowBreakpoint();
    const currentWindowValue = {
      breakPoint: currentBreakPoint,
      cardCount: getWindowCardCount(currentBreakPoint),
      cardPadding: getWindowCardPadding(currentBreakPoint),
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
