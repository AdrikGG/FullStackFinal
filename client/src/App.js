import './App.css';
import SiloGame from './silo_game/SiloGame';

import ScoreCard from './silo_game/ScoreCard';
//import DisplayGame from './silo_game/DisplayGame';
//import { Routes, Route } from 'react-router-dom';
//import Layout from './pages/Layout';
//import GameStart from './silo_game/GameStart';

function App() {
  return (
    <div className='App'>
      <SiloGame />
      <ScoreCard />
    </div>
  );
}

export default App;
