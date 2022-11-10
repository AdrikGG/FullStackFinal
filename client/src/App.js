import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from './components/Auth/Auth';

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Auth />} />
    </Routes>
  );
};

export default App;
