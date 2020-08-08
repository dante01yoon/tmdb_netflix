import React, { useEffect, useReducer, useRef } from "react";

import "./SwiperWindow.css";

const SwiperWindow = ({ children }) => {
  const swiperRef = useRef(null);
  // const childrenWithProps = React.Children.map({ children }, (child) => {
  //   if (React.isValidElement(child)) {
  //     return React.cloneElement(child, swiperRef);
  //   }
  //   return child;
  // });

  return (
    <div className="swiper__window" onClick={swiperRef.current?.moveHandler}>
      {children({ ref: swiperRef })}
    </div>
  );
};

export default SwiperWindow;
