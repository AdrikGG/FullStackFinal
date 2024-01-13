import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DarkTheme, LightTheme } from '../global styles/ColorTheme';
import { useTheme } from '../global styles/ThemeContext';

const ProfileBox = () => {
  const { theme } = useTheme();
  const primaryColor =
    theme === 'light' ? LightTheme.PrimaryColor : DarkTheme.PrimaryColor;

  const navigate = useNavigate();
  const [user, setUser] = useState(useSelector((state) => state.user));

  useEffect(
    () => {
      getUser();
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

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

  const getQuizes = () => {
    if (user?.highscores && user.highscores.length > 0) {
      return user.highscores.map((entry) => (
        <Row key={entry.quiz}>
          <Col className="d-flex">{entry.quiz}:</Col>
          <Col className="text-primary">
            {entry.score ? entry.score : 'No score'}
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

  //have a function to check if account has an avi from back end
  //for now it will be false bc we want to show default icon for no avi
  let pix = displayAvi(false);

  return (
    <Container className="">
      <Row>
        <Col className="d-flex justify-content-center">{pix}</Col>
      </Row>
      <Row className="my-3">
        <Col className="d-flex justify-content-end fw-bold">Username:</Col>
        <Col className="d-flex text-primary">{user?.username}</Col>
      </Row>
      <Row className="m-2 p-2 border">
        <Row>
          <Col className="fw-bold">Game</Col>
          <Col className="fw-bold">Highscore</Col>
        </Row>
        {getQuizes()}
      </Row>
    </Container>
  );
};

export default ProfileBox;
