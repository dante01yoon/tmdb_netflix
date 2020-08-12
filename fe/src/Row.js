import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import instance from "./axios";

import SwiperWindow from "./SwiperWindow";
import Swiper from "./Swiper";

import "./Row.css";

const ImageSource = "https://image.tmdb.org/t/p/original";

const Row = ({ title, fetchUrl, isLargeRow = false, scroll = true }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  useEffect(() => {
    new Promise((resolve) => {
      resolve(instance.request({ method: "GET", url: fetchUrl }));
    }).then((value) => {
      setMovies(value.data.results);
    });
  }, [fetchUrl]);

  const opts = {
    height: "390px",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
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
  return (
    <div className="row">
      <h2 className="row__title">{title}</h2>
      <SwiperWindow>
          <div
            className="row__posters"
            style={{
              overflowX: scroll ? "scroll" : "hidden",
            }}
          >
            {movies.map(
              (movie) =>
                movie.poster_path &&
                movie.backdrop_path && (
                  <img
                    key={movie.id}
                    onClick={() => handleClick(movie)}
                    className="row__poster"
                    src={`${ImageSource}${
                      isLargeRow ? movie.poster_path : movie.backdrop_path
                    }`}
                    alt={movie.name}
                  />
                )
            )}
          </div>
      </SwiperWindow>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
