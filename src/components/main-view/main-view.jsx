import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from 'react-router-dom';

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
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
      this.getMovies(accessToken);
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios
      .get('https://moviesrule.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
  }

  render() {
    const { movies, user } = this.state;

    if (!user)
      return (
        <Row>
          <Col>
            <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
          </Col>
        </Row>
      );
    if (movies.length === 0) return <div className='main-view' />;

    return (
      <Router>
        <Route
          path="/movies/:movieID"
          render={({ match }) => {
            return (
              <Col md={8}>
                <MovieView
                  movie={movies.find((m) => m._id === match.params.movieId)}
                />
              </Col>
            );
          }}
        />
        <Route
          exact
          path="/"
          render={() => {
            if (!user)
              return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
            if (movies.length === 0) return <div className="main-view" />;
            return movies.map((m) => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ));
          }}
        />
        <Route
          path="/register"
          render={() => {
            if (user) return <Redirect to="/" />;
            return (
              <Col>
                <RegistrationView />
              </Col>
            );
          }}
        />

        <Route
          exact
          path="/movies/:movieId"
          render={({ match, history }) => {
            if (!user)
              return <LoginView OnLoggedIn={(user) => this.onLoggedIn(user)} />;
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <Col md={8}>
                <MovieView
                  movie={movies.find((m) => m._Id === match.params.MovieId)}
                  onBackClick={() => history.goBack()}
                />
              </Col>
            );
          }}
        />
        <Route
          exact
          path="/genres/:name"
          render={({ match }) => {
            if (!user)
              return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <Col md={8}>
                <GenreView
                  genre={
                    movies.find((m) => m.Genre.Name === match.params.name).Genre
                  }
                  onBackClick={() => history.goBack()}
                />
              </Col>
            );
          }}
        />
        <Route
          exact
          path="/directors/:name"
          render={({ match, history }) => {
            if (!user)
              return <LoginView OnLoggedIn={(user) => this.onLoggedIn(user)} />;
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <Col md={8}>
                <DirectorView
                  director={
                    movies.find((m) => m.Director.Name === match.params.name)
                      .Director
                  }
                  onBackClick={() => history.goBack()}
                />
              </Col>
            );
          }}
        />
        <Route
          path="/users/:username"
          render={({ history, match }) => {
            if (!user)
              return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <Col md={4}>
                <ProfileView
                  history={history}
                  movies={movies}
                  user={user === match.params.username}
                />
              </Col>
            );
          }}
        />
      </Router>

//   render() {
//     const { movies, selectedMovie, user, registration } = this.state;

//     if (!registration)
//       return (
//         <RegistrationView
//           onRegistration={(registration) => this.onRegistration(registration)}
//         />
//       );

//     if (!user)
//       return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

//     if (movies.length === 0) return <div className='main-view'></div>;

//     return (
//       <div className='main-view'>
//         <Navbar expand='lg' bg='#162b48' variant='dark' className='mainNavbar'>
//           <Container>
//             <Navbar.Brand href='#myflix'>My Flix</Navbar.Brand>
//             <Nav className='me-auto'>
//               <Nav.Link href='#profile'>Profile</Nav.Link>
//               <Nav.Link href='#update-profile'>Update Profile</Nav.Link>
//               <Nav.Link href='#logout'>Logout</Nav.Link>
//             </Nav>
//           </Container>
//         </Navbar>

//         <Row className='main-view justify-content-md-center'>
//           {selectedMovie ? (
//             <Col md={8}>
//               <MovieView
//                 movie={selectedMovie}
//                 onBackClick={(newSelectedMovie) => {
//                   this.setSelectedMovie(newSelectedMovie);
//                 }}
//               />
//             </Col>
//           ) : (
//             movies.map((movie) => (
//               <Col md={3} key={movie._id}>
//                 <MovieCard
//                   movie={movie}
//                   onMovieClick={(newSelectedMovie) => {
//                     this.setSelectedMovie(newSelectedMovie);
//                   }}
//                 />
//               </Col>
//             ))
//           )}
//         </Row>
//         <button
//           onClick={() => {
//             this.onLoggedOut();
//           }}
//         >
//           Logout
//         </button>
//       </div>
//     );
//   }
// }

// import React from 'react';
// import axios from 'axios';

// import { RegistrationView } from '../registration-view/registration-view';
// import { LoginView } from '../login-view/login-view';
// import { MovieCard } from '../movie-card/movie-card';
// import { MovieView } from '../movie-view/movie-view';

// import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
// export class MainView extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       movies: [],
//       selectedMovie: null,
//     };
//   }

//   render() {
//     return (
//       <div className='main-view'>
//         <h1>TEST</h1>
//       </div>
//     );
//   }
// }
