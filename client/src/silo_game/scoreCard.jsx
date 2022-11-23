import Card from 'bootstrap-react/Card';
import scoreBoard from './game';

function scoreCard() {
    return(
        <Card className="text-center" style={{ width: '20rem'}}>
            <Card.body>
                <Card.Title>Current Score</Card.Title>
                <Card.Text></Card.Text>
            </Card.body>
        </Card>
    )
}

export default scoreCard;