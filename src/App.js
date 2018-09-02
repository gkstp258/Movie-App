import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

class App extends Component {
  //arrow function(화살표 함수) 에는 return이 내재되어있다.
  //Render: componentWillMount() => render() => componentDidMount()

  state = {}

  componentDidMount() {
    this._getMovies()
  }

  _rednerMovies = () => {
   const movies = this.state.movies.map(movie => {
      return <Movie 
      title = {movie.title_english} 
      poster = {movie.medium_cover_image}  
      key = {movie.id}
      genres={movie.genres}
      synopsis = {movie.synopsis}
      />
    })
    return movies
  }

  _getMovies = async () => {
    const movies = await this._callApi()
    this.setState({
      movies
    })
  }

  //위의 라인이 완료되면 뭔가를 해라, 근데 위의 라인이 에러가 있다면 잡아서(catch) 나에게 보여달라.
  _callApi = () => {
    return fetch('https://yts.am/api/v2/list_movies.json?sort_by=rating')
    .then(response => response.json())
    .then(json => json.data.movies)
    .catch(err => console.log(err))
  }

  render() {
    const {movies} = this.state;
    return (
      <div className={movies ? "App" : "App-Loading"}>
        {movies ? this._rednerMovies() : 'Loading'}
      </div>
    );
  }
}

export default App;
