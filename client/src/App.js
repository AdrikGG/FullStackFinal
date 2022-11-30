import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
import axios from 'axios';
import store from './store/index';
import Profile from './components/Profile/Profile';
import Quiz01 from './components/Quizzes/Quiz01';
import GuessGame from './components/Quizzes/GuessGame/GuessGame';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Layout from './pages/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/quiz01" element={<Quiz01 />} />
        <Route path="/guess-game" element={<GuessGame />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
    <div className='App'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='Login' element={<Login />} />
          <Route path='Profile' element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
