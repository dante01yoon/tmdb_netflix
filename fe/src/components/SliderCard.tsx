import React, { FC } from "react";
import styled from "styled-components";

interface ISliderCard {
  image: string;
}

const StyledCard = styled.div<{
  image: string;
}>`
  display: inline-block;
  background-image: url("${({ image }) => image}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const SliderCard: FC<ISliderCard> = ({ image }) => {
  return <StyledCard image={image} />;
};

export default SliderCard;
