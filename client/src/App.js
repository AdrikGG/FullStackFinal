import logo from './logo.svg';
import './App.css';
//import ScoreBox from './silo_game/ScoreBox';
import SiloGame from './silo_game/SiloGame';

//import DisplayGame from './silo_game/DisplayGame';
//import { Routes, Route } from 'react-router-dom';
//import Layout from './pages/Layout';
//import GameStart from './silo_game/GameStart';
import 'bootstrap/dist/css/bootstrap.min.css';

import MyNavbar from './pages/MyNavbar';
import Home from './pages/Home';
import Quiz01 from './components/Quizzes/Quiz01';
import GuessGame from './components/Quizzes/GuessGame/GuessGame';
import Login from './pages/Login';
import Profile from './pages/Profile';

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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
