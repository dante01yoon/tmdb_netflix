import React from "react";
import "./Content.css";

const IMAGE_SOURCE = "https://image.tmdb.org/t/p/original";

const Content = ({ movie, isLarge }) => {
  const handleClick = () => {};
  const hasProperImage = (movie, handleClick) => {
    if (movie.poster_path && movie.backdrop_path) {
      return true;
    }
    return false;
  };

  const renderContent = () => {
    if (hasProperImage) {
      return (
        <img
          onClick={() => handleClick(movie)}
          className="content"
          src={`${IMAGE_SOURCE}${
            isLarge ? movie.poster_path : movie.backdrop_path
          }`}
        />
      );
    }
    return null;
  };

  return renderContent();
};

export default Content;
