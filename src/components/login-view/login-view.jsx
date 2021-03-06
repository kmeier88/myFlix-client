import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Container, Card } from 'react-bootstrap';

import axios from 'axios';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios
      .post('https://moviesrule.herokuapp.com/login', {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        console.log('no such user');
      });
  };

  return (
    <Container fluid className='loginContainer'>
      <Card bg='#fc766aff' className='loginCard'>
        <Card.Body>
          <Card.Title className='text-center'>
            Welcome to the login page!
          </Card.Title>
          <Card.Subtitle className='mb-2 text-muted text-center'>
            Please Login
          </Card.Subtitle>
          <Form>
            <Form.Group controlId='formUsername'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Enter a username'
              />
            </Form.Group>
            <Form.Group controlId='formPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                className='mb-3'
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter a password'
              />
            </Form.Group>
            <Button
              className='loginButton'
              variant='secondary'
              size='lg'
              type='submit'
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};
