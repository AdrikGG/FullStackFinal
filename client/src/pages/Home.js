import PlayGame from '../components/PlayGame';
import { Row, Col } from 'react-bootstrap';
import { useTheme } from '../global styles/ThemeContext';
import { DarkTheme, LightTheme } from '../global styles/ColorTheme';

const Home = () => {
  const { theme } = useTheme();

  return (
    <Row className="m-3 flex-wrap justify-content-center">
      <Col className="m-3" style={{ maxWidth: 550 }}>
        <p
          className={'text-center fw-bold font-monospace fs-2'}
          style={{
            color:
              theme === 'light' ? LightTheme.TextColor : DarkTheme.TextColor
          }}
        >
          Silhouettes
        </p>
        <PlayGame customClass={'gameOne'} isGame1={true}></PlayGame>
      </Col>
      <Col className="m-3" style={{ maxWidth: 550 }}>
        <p
          className={'text-center fw-bold font-monospace fs-2'}
          style={{
            color:
              theme === 'light' ? LightTheme.TextColor : DarkTheme.TextColor
          }}
        >
          Hot or Cold
        </p>
        <PlayGame customClass={'gameTwo'} isGame2={true}></PlayGame>
      </Col>
      <Col className="m-3" style={{ maxWidth: 550 }}>
        <p
          className={'text-center fw-bold font-monospace fs-2'}
          style={{
            color:
              theme === 'light' ? LightTheme.TextColor : DarkTheme.TextColor
          }}
        >
          Malay Islands
        </p>
        <PlayGame customClass={'gameThree'} isGame3={true}></PlayGame>
      </Col>
    </Row>
  );
};
export default Home;
