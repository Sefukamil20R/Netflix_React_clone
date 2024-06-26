import React, { useEffect, useState, useRef } from "react";
import "./Banner.css";
import axios from "../../utils/axios";
import requests from "../../utils/requests";

function Banner() {
  const [movie, setMovie] = useState({});
  useEffect(() => {
    (async () => {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        console.log(request);
        console.log(request.data.results.length);
        setMovie(
          request.data.results[
            Math.floor(Math.random() * request.data.results.length)
          ]
          //   request.data.results[randomly created index]
          // resulting value ranges from 0 (inclusive) to length - 1 (inclusive),to give valid indices.
        );
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);
  //  () This pattern is known as an Immediately Invoked Function Expression (IIFE).

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    // if str.len > given len we cut off the text up to n-1 and add ... else given text it self
  }
  return (
    <>
      <div
        className="banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`,
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="banner__buttons">
            <button className="banner__button">Play</button>
            <button className="banner__button">My List</button>
          </div>
          <h1 className="banner__description">
            {truncate(movie?.overview, 150)}
          </h1>
        </div>
        <div className="banner__fadeBottom" />
      </div>
    </>
  );
}
export default Banner;
