import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import WorldMap from '../images/WorldMap.png';
import AD from '../images/AD.png';
import Button from 'react-bootstrap/Button';
import './PlayGames.css';

const PlayGame = (props) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const checkGame = () => {
    if (props.isGame1) {
      return (
        <Image
          className='gameOnePic mx-auto d-block pt-4'
          src={AD}
          alt='Picture of a country map.'
        ></Image>
      );
    } else if (props.isGame2) {
      return (
        <Image
          className='gameTwoPic mx-auto d-block pt-4'
          src={WorldMap}
          alt='Picture of world map.'
        ></Image>
      );
    }
  };

  let gameImage = checkGame();

  return (
    <Container
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className={props.customClass}
    >
      {gameImage}
      {isHovering && (
        <Button className='playButton mx-auto d-block text-center fw-bold font-monospace'>
          Play!
        </Button>
      )}
    </Container>
  );
};

export default PlayGame;
