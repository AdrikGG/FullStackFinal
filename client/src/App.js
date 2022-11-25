import './App.css';
import ScoreCard from './silo_game/ScoreCard';
import DisplayGame from './silo_game/DisplayGame';
import GameStart from './silo_game/GameStart';

function App() {
  return( 
    <GameStart />,
    <DisplayGame />,
    <ScoreCard />
  );
}

export default App;
