import React, { useRef } from "react";
import { useSwiperContext } from "./SwiperProvider";

import "./Swiper.css";

const TRIGGER_PX = 100;
const TRANSLATE_X = "translateX";
const DIRECTION = {
  RIGHT: "right",
  LEFT: "left",
};

const Swiper = ({ children }) => {
  const [state, dispatch] = useSwiperContext();

  const realTimePointerRef = useRef({
    direction: DIRECTION.RIGHT,
    location: 0,
    move: false,
  });

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
      direction: getPointerDirection(getPointerMovedDistance(e)),
      move: true,
      location: e.clientX,
    });
  };

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
          overflowX: "hidden",
          transform: `translateX(${state.translateX}%)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Swiper;
