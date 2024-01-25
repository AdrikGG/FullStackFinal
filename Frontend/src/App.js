import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useTheme } from './global styles/ThemeContext';
import axios from 'axios';

import store from './store/index';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './pages/Navbar';
import Home from './pages/Home';
import SilhouettesGame from './components/Quizzes/SilhouettesGame/SilhouettesGame';
import HotColdGame from './components/Quizzes/HotColdGame/HotColdGame';
import MalayIslandsGame from './components/Quizzes/MalayIslandsGame/MalayIslandsGame';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { DarkTheme, LightTheme } from './global styles/ColorTheme';

const App = () => {
  const { theme } = useTheme();
  const tertiaryColor =
    theme === 'light' ? LightTheme.TertiaryColor : DarkTheme.TertiaryColor;

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
    <div
      className="app"
      id="app"
      style={{
        backgroundColor: tertiaryColor,
        height: '100vh',
        overflow: 'scroll'
      }}
    >
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/silhouette" element={<SilhouettesGame />} />
        <Route path="/guess-game" element={<HotColdGame />} />
        <Route path="/malay-islands" element={<MalayIslandsGame />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
};

export default App;
