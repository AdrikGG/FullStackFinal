import React, { useRef, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
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
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const startGame = () => {
    setIsError(false);
    let [currCountry, mapImg] = getCountry();
    setCurrentMap(mapImg);
    setCountry(currCountry);
    console.log(currCountry);
    setCountryHint(currCountry['hint']);
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

  const submitAnswer = () => {
    let userInput = inputRef.current.value;
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
    <Container className='flex-wrap justify-content-center'>
      <Row className=' justify-content-center'>
        <Col>
          <Image
            fluid={true}
            className='m-5'
            src={currentMap}
            style={{ transform: rotationVal, maxWidth: 200, maxHeight: 200 }}
            alt='Country map'
          ></Image>
        </Col>
      </Row>

      <Stack direction='horizontal' gap={3}>
        <p>Guess an answer: </p>
        <input ref={inputRef} type='text' id='guess' name='guess'></input>
        <Button onClick={submitAnswer}>Submit</Button>
      </Stack>
      {isError && <div>Incorrect Answer</div>}
      <Stack direction='horizontal' gap={3}>
        <Button onClick={showHint}>Hint</Button>{' '}
        {isHint && <div>{countryHint}</div>}
      </Stack>

      <ScoreBox score={score + '/' + maxScore} />
    </Container>
  );
};

export default SiloGame;
