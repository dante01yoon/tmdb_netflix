import React, { useEffect, useState } from "react";
import requests from "./request";
import instance from "./axios";
import "./Banner.css";

const Banner = ({}) => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    new Promise((resolve) => {
     const request = instance.get(requests.fetchNetflixOriginals);
     resolve(request); 
    }).then((request) => {
      const selectedData = Math.floor(Math.random() * request.data.results.length)
      setMovie(request.data.results[selectedData]);
    });
  },[]);
  const truncate =(str, n) => {
    return str?.length > n ? str.substr(0,n-1) + "..." : str; 
  }
  return(
    <header className="banner"> 
      <div className="banner__image__wrapper">
        <div 
          className="banner__image"
          style={{
            background: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}') center/100% no-repeat`,
          }}
        /> 
      </div>
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button button__play">Play</button>
          <button className="banner__button button__list">My List</button>
        </div>
        <h1 className="banner__description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner__fadeBottom"/>
    </header>
  )
}

export default Banner;