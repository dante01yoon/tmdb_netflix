import React, { useEffect, useReducer, useRef, createContext, useContext } from "react";

import "./SwiperWindow.css";

const TRIGGER_PX = 100;
const DIRECTION = {
  LEFT: "LEFT",
  RIGHT: "RIGHT",
};


const swiperContext = createContext();
const { Provider, } = swiperContext;

export const useSwiperContext = () =>  {
  const store = useContext(swiperContext);
  if(!store){
    throw Error("swiperContext Provider doesn't exist");
  }
  return store;
}

const SwiperWindow = ({ children }) => {
  const swiperRef = useRef(null);
  const realTimePointerRef = useRef({
    direction: DIRECTION.RIGHT,
    location: 0,
    move: false,
  });
  const entireCardCount =  React.Children.count(children);

  console.log(entireCardCount);

  const childrenWithProps = React.cloneElement(children, { ref: swiperRef });

  const setRealTimePointerRef = (
    { direction = realTimePointerRef.current.direction, 
      location = realTimePointerRef.current.location, 
      move = realTimePointerRef.current.move, } 
  ) => {
    realTimePointerRef.current = {
      direction,
      location,
      move,
    };
  };

  const getPointerMovedDistance = (e) => {
    return Math.abs(e.clientX - realTimePointerRef?.current.location);
  };

  const getPointerDirection = (pointerMovedDistance) => {
    if (pointerMovedDistance > 0) {
      return DIRECTION.LEFT;
    }
    return DIRECTION.RIGHT;
  };

  const isPointerMovedMoreThanTriggerPx = (pointerMovedDistance) => {
    return Math.abs(pointerMovedDistance) > TRIGGER_PX;
  };

  const onPointerMoveHandler = (e) => {
    
  };

  const onPointerDownHandler = (e) => {
    setRealTimePointerRef({ location: e.clientX });
    e.target.setPointerCapture(e.pointerId);
  };
  
  const onPointerUpHandler = (e) => {
    if (isPointerMovedMoreThanTriggerPx(getPointerMovedDistance(e))) {
      const pointerMovedDistance = getPointerMovedDistance(e);
      setRealTimePointerRef({
        direction: getPointerDirection(pointerMovedDistance),
        move: true,
        location: e.clientX
      });
    } else {
      setRealTimePointerRef({ move: false });
    }

    e.target.releasePointerCapture(e.pointerId);

  };

  const initialContextValue = {
    pageNation: [0,0], 
    move: false,
    direction: DIRECTION.RIGHT,
  }
  return (
    <Provider value={initialContextValue}>
      <div
        className="swiper__window"
        onPointerMove={onPointerMoveHandler}
        onPointerDown={onPointerDownHandler}
        onPointerUp={onPointerUpHandler}
      >
        {childrenWithProps}
      </div>
    </Provider>
  );
};

export default SwiperWindow;
