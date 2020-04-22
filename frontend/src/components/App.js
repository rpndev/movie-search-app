import React, { useEffect, useReducer } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Header";
import Search from "./Search";
import "./App.css";
import fetch from "cross-fetch";
import Movie from "./Movie";
const initialState = {
  loading: true,
  error: null,
  movies: [],
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_LOADING":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "SEARCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case "SEARCH_MOVIES":
      return {
        ...state,
        loading: false,
        movies: action.payload,
      };
    default:
      return state;
  }
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    fetch(`http://localhost:5000/api/search?apikey=4a3b711b&keyword=titanic`)
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: "SEARCH_MOVIES",
          payload: res.Search,
        });
      });
  }, []);

  const search = (searchVal) => {
    dispatch({
      type: "SEARCH_LOADING",
    });
    fetch(
      `http://localhost:5000/api/search?apikey=4a3b711b&keyword=${searchVal}&page=1`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES",
            payload: res.Search,
          });
        } else {
          dispatch({
            type: "SEARCH_ERROR",
            error: res.Error,
          });
        }
      });
  };
  const { movies, error, loading } = state;
  return (
    <div className="App">
      <Router>
        <Header></Header>
      </Router>
      <Search search={search}></Search>
      <div className="movies">
        {loading && !error ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          movies.map((movie, index) => (
            <Movie key={index} movie={movie}></Movie>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
