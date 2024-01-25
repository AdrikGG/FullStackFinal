import React, { useState, useEffect, useCallback } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from 'react-simple-maps';
import { Row, Col, Container, Stack } from 'react-bootstrap';
// import CustomModal from './DevModal';

import GeoJSON from './GSHHS_h_L1.json';
import Names from './islandNames.json';
import { useTheme } from '../../../global styles/ThemeContext';
import { DarkTheme, LightTheme } from '../../../global styles/ColorTheme';
import MainButton from '../../MainButton';
import axios from 'axios';
import { useSelector } from 'react-redux';
import store from '../../../store';

const turf = require('@turf/turf');
const GeoJSONData = GeoJSON.features.map(function (feature) {
  return turf.rewind(feature, { reverse: true });
});
GeoJSON.features = GeoJSONData;

const MalayIslandsGame = () => {
  const { theme } = useTheme();
  const bannerColor =
    theme === 'light' ? LightTheme.BannerColor : DarkTheme.BannerColor;
  const textColor =
    theme === 'light' ? LightTheme.TextColor : DarkTheme.TextColor;

  const defaultPosition = {
    coordinates: [125, -7],
    zoom: 0.28
  };

  const [user, setUser] = useState(useSelector((state) => state.user));

  // const [modalVisible, setModalVisible] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [index, setIndex] = useState(0);
  const [randomNames, setRandomNames] = useState([]);
  const [score, setScore] = useState(0);
  const [display, setDisplay] = useState('menu');
  const [threshold, setThreshold] = useState(0);
  const [difficulty, setDifficulty] = useState('Expert');
  const [inputMode, setInputMode] = useState('clicking');

  const [polygonColors, setPolygonColors] = useState({});

  const randomizeNames = useCallback(() => {
    // Filter Names.islands based on the difficulty
    const filteredNames = Names.islands.filter((island) => {
      const polygon = GeoJSONData.find(
        (feature) => feature.properties.id === island.id
      );
      return polygon && polygon.properties.area > threshold;
    });
    setRandomNames(shuffle(filteredNames));

    return filteredNames;
  }, [threshold]);

  // Set the initial state
  useEffect(() => {
    getUser();

    const filteredNames = randomizeNames();

    // Update name and id based on the first item in the filtered list
    if (filteredNames.length > 0) {
      setName(filteredNames[0].name);
      setId(filteredNames[0].id);
    } else {
      // Handle the case where there are no names matching the condition
      setName('');
      setId('');
    }

    setPolygonColors(
      // Initialize the state with default colors for all polygons
      GeoJSONData.reduce((colors, feature) => {
        if (
          Names.islands.find((x) => x.id === feature.properties.id) &&
          feature.properties.area > threshold
        ) {
          colors[feature.properties.id] = '#FFFFFF';
        } else {
          colors[feature.properties.id] = '#777777';
        }

        return colors;
      }, {})
    );

    return () => setPolygonColors({});
  }, [threshold, randomizeNames]);

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

  const saveScore = () => {
    if (user) {
      const quizIndex = user.highscores.findIndex(
        (entry) => entry.quiz === `Malay Islands (${inputMode}, ${difficulty})`
      );

      if (quizIndex !== -1 && user.highscores[quizIndex].score >= score) {
        console.log('Highscore is still: ', user.highscores[quizIndex].score);
        return;
      }

      axios
        .patch(`/api/users/${user._id}`, {
          highscores: [
            ...user.highscores.filter(
              (entry) =>
                entry.quiz !== `Malay Islands (${inputMode}, ${difficulty})`
            ),
            {
              quiz: `Malay Islands (${inputMode}, ${difficulty})`,
              score: score
            }
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

  const updatePolygonColor = (polygonId, color) => {
    setPolygonColors((prevColors) => ({
      ...prevColors,
      [polygonId]: color
    }));
  };

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex]
      ];
    }

    return array;
  };

  const handleMoveEnd = (position) => {
    setPosition(position);
  };

  const stepForward = () => {
    const newIndex = index + 1;

    if (index < randomNames.length - 1) {
      setName(randomNames[newIndex].name);
      setId(randomNames[newIndex].id);
    } else {
      console.log('End of list - ' + score);
      setName('Finish!');
      saveScore();
    }

    setIndex(newIndex);
  };

  const handleClick = (polyId) => {
    const clicked = Names.islands.find((x) => x.id === polyId);
    if (clicked) {
      console.log(polyId, clicked.name);
    } else {
      console.log(polyId);
    }

    if (polyId === id && display === 'clicking') {
      updatePolygonColor(polyId, '#00FF00');

      if (index < randomNames.length) {
        const newScore = score + 1;
        setScore(newScore);
        stepForward();
      }
    }
  };

  const handleStart = () => {
    setDisplay(inputMode);
    setName(randomNames[0].name);
    setId(randomNames[0].id);
    setIndex(0);
  };

  const handleTypeSubmit = (inputText) => {
    const guessedIsland = randomNames.find((x) => {
      // Helper function to filter out non-alphabetical characters
      const filterAlphabetical = (str) =>
        str.replace(/[^a-zA-Z]/g, '').toLowerCase();

      const modName = filterAlphabetical(x.name);
      const modInput = filterAlphabetical(inputText);

      return modName === modInput;
    });

    if (guessedIsland) {
      const guessedIslandColor = polygonColors[guessedIsland.id];
      if (guessedIslandColor !== '#00FF00') {
        const newScore = score + 1;
        setScore(newScore);
        updatePolygonColor(guessedIsland.id, '#00FF00');
      }
    }
  };

  const giveUp = () => {
    const newColors = { ...polygonColors };

    for (let polygonId in polygonColors) {
      if (polygonColors[polygonId] === '#FFFFFF')
        newColors[polygonId] = '#FF0000';
    }

    setPolygonColors(newColors);
  };

  const handleSkip = () => {
    updatePolygonColor(id, '#FF0000');
    stepForward();
  };

  const handleRestart = () => {
    // Reset all hooks to their default values
    setPosition(defaultPosition);
    setId('');
    setName('');
    setIndex(0);
    randomizeNames();
    setScore(0);
    setDisplay('menu');
    setThreshold(0);
    setPolygonColors(
      // Initialize the state with default colors for all polygons
      GeoJSONData.reduce((colors, feature) => {
        if (
          Names.islands.find((x) => x.id === feature.properties.id) &&
          feature.properties.area > threshold
        ) {
          colors[feature.properties.id] = '#FFFFFF';
        } else {
          colors[feature.properties.id] = '#777777';
        }

        return colors;
      }, {})
    );
  };

  // const handleClose = () => {
  //   setModalVisible(false);
  // }

  return (
    <Container
      fluid
      className="overflow-hidden"
      style={{ height: 'calc(100vh - 80px)' }}
    >
      {/* <CustomModal handleClose={handleClose} visible={modalVisible} id={id} /> */}
      <Row className="d-flex justify-content-center">
        {display === 'menu' && (
          <Stack
            className="p-2"
            direction="horizontal"
            style={{
              backgroundColor: bannerColor
            }}
          >
            <div
              className="me-2 px-2 fw-bold"
              style={{
                color: textColor
              }}
            >
              Difficulty:
              <label className="px-2">
                <input
                  className="mx-1"
                  type="radio"
                  name="difficulty"
                  value="2500"
                  checked={threshold === 2500}
                  onChange={() => {
                    setThreshold(2500);
                    setDifficulty('Beginner');
                  }}
                />
                Beginner
              </label>
              <label className="px-2">
                <input
                  className="mx-1"
                  type="radio"
                  name="difficulty"
                  value="1500"
                  checked={threshold === 1500}
                  onChange={() => {
                    setThreshold(1500);
                    setDifficulty('Easy');
                  }}
                />
                Easy
              </label>
              <label className="px-2">
                <input
                  className="mx-1"
                  type="radio"
                  name="difficulty"
                  value="500"
                  checked={threshold === 500}
                  onChange={() => {
                    setThreshold(500);
                    setDifficulty('Normal');
                  }}
                />
                Normal
              </label>
              <label className="px-2">
                <input
                  className="mx-1"
                  type="radio"
                  name="difficulty"
                  value="100"
                  checked={threshold === 100}
                  onChange={() => {
                    setThreshold(100);
                    setDifficulty('Hard');
                  }}
                />
                Hard
              </label>
              <label className="px-2">
                <input
                  className="mx-1"
                  type="radio"
                  name="difficulty"
                  value="0"
                  checked={threshold === 0}
                  onChange={() => {
                    setThreshold(0);
                    setDifficulty('Expert');
                  }}
                />
                Expert
              </label>
            </div>
            <div
              className="mx-2 px-2 fw-bold"
              style={{
                color: textColor
              }}
            >
              Input Mode:
              <label className="px-2">
                <input
                  className="mx-1"
                  type="radio"
                  name="inputMode"
                  value="type"
                  checked={inputMode === 'typing'}
                  onChange={() => setInputMode('typing')}
                />
                Typing
              </label>
              <label className="px-2">
                <input
                  className="mx-1"
                  type="radio"
                  name="inputMode"
                  value="clicking"
                  checked={inputMode === 'clicking'}
                  onChange={() => setInputMode('clicking')}
                />
                Clicking
              </label>
            </div>
            <MainButton text={'Start'} onClick={() => handleStart()} />
          </Stack>
        )}
        {display === 'clicking' && (
          <Stack
            className="p-2"
            direction="horizontal"
            style={{
              backgroundColor: bannerColor
            }}
          >
            <Col>
              <div className="px-5 d-flex align-items-middle">
                <MainButton
                  text={'Skip'}
                  onClick={() => {
                    handleSkip();
                  }}
                />
              </div>
            </Col>
            <Col>
              <div
                className="mx-5 d-flex flex-row-reverse fw-bold"
                style={{
                  color: textColor
                }}
              >
                {name}
              </div>
            </Col>
            <Col>
              <div
                className="mx-5 fw-bold"
                style={{
                  color: textColor
                }}
              >
                {score} / {randomNames.length}
              </div>
            </Col>
            <Col>
              <div className="px-5 d-flex align-items-middle justify-content-end">
                <MainButton
                  text={'Menu'}
                  onClick={() => {
                    saveScore();
                    handleRestart();
                  }}
                />
              </div>
            </Col>
          </Stack>
        )}
        {display === 'typing' && (
          <Stack
            className="p-2"
            direction="horizontal"
            style={{
              backgroundColor: bannerColor
            }}
          >
            <Col>
              <div className="px-5 d-flex align-items-middle">
                <MainButton
                  className="mx-5 d-flex align-items-middle justify-content-center"
                  text={'End'}
                  onClick={() => {
                    giveUp();
                  }}
                />
              </div>
            </Col>
            <Col>
              <div className="d-flex flex-row-reverse">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleTypeSubmit(e.target[0].value);
                    e.target[0].value = '';
                  }}
                >
                  <input
                    type="text"
                    placeholder="Enter Island Name"
                    className="mx-5"
                  />
                </form>
              </div>
            </Col>
            <Col>
              <div
                className="mx-5 fw-bold"
                style={{
                  color: textColor
                }}
              >
                {score} / {randomNames.length}
              </div>
            </Col>
            <Col>
              <div className="px-5 d-flex align-items-middle justify-content-end">
                <MainButton
                  text={'Menu'}
                  onClick={() => {
                    saveScore();
                    handleRestart();
                  }}
                />
              </div>
            </Col>
          </Stack>
        )}
      </Row>
      <Row>
        <ComposableMap
          projectionConfig={{
            scale: 1800
          }}
          style={{ width: '100%', height: 'auto' }}
          projection="geoMercator"
        >
          <ZoomableGroup
            zoom={position.zoom}
            minZoom={0.1}
            maxZoom={16}
            center={position.coordinates}
            onMoveEnd={handleMoveEnd}
          >
            <Geographies geography={GeoJSON}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    vectorEffect={'non-scaling-stroke'}
                    style={{
                      default: { fill: polygonColors[geo.properties.id] },
                      hover: { fill: '#FFA500' }
                    }}
                    stroke="#000000"
                    strokeWidth={0.5}
                    onClick={() => handleClick(geo.properties.id)}
                  />
                ))
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </Row>
    </Container>
  );
};

export default MalayIslandsGame;
