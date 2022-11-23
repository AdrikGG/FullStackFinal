import Card from 'react-bootstrap/Card';
import scoreBoard from './game';

function ScoreCard() {
    let score = scoreBoard();
    return(
        <Card className="text-center" style={{ width: '20rem'}}>
            <Card.body>
                <Card.Title>Current Score</Card.Title>
                <Card.Text>{score}</Card.Text>
            </Card.body>
        </Card>
    );
}

export default ScoreCard;