import React, { useState } from 'react';
import { Tab, Form, Nav, Container, Col, Row } from 'react-bootstrap';
import MainButton from './MainButton';
import './AccountBox.css';

import axios from 'axios';
import store from '../store/index';
import { useNavigate } from 'react-router-dom';

const AccountBox = () => {
  const navigate = useNavigate();

  const [key, setKey] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmitLogin = (event) => {
    event.preventDefault();
    //Check for existsing account and give errors if incorrect username/pass
    axios
      .post('/api/users/login', { username, password })
      .then((res) => {
        if (res.data.success) {
          store.dispatch({
            type: 'login',
            _id: res.data.user._id,
            user: res.data.user,
            token: res.data.token
          });
          setError(false);
          setMessage('');
          navigate('/dashboard');
          window.location.reload();
        } else if (res.data.message.includes('Incorrect password')) {
          setError(true);
          setMessage('Incorrect username or password');
          console.log(res);
        } else {
          setError(true);
          setMessage('Something went wrong. Please Try again.');
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setMessage('Something went wrong. Please Try again.');
      });
  };

  const handleSubmitRegister = (event) => {
    event.preventDefault();

    if (password === repassword) {
      axios
        .post('/api/users/register', { username, password })
        .then((res) => {
          if (res.data.success) {
            setError(false);
            setMessage('');
            setKey('login');
          } else if (res.data.message.includes('Username already taken')) {
            setError(true);
            setMessage('Username already taken');
          } else {
            setError(true);
            setMessage('Something went wrong. Please Try again.');
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setError(true);
      setMessage('Passwords do not match');
    }
  };

  return (
    <Container className="mt-5 pt-5">
      <Row className="justify-content-center">
        <Col sm={10} md={8} lg={6} xl={5}>
          <Tab.Container activeKey={key} onSelect={(temp) => setKey(temp)}>
            <Nav className="nav-justified" variant="pills">
              <Nav.Item className="pill1 rounded bg-white" style={{}}>
                <Nav.Link eventKey={'login'}>Login</Nav.Link>
              </Nav.Item>
              <Nav.Item className="pill2 rounded bg-white">
                <Nav.Link eventKey={'signup'}>Register</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey={'login'}>
                <Form
                  className="border rounded bg-light p-2"
                  onSubmit={handleSubmitLogin}
                >
                  <Form.Group
                    className="mx-5 mb-2 p-2"
                    controlId="loginUsername"
                  >
                    <Form.Label className="">Username</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mx-5 mb-3 p-2"
                    controlId="loginPassword"
                  >
                    <Form.Label className="">Password</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </Form.Group>
                  {error && (
                    <p className="text-center text-danger">{message}</p>
                  )}
                  <Form.Group>
                    <div className="d-grid mx-5">
                      <MainButton text="Submit" type="submit" />
                    </div>
                  </Form.Group>
                </Form>
              </Tab.Pane>
              <Tab.Pane eventKey={'signup'}>
                <Form
                  className="border rounded bg-light p-2"
                  onSubmit={handleSubmitRegister}
                >
                  <Form.Group className="mx-5 mb-2 p-2">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                    />
                  </Form.Group>
                  <Form.Group className="mx-5 mb-2 p-2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </Form.Group>
                  <Form.Group className="mx-5 mb-2 p-2">
                    <Form.Label>Re-Enter Password</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={(e) => setRepassword(e.target.value)}
                      value={repassword}
                    />
                  </Form.Group>
                  {error && (
                    <p className="text-center text-danger">{message}</p>
                  )}
                  <div className="d-grid mx-5">
                    <MainButton text="Create Account" type="submit" />
                  </div>
                </Form>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
};

export default AccountBox;
