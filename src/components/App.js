import { useState, useEffect } from "react";
import searchIcon from "../resources/searchIcon.svg";
import MovieCard from "./MovieCard.jsx";

const App = () =>
{
  const [movies, setMovies] = useState([]);
  const [ search, setSearch ] = useState( "spider-man" );
  
  const searchMovies = async (title) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };
  
  useEffect(() => {
    searchMovies(search);
  }, [search]);

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img src={searchIcon} alt="search icon" onClick={() => searchMovies(search)} />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={ movie.Title } />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found !</h2>
        </div>
      )}
    </div>
  );
};

export default App;
