import React, { createContext, useContext} from "react";
import useApi from "./useApi"; 

const createStore = (apiFactory, initialState) => {
  const storeContext = createContext();
  const {Provider ,} = storeContext;
  
  const StoreProvider = ({children}) => {
    const store = useApi(apiFactory, initialState); 

    return (
      <Provider value={store}>
        {children}
      </Provider>
    )
  }

  const useStore = () => {
    const store =  useContext(storeContext); 
    if(!store){
      throw Error("store is not exists in useStore");
    }
    return store;
  }

  return [StoreProvider, useStore]; 
}

export default createStore; 