import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
import axios from 'axios';
import store from './store/index';
import Profile from './components/Profile/Profile';
import Quiz01 from './components/Quizzes/Quiz01';

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
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/account" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/quiz01" element={<Quiz01 />} />
        <Route path="/quiz02" element />
        {/* redirect all other paths to "/" */}
      </Routes>
    </div>
  );
};

export default App;
