import React, { useEffect, useState, useRef } from "react";
import movieTrailer from "movie-trailer";
// import ReactPlayer from "react-player";
import "./Banner.css";
import axios from "../../utils/axios";
import  requests from "../../utils/requests";



 function Banner() {
    const [movie, setMovie] = useState({});
    const movieTitleRef = useRef("");
    const [trailerUrl, setTrailerUrl] = useState("");
    useEffect(() => {
        (async () => {
          try {
            const request = await axios.get(
              requests.fetchNetflixOriginals
            );
            console.log(request)
            console.log(request.data.results.length)
            setMovie(
              request.data.results[
                Math.floor(Math.random() * request.data.results.length)
              ]
            //   request.data.results[randomly created index]
            );
    
            movieTitleRef.current =
              movie?.title || movie?.name || movie?.original_name;
              // either of three if exits in reference to thier order
          } catch (error) {
            console.log("error", error);
          }
        })();
      }, []);
      useEffect(() => {
        const fetchTrailer = async () => {
          try {
            const url = await movieTrailer(movieTitleRef.current);
            console.log(url);
            setTrailerUrl(url);
            const urlParams = new URLSearchParams(new URL(url).search);
            console.log(urlParams);
            console.log(urlParams.get("v"));
            setTrailerUrl(urlParams.get("v"));
          } catch (error) {
            console.log("error", error);
          }
        };
    
        const timeoutId = setTimeout(fetchTrailer, 10000);
    
        return () => clearTimeout(timeoutId);
      }, []);
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
  )
}
export default Banner;


 /*
  use ref
  When you're reading a book and you want to remember a specific page, you might use a bookmark.
   You can place the bookmark at a certain page, and then you can easily go back to that page later
    without having to flip through the entire book again. The bookmark doesn't change the content of the book; 
    it just helps you remember where you left off.Similarly, in React, useRef is like a bookmark for
     your components. You can use it to "bookmark" a value or a DOM element so that you can easily 
     access it later without causing the component to re-render. like in this we  have a component
      that displays a list of items, and you want to remember the currently selected item without 
      causing the component to re-render every time the selection changes. You can use useRef to 
      create a "bookmark" for the selected item. This way, you can update the selected item without
       triggering a re-render of the component.
       intalization 
       const myRef = useRef(initialValue);
       the to update we can use current property 
       myRef.current // Access the current value
       myRef.current = newValue // Update the current value

 ...... 
  

  movieTrailer is like library to search for the trailer based on the movie title.
  It uses movieTrailer(movieTitleRef.current) to fetch the trailer URL for 
  the movie title stored in movieTitleRef.current. sets it using setTrailerUrl, and then extracts
   the video ID from the URL using URLSearchParams and sets it again using setTrailerUrl.
    After defining the fetchTrailer function, a setTimeout is set to call fetchTrailer after
     5000 milliseconds (5 seconds). This delay might be intended to give the component some time
    to render before fetching the trailer.a cleanup function is returned from useEffect. 
    This cleanup function clears the timeout set by setTimeout to prevent memory leaks or 
    potential issues when the component unmounts or when the effect is re-triggered

  */


































