import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import axios from 'axios';
import store from '../../store/index';

const Auth = () => {
  const [page, setPage] = useState('login');

  const login = (username, password) => {
    axios
      .post('/api/users/login', { username, password })
      .then((res) => {
        if (res.data.success) {
          store.dispatch({
            type: 'login',
            _id: res.data.user._id,
            user: res.data.user,
            token: res.data.token,
          });
          window.location = '/dashboard';
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signup = (username, password) => {
    axios
      .post('/api/users/register', { username, password })
      .then((res) => {
        if (res.data.success) {
          setPage('login');
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changePage = () => {
    setPage(page === 'login' ? 'signup' : 'login');
  };

  let currPage =
    page === 'login' ? <Login submit={login} /> : <Signup submit={signup} />;

  return (
    <>
      <h2>Welcome to GeoQuiz</h2>
      {currPage}
      <div onClick={changePage}>
        {page === 'login'
          ? 'New to GeoQuiz? Sign up here!'
          : 'Already have an account? Login here!'}
      </div>
    </>
  );
};

export default Auth;
