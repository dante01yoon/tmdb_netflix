import React, { useEffect, useReducer, useRef } from "react";

import "./SwiperWindow.css";

const TRIGGER_PX = 10;
const DIRECTION = {
  LEFT: "LEFT",
  RIGHT: "RIGHT",
};
const SwiperWindow = ({ children }) => {
  const swiperRef = useRef(null);
  const realTimePointerRef = useRef({
    direction: DIRECTION.RIGHT,
    location: 0,
    move: false,
  });

  const childrenWithProps = React.cloneElement(children, { ref: swiperRef });

  const setRealTimePointerRef = (
    { direction, location, move } = {
      direction: realTimePointerRef.current.direction,
      location: realTimePointerRef.current.location,
      move: realTimePointerRef.current.move,
    }
  ) => {
    realTimePointerRef.current = {
      direction,
      location,
      move,
    };
  };

  const getPointerMovedDistance = (e) => {
    return e?.clientX - realTimePointerRef?.current.location;
  };

  const getPointerDirection = (pointerMovedDistance) => {
    if (pointerMovedDistance > 0) {
      return DIRECTION.RIGHT;
    }
    return DIRECTION.LEFT;
  };

  const isPointerMovedMoreThanTriggerPx = (pointerMovedDistance) => {
    return Math.abs(pointerMovedDistance) > TRIGGER_PX;
  };

  const onPointerMoveHandler = (e) => {
    if (isPointerMovedMoreThanTriggerPx(getPointerMovedDistance(e))) {
      const pointerMovedDistance = getPointerMovedDistance(e);
      setRealTimePointerRef({
        direction: getPointerDirection(pointerMovedDistance),
        move: true,
      });
    } else {
      setRealTimePointerRef({ move: false });
    }
  };

  const onPointerDownHandler = (e) => {
    setRealTimePointerRef({ location: e.clientX });
    console.log('onPointerDownHandler: ', realTimePointerRef.current);
  };

  const onPointerUpHandler = (e) => {
    console.log('onPointerUpHandler: ', realTimePointerRef.current);
  };
  return (
    <div
      className="swiper__window"
      onPointerMove={onPointerMoveHandler}
      onPointerDown={onPointerDownHandler}
      onPointerUp={onPointerUpHandler}
    >
      {childrenWithProps}
    </div>
  );
};

export default SwiperWindow;
