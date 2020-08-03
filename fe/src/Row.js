import React, { useState, useEffect } from "react";
import instance from "./axios";
const Row = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    new Promise((resolve) => {
      resolve(instance.request({ method: "GET", url: fetchUrl }));
    }).then((value) => {
      setMovies(value);
      console.table(value);
    });
  }, [fetchUrl]);
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_postsers">
        {/* 
      sevral row posters */}
        {movies.map((movie) => (
          <img src={movie.poster_path} alt={movie.name} />
        ))}
      </div>
    </div>
  );
};

export default Row;
