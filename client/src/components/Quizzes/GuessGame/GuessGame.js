import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import chroma from 'chroma-js';
import countryList from './countryList';
import Datamap from './DataMap';
import './GuessGame.css';

const GuessGame = () => {
  const user = useSelector((state) => state.user);

  const maxScore = countryList.length;
  const [guessCounter, setGuessCounter] = useState(0);
  const [currCountry, setCurrCountry] = useState({});
  const [data, setData] = useState({});
  const [win, setWin] = useState(false);

  useEffect(() => {
    getRandCountry();

    return () => {};
  }, []);

  const getRandInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const getRandCountry = () => {
    const countryNum = getRandInteger(0, maxScore - 1);
    setCurrCountry(countryList[countryNum]);
    console.log('Random country: ', currCountry, countryList[countryNum]);
  };

  const distance = (srcLat, srcLong) => {
    return Math.sqrt(
      Math.pow(currCountry['longitude'] - srcLong, 2) +
        Math.pow(currCountry['latitude'] - srcLat, 2)
    );
  };

  const submitGuess = (userInput) => {
    if (userInput.toLowerCase() === currCountry['country'].toLowerCase()) {
      const colorFill = {};
      for (const entry of countryList) {
        const maxDist = 225;
        const dist = distance(entry['latitude'], entry['longitude']);
        const gradient = chroma.scale([
          'red',
          'orange',
          'yellow',
          'green',
          'blue'
        ]);

        const color = gradient(dist / maxDist).hex();
        colorFill[entry['alpha3']] = color;
      }
      colorFill[currCountry['alpha3']] = 'black';
      setData(colorFill);
      setWin(true);
      updateProfile();
    } else {
      const guessCode = countryList.find((countryObj) => {
        return countryObj.country.toLowerCase() === userInput.toLowerCase();
      });
      // console.log(guessCode);
      if (!guessCode) {
        return;
      }

      const maxDist = 225;
      const dist = distance(guessCode['latitude'], guessCode['longitude']);
      const gradient = chroma.scale([
        'red',
        'orange',
        'yellow',
        'green',
        'blue'
      ]);

      const color = gradient(dist / maxDist).hex();
      // console.log(dist, color);

      // data[guessCode['alpha3']] = color;
      setData({ [guessCode['alpha3']]: color });
      setGuessCounter(guessCounter + 1);

      // console.log(
      //   ' Lat: ' + guessCode['latitude'] + ' Long: ' + guessCode['longitude']
      // );
      // console.log(dist);
    }
  };

  const updateProfile = () => {
    if (user.highscores) {
      if (user.highscores.quiz2) {
        if (user.highscores.quiz2 <= guessCounter + 1) {
          return;
        }
      }
    }
    axios
      .patch(`/api/users/${user._id}`, {
        hsq2: guessCounter + 1
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err, 'Something went wrong updating your profile');
      });
  };

  return (
    <div className="container d-flex align-items-center justify-content-center">
      <div className="card mx-auto mt-5" style={{ width: 300, height: 150 }}>
        <div className="card-body">
          <div className="input-group mb-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitGuess(e.target.userInput.value);
                e.target.userInput.value = '';
              }}
            >
              <input
                id="userInput"
                type="text"
                style={{ width: 120, height: 25, marginBottom: 4 }}
              />
            </form>
          </div>
          <div>
            <div
              className="card mx-auto mt-3 text-center"
              style={{ width: 150, height: 30 }}
              id="score"
            >
              <p>Total Guesses: {guessCounter}</p>
              <p id="currentScore"></p>
            </div>
            <div className="container">
              <div className="col-md-12 text-center">
                {win ? (
                  <div style={{ position: 'relative', zIndex: 100 }}>
                    <h3>Congratulations!</h3>
                    <div>You found the country!</div>
                    <div>{currCountry['country']}</div>
                    <button
                      onClick={() => {
                        window.location.reload();
                      }}
                    >
                      Play Again?
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="map">
        <Datamap data={data} />
      </div>
    </div>
  );
};

export default GuessGame;
