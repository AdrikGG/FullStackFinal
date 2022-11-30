import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
import axios from 'axios';
import store from './store/index';
import Profile from './pages/Profile';
import Quiz01 from './components/Quizzes/Quiz01';
import GuessGame from './components/Quizzes/GuessGame/GuessGame';
import './App.css';
import Login from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  useEffect(() => {
    if (localStorage.getItem('_ID')) {
      axios
        .get(`/api/users/${localStorage.getItem('_ID')}`)
        .then((res) => {
          store.dispatch({
            user: res.data.user,
            type: 'set_user',
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="app">
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
        {/* <Route index element={<Home />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        {/* </Route> */}
        {/* <Route path="/account" element={<Auth />} /> */}
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/quiz01" element={<Quiz01 />} />
        <Route path="/guess-game" element={<GuessGame />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
};

export default App;
