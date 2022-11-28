import Card from 'react-bootstrap/Card';
import { scoreBoard } from './game';

function ScoreCard() {
  let score = scoreBoard();
  return (
    <Card>
      <Card.Body>
        <Card.Title>Score</Card.Title>
        <Card.Text>{score}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ScoreCard;
