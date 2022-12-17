import PlayGame from '../components/PlayGame';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Home = () => {
  return (
    <Row className="m-3 flex-wrap justify-content-center">
      <Col className="m-3" style={{ maxWidth: 550 }}>
        <p className={'text-center fw-bold font-monospace fs-2'}>
          Silhouette Game
        </p>
        <PlayGame customClass={'gameOne'} isGame1={true}></PlayGame>
      </Col>
      <Col className="m-3" style={{ maxWidth: 550 }}>
        <p className={'text-center fw-bold font-monospace fs-2'}>
          Hot and Cold Game
        </p>
        <PlayGame customClass={'gameTwo'} isGame2={true}></PlayGame>
      </Col>
    </Row>
  );
};
export default Home;
