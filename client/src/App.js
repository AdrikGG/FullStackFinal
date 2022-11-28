import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import GuessGame from './GuessGame/GuessGame';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Auth />} />
      <Route path="/GuessGame" element={<GuessGame />} />
    </Routes>
  );
};

export default App;
