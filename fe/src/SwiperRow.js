import React, { useRef, useEffect, useState } from "react";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

import instance from "./axios";

import SwiperProvider from "./SwiperProvider";
import Swiper from "./Swiper";
import Content from "./Content";

import "./SwiperRow.css";

const TRIGGER_PX = 100;
const TRANSLATE_X = "translateX";
const PAGENATION = "pagenation";
const SLIDING_DIRECTION = "DIRECTION";
const DIRECTION = {
  LEFT: "left",
  RIGHT: "right",
};

const SwiperRow = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    new Promise((resolve) => {
      resolve(instance.request({ method: "GET", url: fetchUrl }));
    }).then((value) => {
      setMovies(value.data.results);
    });
  }, [fetchUrl]);

  const realTimePointerRef = useRef({
    direction: DIRECTION.RIGHT,
    location: 0,
    move: false,
  });

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  const renderContents = React.useCallback(
    (movies) => {
      return movies.map((movie) => (
        <Content
          isLarge={true}
          movie={movie}
          key={movie.toString()}
          handleClick={handleClick}
        />
      ));
    },
    [movies]
  );

  const contentsCount = React.Children.count(renderContents(movies));

  const initialState = {
    translateX: 0,
    direction: DIRECTION.RIGHT,
    move: false,
    pagenation: {
      total: contentsCount,
      current: 0,
    },
  };

  const reducer = (state, { type, payload }) => {
    switch (type) {
      case SLIDING_DIRECTION:
        return {
          ...state,
          direction: payload.direction,
        };
      case TRANSLATE_X:
        return {
          ...state,
          translateX: payload.translateX,
        };
      case PAGENATION:
        return {
          ...state,
          pagenation: payload.pagenation,
        };
      default:
        return state;
    }
  };

  const renderTrailer = () => {
    const opts = {
      height: "390px",
      width: "100%",
      playerVars: {
        autoplay: 1,
      },
    };
    if (trailerUrl) {
      return <YouTube videoId={trailerUrl} opts={opts} />;
    }
  };

  return (
    <>
      <SwiperProvider initialState={initialState} reducer={reducer}>
        <h2 className="row__title">{title}</h2>
        <div className="swiper__window">
          <Swiper>{renderContents(movies)}</Swiper>
        </div>
      </SwiperProvider>
      {renderTrailer()}
    </>
  );
};

export default SwiperRow;
