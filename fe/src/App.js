import React from "react";
import "./App.css";
import Row from "./Row";
import requests from "./request";

function App() {
  return (
    <div className="App">
      <h1>Hey clever programmer! Let's build dev</h1>
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
    </div>
  );
}

export default App;
