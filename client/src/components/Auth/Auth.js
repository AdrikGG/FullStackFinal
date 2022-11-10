import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

const Auth = () => {
  const [tab, setTab] = useState('login');

  const login = (username, email, password) => {
    console.log(username, email, password);
  };

  let page = tab === 'login' ? <Login submit={login} /> : <Signup />;

  return (
    <>
      <h1>App Name</h1>
      <h2>Welcome to GeoQuiz</h2>
      {page}
    </>
  );
};

export default Auth;
