import React from "react";

function Movie({ movie }) {
  return (
    <div className="movie">
      <img src={movie.Poster} alt={`title: ${movie.Title}`}></img>
      <h2>{movie.Title}</h2>
    </div>
  );
}

export default Movie;
