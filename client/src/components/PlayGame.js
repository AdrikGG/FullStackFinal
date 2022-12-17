import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import WorldMap from '../images/WorldMap.png';
import AD from '../images/AD.png';
import question from '../images/question.gif';
import Button from 'react-bootstrap/Button';
import './PlayGame.css';

const PlayGame = (props) => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);

  const play = () => {
    if (props.isGame1) {
      navigate('/silhouette');
    } else if (props.isGame2) {
      navigate('/hot-and-cold');
    }
  };

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const checkGame = () => {
    if (props.isGame1) {
      return (
        <div>
          <Image
            className="gameOnePic mx-auto d-block pt-4"
            src={AD}
            alt="Picture of a country map."
          ></Image>
          <Image className={'qMark'} src={question}></Image>
        </div>
      );
    } else if (props.isGame2) {
      return (
        <Image
          className="gameTwoPic mx-auto d-block pt-4"
          src={WorldMap}
          alt="Picture of world map."
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
        <Button
          className="playButton mx-auto d-block text-center fw-bold font-monospace"
          onClick={play}
        >
          Play!
        </Button>
      )}
    </Container>
  );
};

export default PlayGame;
