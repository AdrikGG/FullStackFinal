import Card from 'react-bootstrap/Card';
const ScoreBox = (props) => {
  return (
    <Card.Body>
      <Card.Title>Score</Card.Title>
      <Card.Text>{props.score}</Card.Text>
    </Card.Body>
  );
};

export default ScoreBox;
