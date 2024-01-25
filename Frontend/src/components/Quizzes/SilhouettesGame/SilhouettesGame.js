import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import store from '../../../store/index';
import { Image, Row, Container, Stack } from 'react-bootstrap';
import countries from './countryNames';
import MainButton from '../../MainButton';
import { useTheme } from '../../../global styles/ThemeContext';
import { DarkTheme, LightTheme } from '../../../global styles/ColorTheme';

const maxScore = countries.length;

const SilhouettesGame = () => {
  const { theme } = useTheme();
  const textColor =
    theme === 'light' ? LightTheme.TextColor : DarkTheme.TextColor;

  const [user, setUser] = useState(useSelector((state) => state.user));

  const inputRef = useRef(null);
  const [score, setScore] = useState(0);
  const [countryList, setCountryList] = useState(countries);
  const [countryHint, setCountryHint] = useState('');
  const [rotationVal, setRotationVal] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);
  const [currentMap, setCurrentMap] = useState('');
  const [currentCountry, setCountry] = useState({});
  const [countryId, setCountryId] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isHint, setIsHint] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(
    () => {
      getUser();

      const fetchImageURLs = async () => {
        try {
          const firstIdx = Math.floor(Math.random() * maxScore);
          await axios.get('/api/games/silhouettes').then((res) => {
            setImageUrls(res.data.images);

            const currentImageUrl = res.data.images.find((url) =>
              url.includes(countries[firstIdx].imageSrc)
            );
            setCurrentMap(currentImageUrl);

            setCountryHint(countries[firstIdx].hint);
            setCountry(countries[firstIdx]);
            setCountryId(firstIdx);
          });

          // You might want to store the image URLs in state for later use
          // For example, setCountryMapURLs(imageUrls);
        } catch (error) {
          console.error('Error fetching images from API:', error);
        }
      };

      fetchImageURLs();
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const getUser = () => {
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

  const getNextCountry = () => {
    const updatedList = [...countryList];
    updatedList.splice(countryId, 1);

    const newRandomIndex = Math.floor(Math.random() * (countryList.length - 1));

    setCountryList(updatedList);
    setCountryId(newRandomIndex);

    const currCountry = updatedList[newRandomIndex];

    if (currCountry) {
      setCurrentMap(getCountryMap(currCountry['imageSrc']));
      setRotationVal(Math.random() * 359);
      setCountry(currCountry);
      setCountryHint(currCountry['hint']);
    } else {
      setIsEnd(true);
    }
  };

  const getCountryMap = (src) => {
    // Find the URL corresponding to the current country's image
    const currentImageUrl = imageUrls.find((url) => url.includes(src));

    return currentImageUrl || ''; // Return the URL or an empty string if not found
  };

  const submitAnswer = (guess) => {
    if (
      currentCountry.answer.some(
        (answer) =>
          filterGuess(answer.toLowerCase()) === filterGuess(guess.toLowerCase())
      )
    ) {
      const newScore = score + 1;
      setScore(newScore);
      setIsHint(false);
      setIsError(false);
      getNextCountry();
    } else {
      setIsError(true);
    }
  };

  const endGame = () => {
    if (user) {
      const quizIndex = user.highscores.findIndex(
        (entry) => entry.quiz === 'Silhouettes'
      );

      if (quizIndex !== -1 && user.highscores[quizIndex].score >= score + 1) {
        console.log('Highscore is still: ', user.highscores[quizIndex].score);
        return;
      }

      axios
        .patch(`/api/users/${user._id}`, {
          highscores: [
            ...user.highscores.filter((entry) => entry.quiz !== 'Silhouettes'),
            { quiz: 'Silhouettes', score: score + 1 }
          ]
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

  const filterGuess = (guess) => {
    return guess.replace(/[^a-zA-Z]/g, '');
  };

  const showHint = () => {
    const newVal = !isHint;
    setIsHint(newVal);
    console.log(countryId, currentCountry);
  };

  return (
    <Container fluid className="p-5 flex-wrap text-center">
      <Row className="d-flex align-items-center justify-content-center">
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: 340, maxWidth: 500 }}
        >
          <Image
            key={currentMap} // Ensure Image component re-renders when currentMap changes
            fluid={true}
            src={currentMap}
            style={{
              transform: `rotate(${rotationVal}deg)`,
              maxWidth: 200,
              maxHeight: 200
            }}
            alt="Country Silhouette"
          />
        </div>
      </Row>
      <Stack
        className="m-2 d-flex justify-content-center"
        direction="horizontal"
        gap={3}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitAnswer(e.target.guess.value);
            e.target.guess.value = '';
          }}
          style={{
            display: 'flex',
            flexFlow: 'row wrap',
            alignItems: 'center'
          }}
        >
          {/* <label className="fw-bold">Your guess: </label> */}
          <input
            className="m-2"
            ref={inputRef}
            type="text"
            id="guess"
            name="guess"
            placeholder="Enter Guess"
          ></input>
          {/* <MainButton text={'Submit'} type="submit" /> */}
          <div
            className="mx-2"
            style={{
              color: textColor
            }}
          >
            {score + '/' + maxScore}
          </div>
        </form>
      </Stack>
      {isError && <p className="text-danger">Incorrect Answer</p>}
      {isEnd && <p className="text">Game Complete!</p>}
      {!isError && !isEnd && <div style={{ height: 24 }} />}
      <Stack
        className="d-flex justify-content-center my-3"
        direction="horizontal"
        gap={3}
      >
        <MainButton text={'Hint'} onClick={showHint} />
        {isHint && <div>{countryHint}</div>}
      </Stack>
      <MainButton className="m-2" text={'Save Score'} onClick={endGame} />
    </Container>
  );
};

export default SilhouettesGame;
