import React, { FC } from "react";
import styled from "styled-components";
import { SliderProvider } from "../utils/useSlider";

const SingleSliderWrapper: FC = ({ children }) => {
  return <SliderProvider>{children}</SliderProvider>;
};

export default SingleSliderWrapper;
