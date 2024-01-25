import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import store from '../../../store/index';
import chroma from 'chroma-js';
import countryList from './countryList';
import Datamap from './DataMap';
import { Row, Col, Container } from 'react-bootstrap';
import MainButton from '../../MainButton';
import { useTheme } from '../../../global styles/ThemeContext';
import { DarkTheme, LightTheme } from '../../../global styles/ColorTheme';

const HotColdGame = () => {
  const { theme } = useTheme();
  const bannerColor =
    theme === 'light' ? LightTheme.BannerColor : DarkTheme.BannerColor;
  const textColor =
    theme === 'light' ? LightTheme.TextColor : DarkTheme.TextColor;

  const [user, setUser] = useState(useSelector((state) => state.user));

  const maxScore = countryList.length;
  const [guessCounter, setGuessCounter] = useState(0);
  const [currCountry, setCurrCountry] = useState({});
  const [data, setData] = useState({});
  const [win, setWin] = useState(false);

  useEffect(
    () => {
      getUser();
      getRandCountry();
      return () => {};
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

  //Get a random integer to grab random country
  const getRandInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // Using random integer get the random country
  const getRandCountry = () => {
    const countryNum = getRandInteger(0, maxScore - 1);
    setCurrCountry(countryList[countryNum]);
    console.log('Random country: ', currCountry, countryList[countryNum]);
  };

  //Get the distance via euclidean math
  const distance = (srcLat, srcLon) => {
    const r = 6371; // Earth's radius in km

    // both latitudes and longitudes in radians
    let lat1 = (srcLat * Math.PI) / 180;
    let lat2 = (currCountry.latitude * Math.PI) / 180;
    let lon1 = (srcLon * Math.PI) / 180;
    let lon2 = (currCountry.longitude * Math.PI) / 180;

    // diference in lats and lons
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;

    let a =
      Math.pow(Math.sin(dlat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));

    return c * r;
  };

  // For the cheaters out there
  console.log(currCountry['country']);

  const submitGuess = (userInput) => {
    if (userInput.toLowerCase() === currCountry['country'].toLowerCase()) {
      const colorFill = {};
      for (const entry of countryList) {
        const maxDist = maxDistance();
        const dist = distance(entry['latitude'], entry['longitude']);
        const gradient = chroma.scale([
          'red',
          'orange',
          'yellow',
          'green',
          'blue'
        ]);

        const color = gradient(-Math.pow(dist / maxDist - 1, 2) + 1).hex();
        colorFill[entry['alpha3']] = color;
      }
      colorFill[currCountry['alpha3']] = 'black';
      setData(colorFill);
      setWin(true);
      updateProfile();
      setGuessCounter(guessCounter + 1);
    } else {
      const guessCode = countryList.find((countryObj) => {
        return countryObj.country.toLowerCase() === userInput.toLowerCase();
      });
      if (!guessCode) {
        return;
      }
      const maxDist = maxDistance();
      const dist = distance(guessCode.latitude, guessCode.longitude);
      const gradient = chroma.scale([
        'red',
        'orange',
        'yellow',
        'green',
        'blue'
      ]);

      const color = gradient(-Math.pow(dist / maxDist - 1, 2) + 1).hex();

      setData({ [guessCode['alpha3']]: color });
      setGuessCounter(guessCounter + 1);
    }
  };

  const maxDistance = () => {
    let dist = 0;
    countryList.forEach((country) => {
      const res = distance(country.latitude, country.longitude);
      if (res > dist) {
        dist = res;
      }
    });

    return dist;
  };

  const updateProfile = () => {
    if (user) {
      const quizIndex = user.highscores.findIndex(
        (entry) => entry.quiz === 'Hot and Cold'
      );

      if (
        quizIndex !== -1 &&
        user.highscores[quizIndex].score <= guessCounter + 1
      ) {
        console.log('Highscore is still: ', user.highscores[quizIndex].score);
        return;
      }

      axios
        .patch(`/api/users/${user._id}`, {
          highscores: [
            ...user.highscores.filter((entry) => entry.quiz !== 'Hot and Cold'),
            { quiz: 'Hot and Cold', score: guessCounter + 1 }
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

  return (
    <Container
      fluid
      className="d-flex flex-column text-center"
      style={{ height: 'calc(100vh - 82px)' }}
    >
      <Row className="mt-2 justify-content-center">
        <Row
          className="p-1 justify-content-center"
          style={{
            backgroundColor: bannerColor
          }}
        >
          <Row>
            <h3
              style={{
                color: textColor
              }}
            >
              Hot or Cold: Find the Random Secret Country
            </h3>
            <div
              style={{
                color: textColor
              }}
            >
              It could be any UN recognized country (plus Taiwan and Greenland).
              Some countries are too small to appear on the map, however, they
              are still guessable.
            </div>
            <div
              style={{
                color: textColor
              }}
            >
              *Distances between countries are measured from their center
              (larger countries may not appear "red hot" even if they border the
              target country).
            </div>
          </Row>
          <Row>
            <Col className="d-flex align-items-center justify-content-end">
              <form
                className="px-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  submitGuess(e.target.userInput.value);
                  e.target.userInput.value = '';
                }}
              >
                <input id="userInput" type="text" placeholder="Enter Guess" />
              </form>
              <div
                id="score"
                style={{
                  color: textColor
                }}
              >
                Guesses: {guessCounter}
              </div>
            </Col>
            {win ? (
              <>
                <Col className="d-flex align-items-center justify-content-center">
                  <div
                    className="mx-5"
                    style={{
                      color: textColor
                    }}
                  >
                    You found the country! {currCountry['country']}
                  </div>
                </Col>
                <Col className="d-flex align-items-center">
                  <MainButton
                    text={'Play Again?'}
                    onClick={() => {
                      window.location.reload();
                    }}
                  />
                </Col>
              </>
            ) : (
              <>
                <Col></Col>
                <Col className="d-flex align-items-center">
                  <MainButton
                    text={'Reset'}
                    onClick={() => {
                      window.location.reload();
                    }}
                  />
                </Col>
              </>
            )}
          </Row>
        </Row>
      </Row>
      <Row className="mt-1 h-100 d-flex flex-grow-1 justify-content-center">
        <Datamap data={data} />
      </Row>
    </Container>
  );
};

export default HotColdGame;
