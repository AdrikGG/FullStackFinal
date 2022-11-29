import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const play = (e) => {
    console.log(e.target.id);
    // initialize games with game options
    if (e.target.id === 'game1') {
      // play game 1
      navigate('/quiz01');
    } else if (e.target.id === 'game2') {
      // play game 2
      navigate('/guess-game');
    }
  };

  return (
    <div className="dashboard-wrapper">
      <h1>Dashboard</h1>
      <div className="games">
        <div className="game">
          <h2>Game 1</h2>
          <div className="thumbnail-1"></div>
          <div className="btn-wrapper">
            <button id="game1" onClick={play}>
              Play
            </button>
            <button>Check Leaderboard</button>
          </div>
        </div>
        <div className="game">
          <h2>Game 2</h2>
          <div className="thumbnail-2"></div>
          <div className="btn-wrapper">
            <button id="game2" onClick={play}>
              Play
            </button>
            <button>Check Leaderboard</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
