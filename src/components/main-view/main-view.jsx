import React from 'react';
import axios from 'axios';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
    };
  }

  componentDidMount() {
    axios
      .get('https://moviesrule.herokuapp.com/movies')
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  onLoggedIn(user) {
    this.setState({
      user,
    });
  }

  render() {
    const { movies, selectedMovie, user, registration } = this.state;

    if (!registration)
      return (
        <RegistrationView
          onRegistration={(registration) => this.onRegistration(registration)}
        />
      );

    if (!user)
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    if (movies.length === 0) return <div className='main-view'></div>;

    return (
      <div className='main-view'>
        <Navbar expand='lg' bg='#162b48' variant='dark' className='mainNavbar'>
          <Container>
            <Navbar.Brand href='#myflix'>My Flix</Navbar.Brand>
            <Nav className='me-auto'>
              <Nav.Link href='#profile'>Profile</Nav.Link>
              <Nav.Link href='#update-profile'>Update Profile</Nav.Link>
              <Nav.Link href='#logout'>Logout</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <Row className='main-view justify-content-md-center'>
          {selectedMovie ? (
            <Col md={8}>
              <MovieView
                movie={selectedMovie}
                onBackClick={(newSelectedMovie) => {
                  this.setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ) : (
            movies.map((movie) => (
              <Col md={3} key={movie._id}>
                <MovieCard
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    this.setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            ))
          )}
        </Row>
      </div>
    );
  }
}
