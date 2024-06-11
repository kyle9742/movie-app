import { useEffect, useState } from "react";
import MovieList from "./components/MovieList";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SearchBox from "./components/SearchBox";
import MovieListHeading from "./components/MovieListHeading";
import ScrollContainer from "react-indiana-drag-scroll";

function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  // 검색어로 영화데이터 요청
  // async, await => 데이터를 받는데 기다려줌
  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=cae26eeb`;
    const response = await fetch(url);
    const responseJson = await response.json();
    console.log(responseJson.Search);

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    if (searchValue.length > 2) {
      getMovieRequest(searchValue);
    }
  }, [searchValue]);

  // 시작시 선호작을 저장소에서 가져온다. 
  useEffect(() => {
    const movieFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (movieFavorites) {
      setFavorites(movieFavorites);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('favorites', JSON.stringify(items));
  };

  const addFavoriteMovie = (movie) => {
    const newList = [...favorites, movie];
    setFavorites(newList);
    saveToLocalStorage(newList);
  };
  
  return (
    <div className="container-fluid movie-app">
      <div className="row align-items-center my-4">
        <MovieListHeading heading="영화 검색과 선호작 등록" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>

      <ScrollContainer className="row">
        <MovieList movies={movies} handleClick={addFavoriteMovie} />
      </ScrollContainer>

      <div className="row align-items-center my-4">
        <MovieListHeading heading="내 선호작" />
      </div>

      <ScrollContainer className="row scroll-container">
        <MovieList movies={favorites}/>
      </ScrollContainer>
    </div>
  );
}

export default App;
