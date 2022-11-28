//import { Image } from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
//import { getCountry, submitAnswer, giveHint, startGame } from './game';

function DisplayGame() {
  //let getPicture = getCountry();
  //startGame();
  return (
    <Card className='text-center' style={{ width: 20 }}>
      <Card.Img src={'./public/favicon.ico'} fluid={true} />
      <Card.Body>
        <Button variant='Success'>Submit</Button>
        <Button variant='Warning'>Give Hint</Button>
      </Card.Body>
    </Card>
  );
}

export default DisplayGame;
