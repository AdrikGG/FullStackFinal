import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
//Imported this and fixed the countryNames file with what Adrik showed us.
import countries from './countryNames';

const SiloGame = () => {
  const [currentScore] = useState(0);
  const [currentCountry] = useState(0);
  const maxScore = 0;

  useEffect(() => {
    getCountry();

    return () => {};
  }, []);

  //From your game.js file.
  const randomNum = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  //From your game.js file. No changes.
  let randomRotation = () => {
    const rotationValues = [0, 90, 180, 270];
    const randomRotationValue =
      'rotate(' +
      rotationValues[
        Math.floor(Math.random() * rotationValues.length)
      ].toString() +
      'deg)';
    return randomRotationValue;
  };

  export function startGame() {
    //Get max score before country removed
    maxScore = countries.length;
    //get random Country
    getCountry();
    //Current Score
    currentScore = 0;
    //set Scoreboard
    scoreBoard();
  }
  
  //From game.js file. 
  let getCountry = () => {

    let randomCounty = randomNum(0, countries.length - 1);

    let currCountry = countries.splice(randomCounty, 1)[0];
  
    let temp = currCountry['imageSrc'];
    const imageFldr = require.context('./countryshapes/', false);

    let image = imageFldr(`./${temp}`);

    return image;
  };

  //call the getCountry function and store the image path into currentImage
  let currentImage = getCountry();

  let scoreBoard = () => {
    //let scoreBox = document.getElementById('currentScore');
    let scoreBox = currentScore + ' / ' + maxScore;
    return scoreBox;
  }
  
  const giveHint = () => {
    let hint = document.getElementById('hintOutput');
    hint.innerHTML =
      '<div class="alert alert-primary" role="alert">' +
      currCountry['hint'] +
      '</div>';
  }
  
  const giveError = () => {
    let err = document.getElementById('hintOutput');
    err.innerHTML =
      '<div class="alert alert-danger" role="alert">Incorrect</div>';
  }
  
  const submitAnswer = () => {
    console.log(currentCountry); //REMOVE
  
    let error = document.getElementById('hintOutput');
    error.innerHTML = '';
  
    let guess = document.getElementById('guess').value.toLowerCase();
    if (
      (guess !== 'n/a' && guess === currCountry['answer']) ||
      guess === currCountry['altAnswer']
    ) {
      currentScore++;
      getCountry();
      scoreBoard();
    } else {
      giveError();
    }
    document.getElementById('guess').value = '';
  }
  
  const endGame = () => {
    let answer = confirmClick();
    if (answer === true) {
      //Store Answer to profile
      //Return to main page
    }
  }
  
  const resetGame = () => {
    let answer = confirmClick();
    if (answer === true) {
      window.location.reload();
    }
  }
  
  const confirmClick = () => {
    let text;
    if (Window.confirm('Are you sure?') === true) {
      text = 'Score reset';
      return true;
    } else {
      text = 'Cancelled';
      console.log(text);
      return false;
    }
  }
  

  return (
    <Card className='text-center' style={{ width: 20 }}>
      {/**
       * (these are comments, to remove them make sure to delete the curly braces.)
       *
       * so in card.img use that path that is stored in currentImage. To do the rotation
       * call the randomRotation function within the transform CSS property.
       * the style prop in the <Card.Img> element lets you customize and style with CSS
       */}
      <Card.Img
        src={currentImage}
        fluid={true}
        style={{ transform: randomRotation }}
      />
      <Card.Body>
        <Button variant='Success'>Submit</Button>
        <Button variant='Warning'>Give Hint</Button>
      </Card.Body>
    </Card>
  );
}

export default SiloGame;
