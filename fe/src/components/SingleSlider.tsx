import React, { FC } from "react";
import styled from "styled-components";
import SliderCard from "./SliderCard";
import SingleSliderWrapper from "./SingleSliderWrapper";
import { useSlider } from "../utils/useSlider";

const StyledSliderWrapper = styled.article`
  white-space: nowrap;
  width: 100%;
  overflow-x: scroll;
`;

interface ISingleSliderProps {
  data: Record<any, any>[];
}

const SingleSlider: FC<ISingleSliderProps> = ({ data }) => {
  const { setPagenation } = useSlider();
  return (
    <SingleSliderWrapper>
      <StyledSliderWrapper>
        {data.map((singleData, index) => {
          return (
            <SliderCard image={singleData.poster_path} key={index.toString()} />
          );
        })}
      </StyledSliderWrapper>
    </SingleSliderWrapper>
  );
};

export default SingleSlider;
