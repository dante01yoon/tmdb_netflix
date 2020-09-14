import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import Nav from "./Nav";
import SwiperRow from "./SwiperRow";
import SingleSlider from "./components/SingleSlider";
import Row from "./Row";
import "./App.css";
import instance from "./axios";
import requests from "./request";

function App() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    new Promise((resolve) => {
      resolve(
        instance.request({ method: "GET", url: requests.fetchNetflixOriginals })
      );
    }).then((response) => {
      setMovies(response.data.results);
    });
  }, []);
  return (
    <div className="App">
      <Nav />
      <Banner />
      <SingleSlider data={movies} />
      <SwiperRow
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
      />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow={true}
        scroll={false}
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
}

export default App;
