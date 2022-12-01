import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import store from '../../../store/index';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import countries from './countryNames';
import ScoreBox from './ScoreBox';
import Stack from 'react-bootstrap/Stack';

const imageFldr = require.context('./countryshapes/', false);
const maxScore = countries.length;

const SiloGame = () => {
  const [user, setUser] = useState(useSelector((state) => state.user));

  const inputRef = useRef(null);
  const [score, setScore] = useState(0);
  const [countryHint, setCountryHint] = useState('');
  const [rotationVal, setRotationVal] = useState('');
  const [currentMap, setCurrentMap] = useState('');
  const [currentCountry, setCountry] = useState({});
  const [isError, setIsError] = useState(false);
  const [isHint, setIsHint] = useState(false);

  useEffect(
    () => {
      startGame();
      getUser();
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const getUser = () => {
    // console.log('get user');
    let id = localStorage.getItem('_ID');
    if (!id) {
      console.log('no user logged in');
      localStorage.clear();
    } else {
      axios
        .get('/api/users/' + id)
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const startGame = () => {
    setIsError(false);
    let [currCountry, mapImg] = getCountry();
    setCurrentMap(mapImg);
    setCountry(currCountry);
    console.log(currCountry);
    setCountryHint(currCountry['hint']);
  };

  const endGame = () => {
    setScore(0);
    if (user) {
      if (user.highscores) {
        if (user.highscores.quiz1) {
          if (user.highscores.quiz1 >= score + 1) {
            return;
          }
        }
      }
      axios
        .patch(`/api/users/${user._id}`, {
          hsq1: score + 1,
          hsq2: user.highscores ? user.highscores.quiz2 : '0'
        })
        .then((res) => {
          store.dispatch({
            type: 'update_user',
            user: user
          });
        })
        .catch((err) => {
          console.log(err, 'Something went wrong updating your profile');
        });
    }
  };

  const randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  let randomRotation = () => {
    const rotationValues = [0, 90, 180, 270];
    setRotationVal(
      'rotate(' +
        rotationValues[
          Math.floor(Math.random() * rotationValues.length)
        ].toString() +
        'deg)'
    );
  };

  const getCountry = () => {
    let randomCountry = randomNum(0, countries.length - 1);
    let currCountry = countries.splice(randomCountry, 1)[0];
    let mapImg = getCountryMap(currCountry['imageSrc']);
    return [currCountry, mapImg];
  };

  const getCountryMap = (pathMap) => {
    randomRotation();
    return imageFldr(`./${pathMap}`);
  };

  const submitAnswer = (guess) => {
    let userInput = guess;
    if (
      userInput.toLowerCase() === currentCountry['answer'] ||
      userInput.toLowerCase() === currentCountry['altAnswer']
    ) {
      getScore();
      startGame();
      setIsHint(false);
    } else if (
      userInput.toLowerCase() !== currentCountry['answer'] ||
      userInput.toLowerCase() !== currentCountry['altAnswer']
    ) {
      setIsError(true);
    }
  };

  const getScore = () => {
    setScore(score + 1);
  };

  const showHint = () => {
    setIsHint(true);
  };

  return (
    <Container fluid className="p-5 flex-wrap text-center">
      <Row className="">
        <Col>
          <Image
            fluid={true}
            className="m-5"
            src={currentMap}
            style={{ transform: rotationVal, maxWidth: 200, maxHeight: 200 }}
            alt="Country map"
          ></Image>
        </Col>
      </Row>
      <Stack
        className="d-flex justify-content-center"
        direction="horizontal"
        gap={3}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitAnswer(e.target.guess.value);
            e.target.guess.value = '';
          }}
        >
          <p className="fw-bold mt-4">Your guess: </p>
          <input
            className="m-2"
            ref={inputRef}
            type="text"
            id="guess"
            name="guess"
          ></input>
          <Button
            style={{ backgroundColor: '#567088', border: 'none' }}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Stack>
      {isError && <p className="text-danger">Incorrect Answer</p>}
      <Stack
        className="d-flex justify-content-center my-3"
        direction="horizontal"
        gap={3}
      >
        <Button
          style={{ width: 55, backgroundColor: '#567088', border: 'none' }}
          onClick={showHint}
        >
          Hint
        </Button>
        {isHint && <div>{countryHint}</div>}
      </Stack>
      <ScoreBox score={score + '/' + maxScore} />
      <Button
        className="m-2"
        style={{ backgroundColor: '#567088', border: 'none' }}
        onClick={endGame}
      >
        End Game
      </Button>
    </Container>
  );
};

export default SiloGame;
