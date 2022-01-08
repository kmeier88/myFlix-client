import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    constructor() {
    super();
    this.state = {
      movies: [{ _id: 1, Title: 'Avatar', Description: 'A paraplegic Marine dispatched to the moon Pandora on a unique mission', ImagePath: 'https://m.media-amazon.com/images/I/51TIUdSaBUL._SY445_.jpg'},
        { _id: 2, Title: 'Transformers', Description: 'An ancient struggle between two Cybertronian races', ImagePath: 'https://m.media-amazon.com/images/I/51REhA8e-gL._SY445_.jpg'},
        { _id: 3, Title: 'Prometheus', Description: 'Following clues to the origin of mankind a team finds a structure', ImagePath: 'https://m.media-amazon.com/images/I/91mgd1UYdvL._SX342_.jpg'}],
      selectedMovie: null
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;


    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
          ))
        }
      </div>
    );
  }
}