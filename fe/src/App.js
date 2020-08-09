import React from "react";
import requests from "./request";

import Banner from "./Banner";
import Nav from "./Nav";
import Row from "./Row";
import Swiper from "./Swiper";
import SwiperWindow from "./SwiperWindow";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Nav />
      <Banner />
      <SwiperWindow>
        <Swiper>
          <Row
            title="NETFLIX ORIGINALS"
            fetchUrl={requests.fetchNetflixOriginals}
            isLargeRow={true}
            scroll={false}
          />
        </Swiper>
      </SwiperWindow>
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
