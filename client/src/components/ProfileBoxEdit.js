import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import MainButton from '../components/MainButton';
import cat from './cat.jpg';
import { FaUserCircle } from 'react-icons/fa';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import store from '../store/index';

const ProfileBoxEdit = () => {
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
  ];

  useEffect(() => {
    getUser();
  }, []);

  const [username, setUsername] = useState(user ? user.username : '');
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');

  const getUser = () => {
    // console.log('get user');
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

  const checkPassword = () => {
    // bcrypt.compare(oldPassword, user.password).then((success) => {
    //   if (!success) {
    //     setMessage('Incorrect password');
    //     return false;
    //   } else {
    //     return true;
    //   }
    // });
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
          _id: user._id,
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
    if (!checkPassword) {
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
        password: password !== '' ? password : null,
      })
      .then((res) => {
        console.log(res);
        store.dispatch({
          type: 'update_user',
          user: user,
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

  const displayAvi = (hasAvi) => {
    let profilePic = '';
    if (hasAvi) {
      //for now the profile pic will be of a cat, will need to figure out back end stuff to allow user uploading.
      profilePic = (
        <Image
          width={180}
          height={180}
          roundedCircle={true}
          src={cat}
          alt="no"
        ></Image>
      );
    } else {
      profilePic = (
        <FaUserCircle
          size={180}
          className="m-3"
          style={{ color: '#6d8fae ' }}
        ></FaUserCircle>
      );
    }
    return profilePic;
  };

  //have a function to check if account has an avi from back end
  //for now it will be false bc we want to show default icon for no avi
  let pix = displayAvi(true);

  return (
    <Container className="mt-5 pt-3 bg-light border rounded w-50">
      <Row>
        <Col className="d-flex justify-content-center">{pix}</Col>
        <input onChange={(e) => handleFileInputChange(e)} type="file" />
        <MainButton
          text="Upload Profile Picture"
          onClick={(e) => handleSubmitFile(e)}
        ></MainButton>
      </Row>
      <Row className="my-3">
        <Col className="d-flex justify-content-around fw-bold">Username:</Col>
        <Col className="d-flex justify-content-around text-primary">
          {user?.username}
        </Col>
      </Row>
      {/* <Row className="my-3">
        <Col className="d-flex justify-content-around fw-bold">Email:</Col>
        <Col className="d-flex justify-content-around  text-primary">
          mnaya@pdx.edu
        </Col>
      </Row> */}
      <Row>
        <label htmlFor={'usernameUpdate'}>Change username:</label>
        <input
          type={'text'}
          id={'usernameUpdate'}
          name={'usernameUpdate'}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
      </Row>
      <Row>
        <label htmlFor={'passUpdate'}>Change Password:</label>
        <input
          type={'password'}
          id={'passUpdate'}
          name={'passUpdate'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </Row>

      <Row className="border m-2">
        <Row className="m-2">
          <Col className="d-flex justify-content-around fw-bold">
            High Score Game1
          </Col>
          <Col className="d-flex justify-content-around  text-primary">
            {user?.highscores?.quiz1 ? user.highscores.quiz1 : 'No score'}
          </Col>
          <Col>
            <MainButton text="Clear"></MainButton>
          </Col>
        </Row>
        <Row className="m-2">
          <Col className="d-flex justify-content-around fw-bold">
            High Score Game2
          </Col>
          <Col className="d-flex justify-content-around  text-primary">
            {user?.highscores?.quiz2 ? user.highscores.quiz2 : 'No score'}
          </Col>
          <Col>
            <MainButton text="Clear"></MainButton>
          </Col>
        </Row>
      </Row>
      <Row>
        <label htmlFor={'passCheck'}>Enter old password to save changes:</label>
        <input
          type={'password'}
          id={'passCheck'}
          name={'passCheck'}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        ></input>
      </Row>
      <Row>
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
