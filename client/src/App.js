import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import store from './store/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import MyNavbar from './pages/MyNavbar';
import Home from './pages/Home';
import SiloGame from './components/Quizzes/silo_game/SiloGame';
import GuessGame from './components/Quizzes/GuessGame/GuessGame';
import Login from './pages/Login';
import Profile from './pages/Profile';

//import ScoreBox from './silo_game/ScoreBox';
//import DisplayGame from './silo_game/DisplayGame';
//import { Routes, Route } from 'react-router-dom';
//import Layout from './pages/Layout';
//import GameStart from './silo_game/GameStart';

const App = () => {
  useEffect(() => {
    if (localStorage.getItem('_ID')) {
      axios
        .get(`/api/users/${localStorage.getItem('_ID')}`)
        .then((res) => {
          store.dispatch({
            user: res.data.user,
            type: 'set_user'
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="app">
      <MyNavbar />
      <Routes>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/silhouette" element={<SiloGame />} />
        <Route path="/guess-game" element={<GuessGame />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
};

export default App;
