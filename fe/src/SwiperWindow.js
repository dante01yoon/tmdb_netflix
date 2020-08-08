import React, { useEffect, useReducer, useRef } from "react";

import "./SwiperWindow.css";

const SwiperWindow = ({ children }) => {
  const swiperRef = useRef(null);
  const childrenWithProps = React.cloneElement(children,{ref: swiperRef});


  return (
    <div className="swiper__window" onClick={swiperRef.current?.moveHandler}>
      {childrenWithProps}
    </div>
  );
};

export default SwiperWindow;
