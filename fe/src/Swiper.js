import React, {
  useReducer,
  forwardRef,
  useImperativeHandle,
} from "react";

import "./Swiper.css";

const TRANSLATEX = "translateX";
const DIRECTION = "direction";
const RIGHTDIRECTION = {
  RIGHT: "right",
  LEFT: "left",
  ALL: "all",
};

const Swiper = forwardRef(({ children, ref: swiperRef }) => {
  // Action
  const translateAction = {
    type: TRANSLATEX,
    payload: {},
  };

  const directionAction = {
    type: DIRECTION,
    payload: {},
  };

  // Action Creator
  const createTranslateAction = (translateX) => {
    const payload = Object.assign({}, translateAction.payload);
    return {
      type: translateAction.type,
      payload: Object.assign(payload, {
        translateX,
      }),
    };
  };

  const createDirectionAction = (direction) => {
    const payload = Object.assign({}, translateAction.payload);
    return {
      type: directionAction.type,
      payload: Object.assign(payload, {
        direction,
      }),
    };
  };

  // Initial State
  const initialState = Object.assign(
    {},
    {
      translateX: 0,
      direction: RIGHTDIRECTION.RIGHT,
    }
  );

  // Reducer
  const swiperReducer = (state, action) => {
    const { payload } = action;
    switch (action) {
      case TRANSLATEX:
        return {
          ...state,
          translateX: payload.translateX,
        };
      case DIRECTION:
        return {
          ...state,
          direction: payload.direction,
        };
    }
  };

  const [state, dispatch] = useReducer(swiperReducer, initialState);

  const whereShouldIGo = () => {};
  const howManyTranslate = () => {};
  const moveHandler = (event) => {
    //dispatch translateX
    dispatch(createTranslateAction(howManyTranslate()));
    //dispatch direction
    dispatch(createDirectionAction(whereShouldIGo()));
  };

  useImperativeHandle(swiperRef, moveHandler);

  return (
    <div
      className="swiper__mover"
      style={{
        transform: `translateX(${state?.translateX})`,
      }}
      onPointerMove={moveHandler}
    >
      {children}
    </div>
  );
});

export default Swiper;
