import './App.css';
import DisplayGame from './silo_game/DisplayGame';

import ScoreCard from './silo_game/ScoreCard';
//import DisplayGame from './silo_game/DisplayGame';
//import { Routes, Route } from 'react-router-dom';
//import Layout from './pages/Layout';
//import GameStart from './silo_game/GameStart';

function App() {
  return (
    <div className='App'>
      <DisplayGame />
      <ScoreCard />
    </div>
  );
}

export default App;
