import React, { useEffect, useReducer, useRef } from "react";

import "./SwiperWindow.css";

const TRIGGER_PX = 10;
const DIRECTION = {
  LEFT: "LEFT",
  RIGHT: "RIGHT"
}
const SwiperWindow = ({ children }) => {
  const swiperRef = useRef(null);
  
  const realTimePointerRef = useRef({
    direction: DIRECTION.RIGHT,
    location: 0,
    move: false,
  });
  const childrenWithProps = React.cloneElement(children,{ref: swiperRef});

  return (
    <div 
      className="swiper__window" 
      onPointerMove={(e) => {
        const movedPointer = e.clientX - realTimePointerRef.current.location;
        if( Math.abs(movedPointer) > TRIGGER_PX){
          realTimePointerRef.current.move = true;
          if(movedPointer < 0){
            realTimePointerRef.current.direction = DIRECTION.LEFT;
          }
          else {
            realTimePointerRef.current.direction = DIRECTION.RIGHT;
          }
        }
      }}
      onPointerDown={(e) => {
        console.log("onPointerDown");
        e.target.setPointerCapture(e.pointerId); 

        realTimePointerRef.current.pointer = e.clientX;
        
      }}
      onPointerUp={(e)=>{
        console.log("onPointerUp");
        console.log(realTimePointerRef.current.direction);
        realTimePointerRef.current.move = false;
        e.target.releasePointerCapture(e.pointerId);
      }}
    >
      {childrenWithProps}
    </div>
  );
};

export default SwiperWindow;
