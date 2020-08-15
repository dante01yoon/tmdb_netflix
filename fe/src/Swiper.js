import React, { useRef, useEffect } from "react";
import useResponsiveLayout from "./utils/responsive";
import { TRANSLATE_X , PAGENATION, SLIDING, SLIDING_DIRECTION } from "./SwiperRow";
import { useSwiperContext } from "./SwiperProvider";

import "./Swiper.css";

const TRIGGER_PX = 100;
const DIRECTION = {
  RIGHT: "right",
  LEFT: "left",
};

const Swiper =  ({ children }) => {
  const [windowState, setWindowState] = useResponsiveLayout();
  const [state, dispatch] = useSwiperContext();

  const realTimePointerRef = useRef({
    direction: DIRECTION.RIGHT,
    location: 0,
    move: false,
  });

  useEffect(() => {
    console.log("windowState: ", windowState);
  }, [windowState]);

  /***
   *
   * pagenation begins with 0
   */

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
  
  useEffect(() =>{
    console.log('state pagenation: ', state.pagenation)
    console.log(getTotalPageIndex())
  }, )
  
  const slidingActionCreator = (direction) => {
    return({
      type: SLIDING_DIRECTION,
      payload: {
        direction
      }
    })
  }

  const translateActionCreator = (translateX) => {
    return({
      type: TRANSLATE_X,
      payload: {
        translateX 
      }
    })
  }

  const pagenationActionCreator = (pagenation) => {
    return({
      type: PAGENATION,
      payload: {
        pagenation
      }
    })
  }

  const contentsCount = React.Children.count(children); 

  useEffect(() => {
    dispatch(pagenationActionCreator(
      {
        ...state.pagenation,
        contentsCount
      }
    ))
  }, [contentsCount])

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

  const onPointerMoveHandler = (e) => {};

  const onPointerDownHandler = (e) => {
    setRealTimePointerRef({ location: e.clientX });
    e.target.setPointerCapture(e.pointerId);
  };

  const getPointerMovedDistance = (e) => {
    return e.clientX - realTimePointerRef?.current.location;
  };

  const setRealTimePointerRefOnPointerUp = (e) => {
    const pointerMovedDistance = getPointerMovedDistance(e);

    setRealTimePointerRef({
      direction: getPointerDirection(pointerMovedDistance),
      move: true,
      location: e.clientX,
    });
  };

  const moveTransition = () => {
    
  }
  const onPointerUpHandler = (e) => {
    const pointerMovedDistance = getPointerMovedDistance(e);

    if (isPointerMovedMoreThanTriggerPx(pointerMovedDistance)) {
      setRealTimePointerRefOnPointerUp(e);
    } else {
      setRealTimePointerRef({ move: false });
    }
    console.log(realTimePointerRef.current);
    e.target.releasePointerCapture(e.pointerId);
  };

  return (
    <div
      className="swiper__container"
      onPointerMove={onPointerMoveHandler}
      onPointerDown={onPointerDownHandler}
      onPointerUp={onPointerUpHandler}
      
    >
      <div
        className="swiper__mover"
        style={{
          transform: `translateX(${state.translateX}%)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Swiper;
