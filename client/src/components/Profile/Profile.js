import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import store from '../../store/index';

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(useSelector((state) => state.user));
  const [previewSrc, setPreviewSrc] = useState('');
  const [message, setMessage] = useState('');
  const fileTypes = [
    'jpg',
    'png',
    'jpeg',
    'image/jpg',
    'image/png',
    'image/jpeg'
  ];

  useEffect(() => {
    getUser();
  }, []);

  const [username, setUsername] = useState(user ? user.username : '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const getUser = () => {
    console.log('get user');
    let id = localStorage.getItem('_ID');
    if (!id) {
      console.log('invalid path: no user logged in');
      localStorage.clear();
      navigate('/dashboard');
      window.location.reload();
    }
    axios
      .get('/api/users/' + id)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFileInputChange = (e) => {
    console.log('handle file input change');
    const file = e.target.files[0];
    if (!fileTypes.includes(file.type)) {
      setMessage('Must be either jpg, pdf, or png');
    } else {
      setMessage('');
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    console.log('preview file');
    if (file.size > 10000000) {
      setMessage('File size too big');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSrc(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    console.log('handle submit file');
    e.preventDefault();
    if (message.length > 0 || !previewSrc || Object.keys(user) < 1) return;
    axios
      .post(
        '/api/users/upload-image',
        JSON.stringify({
          data: previewSrc,
          _id: user._id
        })
      )
      .then((res) => {
        if (res.data && res.data.message) {
          setMessage(res.data.message);
          setPreviewSrc('');
        } else {
          setMessage('Success');
          setPreviewSrc('');
        }
        getUser();
      })
      .catch((err) => {
        console.log(err);
        setMessage('Something went wrong uploading image');
      });
  };

  const updateProfile = (e) => {
    e.preventDefault();
    console.log('updating profile');
    if (password !== confirmPassword) {
      setMessage('Password fields must match');
      return;
    }
    console.log(
      username !== user.username ? username : null,
      password !== '' ? password : null
    );
    axios
      .patch(`/api/users/${user._id}`, {
        username:
          username !== user.username && username !== '' ? username : null,
        password: password !== '' ? password : null
      })
      .then((res) => {
        console.log(res);
        store.dispatch({
          type: 'update_user',
          user: user
        });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setMessage('Something went wrong updating your profile');
      });
  };

  const deleteUser = () => {
    axios
      .delete(`/api/users/${user._id}`)
      .then(() => {
        localStorage.clear();
        navigate('/dashboard');
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setMessage(`User ${user.username} could not be deleted`);
      });
  };

  let userInfo;
  if (user) {
    userInfo = (
      <div>
        <div className="highscores">
          <h2>Your Highscores</h2>
          <div>{`Quiz 1 Highscore: ${
            user.highscores
              ? user.highscores.quiz1
                ? user.highscores.quiz1
                : 'No score'
              : 'No score'
          }`}</div>
          <div>{`Guess Game Highscore: ${
            user.highscores
              ? user.highscores.quiz2
                ? user.highscores.quiz2
                : 'No score'
              : 'No score'
          }`}</div>
        </div>
        <img
          src={
            user.avatar
              ? user.avatar
              : `https://icon-library.com/images/avatar-png-icon/avatar-png-icon-9.jpg`
          }
          alt="avatar"
          className="avatar"
          style={{
            borderRadius: '50%',
            objectFit: 'cover',
            margin: '20px auto 0 25px',
            width: '20rem',
            height: '20rem'
          }}
        />
        <div className="img-uploader">
          <div>Upload Avatar Image</div>
          <div className="upload-box">
            <input onChange={(e) => handleFileInputChange(e)} type="file" />
            {previewSrc ? (
              <img
                className="display-image"
                alt="selected"
                src={previewSrc}
                style={{ width: '8rem', height: '8rem' }}
              />
            ) : user.avatar && user.avatar.url ? (
              <img
                style={{
                  borderRadius: '50%',
                  objectFit: 'cover',
                  margin: '20px auto 0 25px',
                  width: '25vw',
                  height: '25vw'
                }}
                className="display-image"
                alt="display"
                src={user.avatar.url}
              />
            ) : (
              <img
                className="display-image"
                alt="display"
                src={previewSrc}
                style={{ width: '10rem', height: '10rem' }}
              />
            )}
          </div>
          <div
            style={{
              color: message === 'Success' ? 'green' : 'red',
              fontSize: '.8em',
              margin: '20px 0'
            }}
          >
            {message}
          </div>
          <button
            className="image-btn"
            style={{ marginTop: '20px' }}
            onClick={(e) => handleSubmitFile(e)}
          >
            Save
          </button>
        </div>
        <form onSubmit={updateProfile}>
          <div className="username-wrapper">
            <div className="username">Change Username</div>
            <input
              type={'text'}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="password-wrapper">
            <div className="username">Change Password</div>
            <input
              type={'text'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="username">Confirm Password</div>
            <input
              type={'text'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  } else {
    userInfo = (
      <div>
        <div>Loading</div>
      </div>
    );
  }

  return (
    <div className="profile-wrapper">
      <h1>{`${user?.username}'s profile`}</h1>
      <div>{userInfo}</div>
      <button onClick={deleteUser}>Delete Account</button>
    </div>
  );
};

export default Profile;
