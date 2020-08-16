import React, { useRef, useEffect } from "react";
import useResponsiveLayout from "./utils/responsive";
import {
  TRANSLATE_X,
  PAGENATION,
  SLIDING,
  SLIDING_DIRECTION,
} from "./SwiperRow";
import { useSwiperContext } from "./SwiperProvider";

import "./Swiper.css";

const TRIGGER_PX = 100;
const DIRECTION = {
  RIGHT: "right",
  LEFT: "left",
};

const Swiper = ({ children }) => {
  const [windowState, setWindowState] = useResponsiveLayout();
  const [state, dispatch] = useSwiperContext();

  const containerRef = useRef(null);
  const realTimePointerRef = useRef({
    direction: DIRECTION.RIGHT,
    location: 0,
    move: false,
  });

  useEffect(() => {
    console.log("windowState: ", windowState);
  }, [windowState]);

  const slidingActionCreator = (direction) => {
    return {
      type: SLIDING_DIRECTION,
      payload: {
        direction,
      },
    };
  };

  const translateActionCreator = (translateX) => {
    return {
      type: TRANSLATE_X,
      payload: {
        translateX,
      },
    };
  };

  const pagenationActionCreator = (pagenation) => {
    return {
      type: PAGENATION,
      payload: {
        pagenation,
      },
    };
  };

  const contentsCount = React.Children.count(children);

  useEffect(() => {
    dispatch(
      pagenationActionCreator({
        ...state.pagenation,
        contentsCount,
      })
    );
  }, [contentsCount]);

  useEffect(() => {
    console.log("state: ", state);
  }, [state]);

  const setRealTimePointerRef = ({
    direction = realTimePointerRef.current.direction,
    location = realTimePointerRef.current.location,
    move = realTimePointerRef.current.move,
  }) => {
    realTimePointerRef.current = {
      direction,
      location,
      move,
    };
  };

  const getPointerDirection = (pointerMovedDistance) => {
    if (pointerMovedDistance < 0) {
      return DIRECTION.LEFT;
    }
    return DIRECTION.RIGHT;
  };

  const isPointerMovedMoreThanTriggerPx = (pointerMovedDistance) => {
    return Math.abs(pointerMovedDistance) > TRIGGER_PX;
  };

  const onPointerDownHandler = (e) => {
    setRealTimePointerRef({ location: e.clientX });
    e.target.setPointerCapture(e.pointerId);
  };

  const getPointerMovedDistance = (e) => {
    return e.clientX - realTimePointerRef?.current.location;
  };

  const setRealTimePointerRefOnMove = (e) => {
    const pointerMovedDistance = getPointerMovedDistance(e);
    setRealTimePointerRef({
      direction: getPointerDirection(pointerMovedDistance),
      move: true,
      location: e.clientX,
    });
  };

  const currentPage = state.pagenation.currentPage;

  const isCurrentPageFirstPage = () => {
    if (currentPage === 0) {
      return true;
    }
    return false;
  };
  const isCurrentPageLastPage = () => {
    if (currentPage === totalPage) {
      return true;
    }
    return false;
  };
  const isNextPageLastPage = () => {
    if (currentPage + 1 === totalPage) {
      return true;
    }
    return false;
  };

  const isMoveToRight = () => {
    if (realTimePointerRef.current.direction === DIRECTION.RIGHT) {
      return !isCurrentPageFirstPage();
    }
    return false;
  };

  // pagenation은 0 부터 시작
  const isNumberIsNatural = (number) => {
    if (number.toString().split(".").length > 1) {
      return false;
    }
    return true;
  };

  // 몇 페이지나 나와야 하는가
  const getTotalPageIndex = () => {
    const dividedNumber =
      state.pagenation.contentsCount / windowState.cardExposedInRow;
    if (isNumberIsNatural(dividedNumber)) {
      return dividedNumber - 1;
    }
    return Math.trunc(
      state.pagenation.contentsCount / windowState.cardExposedInRow
    );
  };

  const totalPage = getTotalPageIndex();

  const isMoveToLeft = () => {
    if (realTimePointerRef.current.direction === DIRECTION.LEFT) {
      return !isCurrentPageLastPage();
    }
    return false;
  };

  useEffect(() => {
    console.log("currentPage: ", state.pagenation.currentPage);
  }, [state]);

  const isSinglePage = () => {
    if (!totalPage) {
      return true;
    }
    return false;
  };

  const getLastPageCardCount = () => {
    const updatedContentsCount = state.pagenation.contentsCount;
    if (isSinglePage()) {
      return updatedContentsCount;
    }
    const { cardExposedInRow } = windowState;
    return updatedContentsCount - (totalPage - 1) * cardExposedInRow;
  };

  const isPrevPageFirstPage = () => {
    if(currentPage === 1){
      return true;
    }
    return false;
  }
  
  const getTransitionMove = () => {
    const { cardPadding, cardExposedInRow } = windowState;
    const currentTranslateX = state.translateX;
    const singleCardWidthPx =
      (containerRef?.current.offsetWidth - cardPadding * 2) / cardExposedInRow;
    const defaultDistanceToMove = singleCardWidthPx * cardExposedInRow;
    const cardCountToFillExposedInRow =
        cardExposedInRow - getLastPageCardCount();

    if( realTimePointerRef.current.direction === DIRECTION.LEFT) {
      if (isNextPageLastPage()) {
        return (
          currentTranslateX - (defaultDistanceToMove - cardCountToFillExposedInRow * singleCardWidthPx) 
        );
      }
      return currentTranslateX - defaultDistanceToMove;
    }
    if(isPrevPageFirstPage()){
      return (
        currentTranslateX + defaultDistanceToMove - cardCountToFillExposedInRow * singleCardWidthPx
      );
    }
    return currentTranslateX + defaultDistanceToMove;
  };

  const doTransition = () => {
    const transitionMove = getTransitionMove();
    console.log("transitionMove: ", transitionMove);
    if (realTimePointerRef.current.move) {
      if (isMoveToLeft()) {
        dispatch(
          pagenationActionCreator({
            ...state.pagenation,
            currentPage: state.pagenation.currentPage + 1,
          })
        );
        dispatch(translateActionCreator(transitionMove));
      } else if (isMoveToRight()) {
        dispatch(
          pagenationActionCreator({
            ...state.pagenation,
            currentPage: state.pagenation.currentPage - 1,
          })
        );
        dispatch(translateActionCreator(transitionMove));
      }
    }
  };

  const onPointerUpHandler = (e) => {
    const pointerMovedDistance = getPointerMovedDistance(e);

    if (isPointerMovedMoreThanTriggerPx(pointerMovedDistance)) {
      setRealTimePointerRefOnMove(e);
    } else {
      setRealTimePointerRef({ move: false });
    }
    console.log(realTimePointerRef.current);
    doTransition();

    e.target.releasePointerCapture(e.pointerId);
  };

  return (
    <div
      className="swiper__container"
      onPointerDown={onPointerDownHandler}
      onPointerUp={onPointerUpHandler}
      ref={containerRef}
    >
      <div
        className="swiper__mover"
        style={{ transform: `translateX(${state.translateX}px)` }}
      >
        {children}
      </div>
    </div>
  );
};

export default Swiper;
