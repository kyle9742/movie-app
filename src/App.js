import { useEffect, useState } from 'react';
import MovieList from './components/MovieList';

import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import MovieListHead from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import MovieListHeading from './components/MovieListHeading';
function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  // 검색어로 영화데이터 요청
  // async, await => 데이터를 받는데 기다려줌
  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=cae26eeb`;
    const response = await fetch(url);
    const responseJson = await response.json();
    console.log(responseJson.Search);

    if(responseJson.Search) {
      setMovies(responseJson.Search)
    }
  }

  useEffect(() => {
    if(searchValue.length > 2) {
      getMovieRequest(searchValue);
    }
  }, [searchValue]);


  return (
    <div className='container-fluid movie-app'>
    <div className='row align-items-center my-4'>
      <MovieListHeading heading='제목' />
      <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
    </div>

    <div className="row">
      <MovieList movies={movies} />
    </div>
  </div>
  );
}

export default App;