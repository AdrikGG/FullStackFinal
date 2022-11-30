import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import MyNavbar from './pages/MyNavbar';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<MyNavbar />}>
          <Route index element={<Home />} />
          <Route path='Login' element={<Login />} />
          <Route path='Profile' element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
