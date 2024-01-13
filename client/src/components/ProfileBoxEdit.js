import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import MainButton from '../components/MainButton';
import { FaUserCircle } from 'react-icons/fa';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import store from '../store/index';
import { useTheme } from '../global styles/ThemeContext';
import { DarkTheme, LightTheme } from '../global styles/ColorTheme';

const ProfileBoxEdit = () => {
  const { theme } = useTheme();
  const primaryColor =
    theme === 'light' ? LightTheme.PrimaryColor : DarkTheme.PrimaryColor;

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
    'image/jpeg',
    'application/pdf'
  ];

  useEffect(
    () => {
      getUser();
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const [username, setUsername] = useState(user ? user.username : '');
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');

  const getUser = () => {
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
    const file = e.target.files[0];
    if (!fileTypes.includes(file.type)) {
      setMessage('Must be either jpg, pdf, or png');
    } else {
      setMessage('');
      previewFile(file);
    }
  };

  const previewFile = (file) => {
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
    e.preventDefault();
    if (message.length > 0 || !previewSrc || Object.keys(user) < 1) return;

    axios
      .post('/api/users/upload-image', {
        image: previewSrc,
        userID: user._id
      })
      .then((res) => {
        setMessage(res.data?.message);
        setPreviewSrc('');
        store.dispatch({
          type: 'update_user',
          user: user
        });
        getUser();
      })
      .catch((err) => {
        console.log(err);
        setMessage('Something went wrong uploading image');
      });
  };

  const updateProfile = (e) => {
    e.preventDefault();

    axios
      .patch(`/api/users/${user._id}`, {
        username:
          username !== user.username && username !== '' ? username : null,
        password: password !== '' ? password : null,
        oldPassword: oldPassword
      })
      .then((res) => {
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

  const clearHS = () => {};

  const getQuizes = () => {
    if (user?.highscores && user.highscores.length > 0) {
      return user.highscores.map((entry) => (
        <Row key={entry.quiz} className="py-1">
          <Col className="d-flex">{entry.quiz}:</Col>
          <Col className="text-primary">
            {entry.score ? entry.score : 'No score'}
          </Col>
          <Col className="col-2">
            <MainButton
              text="Clear"
              onClick={() => clearHS('hsq1')}
            ></MainButton>
          </Col>
        </Row>
      ));
    } else {
      return (
        <Row>
          <Col>No quiz scores available</Col>
        </Row>
      );
    }
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

  const displayAvi = () => {
    let profilePic = '';

    if (user?.avatar) {
      profilePic = (
        <div
          style={{
            borderRadius: '50%',
            backgroundImage: `url(${user.avatar.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: 180,
            width: 180
          }}
          alt="profile picture"
        ></div>
      );
    } else {
      profilePic = (
        <FaUserCircle
          size={180}
          className="m-3"
          style={{ color: primaryColor }}
        ></FaUserCircle>
      );
    }

    return profilePic;
  };

  //have a function to check if account has an avi from back end
  //for now it will be false bc we want to show default icon for no avi
  let pix = displayAvi();

  return (
    <Container className="">
      <Row>
        <Col className="d-flex justify-content-center">{pix}</Col>
        <input
          className="m-3 text-center"
          onChange={(e) => handleFileInputChange(e)}
          type="file"
        />
        <MainButton
          text="Upload Profile Picture"
          onClick={(e) => handleSubmitFile(e)}
        ></MainButton>
      </Row>
      <Row className="m-3">
        <Col className="d-flex justify-content-around fw-bold">Username:</Col>
        <Col className="d-flex justify-content-around text-primary">
          {user?.username}
        </Col>
      </Row>
      <Row className="m-3">
        <label htmlFor={'usernameUpdate'}>Change username:</label>
        <input
          type={'text'}
          id={'usernameUpdate'}
          name={'usernameUpdate'}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
      </Row>
      <Row className="m-3">
        <label htmlFor={'passUpdate'}>Change Password:</label>
        <input
          type={'password'}
          id={'passUpdate'}
          name={'passUpdate'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </Row>
      <Row className="m-2 border">
        <Row>
          <Col className="fw-bold">Game</Col>
          <Col className="fw-bold">Highscore</Col>
          <Col className="col-2"></Col>
        </Row>
        {getQuizes()}
      </Row>
      <Row className="m-3">
        <label htmlFor={'passCheck'}>Enter old password to save changes:</label>
        <input
          type={'password'}
          id={'passCheck'}
          name={'passCheck'}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        ></input>
      </Row>
      <Row className="m-3">
        <Col className="d-flex justify-content-start">
          <MainButton
            text="Delete Account"
            type="button"
            looks={{ width: 200 }}
            onClick={deleteUser}
          />
        </Col>
        <Col className="d-flex justify-content-end">
          <MainButton
            text="Save Changes"
            type="button"
            looks={{ width: 200 }}
            onClick={updateProfile}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileBoxEdit;
