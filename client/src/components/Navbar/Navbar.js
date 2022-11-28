import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    // log user out
    localStorage.clear();
    navigate('/dashboard');
  };

  const user = useSelector((state) => state.user);
  if (user) console.log(user);

  let userInfo;
  if (user) {
    userInfo = (
      <div>
        <div
          className="profile-wrapper"
          onClick={() => {
            navigate('/profile');
          }}
        >
          <div
            className="avatar"
            style={{
              backgroundImage:
                user.avatar ||
                `url(https://icon-library.com/images/avatar-png-icon/avatar-png-icon-9.jpg)`,
              backgroundSize: '50px 50px',
              width: '50px',
              height: '50px',
            }}
          ></div>
          <div className="username">{user.username}</div>
        </div>
        <button onClick={logout}>Log Out</button>
      </div>
    );
  } else {
    userInfo = (
      <div>
        <button
          onClick={() => {
            navigate('/account');
          }}
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="navbar-wrapper">
      <div
        className="header-wrapper"
        onClick={() => {
          navigate('/dashboard');
        }}
      >
        <h1 className="header">GeoQuiz</h1>
      </div>
      <div className="user">{userInfo}</div>
    </div>
  );
};

export default Navbar;
