import React, {createContext, useContext, useReducer} from "react";

const swiperContext = createContext();

const { Provider , _ } = swiperContext;

export const useSwiperContext = () => {
  const store = useContext(swiperContext);
  if(!store){
    throw Error("swiperContext doesn't exist");
  }
  return store;
}

const SwiperProvider = ({reducer, initialState, children}) => {

  return (
    <Provider value={useReducer(reducer, initialState)} >
      {children}
    </Provider>
  )
}

export default SwiperProvider; 