import React, { useState, useEffect } from "react";
import instance from "./axios";
import "./Row.css";
const ImageSource = "https://image.tmdb.org/t/p/original";

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    new Promise((resolve) => {
      resolve(instance.request({ method: "GET", url: fetchUrl }));
    }).then((value) => {
      setMovies(value.data.results);
    });
  }, [fetchUrl]);
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {/* 
      sevral row posters */}
        {movies.map((movie) => (
          movie.poster_path && movie.backdrop_path && 
          <img 
            key={movie.id}
            className="row__poster"
            src={`${ImageSource}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
            alt={movie.name} 
          />
        ))}
      </div>
    </div>
  );
};

export default Row;
