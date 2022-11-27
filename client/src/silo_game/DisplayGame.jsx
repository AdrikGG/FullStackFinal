import Image from 'react-bootstrap/Image'
import { Button } from 'react-bootstrap/Button';
import { Card } from 'bootstrap-react';
import { getCountry, submitAnswer, giveHint } from './game';

function DisplayGame() {
    let getPicture = getCountry();
    return (
    <Card className="text-center" style={{width: 20}}>
        <Card.Img as={Image} src={getPicture} fluid={true}/>
        <Card.Body>
            <Button variant='Success'>Submit</Button>{submitAnswer}
            <Button variant='Warning'>Give Hint</Button>{giveHint}
        </Card.Body>
        </Card>
    );
}

export default DisplayGame;