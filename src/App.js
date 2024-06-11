import { useEffect, useState } from 'react';
import MovieList from './components/MovieList';

import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
function App() {
  const [movies, setMovies] = useState([]);

  // 검색어로 영화데이터 요청
  // async, await => 데이터를 받는데 기다려줌
  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?apikey=cae26eeb&s=${searchValue}`;
    const response = await fetch(url);
    const responseJson = await response.json();
    console.log(responseJson.Search);
  }

  useEffect(() => {

  }, [])

  getMovieRequest('amazing');

  return (
    <div className='container-fluid movie-app'>
      <div className='row'>
        <MovieList movies={movies} />
      </div>
    </div>
  );
}

export default App;