import React, {
  useState,
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
} from "react";

interface ISliderApiState {
  pagenation: number;
}

export const sliderApi = (
  state: ISliderApiState,
  setState: Dispatch<SetStateAction<ISliderApiState>>
) => {
  const setPagenation = (
    currentPageNationState: ISliderApiState["pagenation"]
  ) => {
    setState((prevState) => ({
      ...prevState,
      pagenation: currentPageNationState,
    }));
  };

  return {
    ...state,
    setPagenation,
  };
};

const initialState: ISliderApiState = {
  pagenation: 0,
};

const useSliderApi = (initialState: ISliderApiState) => {
  const [state, setState] = useState<ISliderApiState>(initialState);

  return sliderApi(state, setState);
};

type TSliderApi = ReturnType<typeof useSliderApi>;

const createSliderStore = () => {
  const SliderContext = createContext<TSliderApi>({} as TSliderApi);

  const useSlider = () => {
    const sliderStore = useContext(SliderContext);
    if (!sliderStore) {
      throw Error("useSlider should be called under SliderContext ");
    }
    return sliderStore;
  };

  const SliderProvider: React.FC = ({ children }) => {
    return (
      <SliderContext.Provider value={useSliderApi(initialState)}>
        {children}
      </SliderContext.Provider>
    );
  };

  return { SliderProvider, useSlider };
};

const { SliderProvider, useSlider } = createSliderStore();

export { SliderProvider, useSlider };
