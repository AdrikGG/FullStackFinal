import PlayGame from '../components/PlayGame';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Home = () => {
  return (
    <>
      <h1>Home page</h1>

      <Row className='m-2 flex-wrap'>
        <Col className='m-2'>
          <p className={'text-center fw-bold font-monospace fs-2'}>Game 1</p>

          <PlayGame customClass={'gameOne'} isGame1={true}></PlayGame>
        </Col>
        <Col className='m-2'>
          <p className={'text-center fw-bold font-monospace fs-2'}>Game 2</p>

          <PlayGame customClass={'gameTwo'} isGame2={true}></PlayGame>
        </Col>
      </Row>
    </>
  );
};
export default Home;
