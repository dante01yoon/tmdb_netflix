import React, { useReducer, useRef, } from "react";

import SwiperProvider from "./SwiperProvider";
import Swiper from "./Swiper";

import "./SwiperWindow.css";
import { initial } from "lodash";

const TRIGGER_PX = 100;
const TRANSLATE_X = "translateX";
const PAGENATION = "pagenation"; 
const DIRECTION = {
  LEFT: "LEFT",
  RIGHT: "RIGHT",
};


const SwiperWindow = ({ children }) => {
  const realTimePointerRef = useRef({
    direction: DIRECTION.RIGHT,
    location: 0,
    move: false,
  });
  
  
  const initialState = {
    ...realTimePointerRef.current,
    pagenation: 0,
  }

  const reducer = (state, {type, payload}) => {
    switch(type){
      case DIRECTION:
        return {
          ...state,
          direction: payload.direction
        }
      case TRANSLATE_X:
        return {
          ...state, 
          translateX: payload.translateX
        }
      case PAGENATION: 
        return {
          ...state,
          pagenation: payload.pagenation
        }
      default:
        return state
    }
  }

  
  const entireCardCount =  React.Children.count(children);

  console.log(entireCardCount);


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

  return (
    <SwiperProvider initialState={initialState} reducer={reducer}>
      <div
        className="swiper__window"
        onPointerMove={onPointerMoveHandler}
        onPointerDown={onPointerDownHandler}
        onPointerUp={onPointerUpHandler}
      >
        <Swiper>
          {children} 
        </Swiper>
      </div>
    </SwiperProvider>
  );
};

export default SwiperWindow;
