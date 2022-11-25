import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import './AccountBox.css';

const AccountBox = () => {
  const [key, setKey] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmitLogin = (event) => {
    event.preventDefault();
    //Do back end log in stuff?
    //Check for existsing account and give errors if incorrect username/pass
  };

  const handleSubmitRegister = (event) => {
    event.preventDefault();
  };

  return (
    <Container className='mt-5 pt-5'>
      <Row className='justify-content-center'>
        <Col sm={10} md={8} lg={6} xl={5}>
          <Tab.Container activeKey={key} onSelect={(temp) => setKey(temp)}>
            <Nav className='nav-justified' variant='pills'>
              <Nav.Item className='pill1 rounded bg-white'>
                <Nav.Link eventKey={'login'}>Login</Nav.Link>
              </Nav.Item>
              <Nav.Item className='pill2 rounded bg-white'>
                <Nav.Link eventKey={'signup'}>Register</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey={'login'}>
                <Form
                  className='border rounded bg-light p-2'
                  onSubmit={handleSubmitLogin}
                >
                  <Form.Group
                    className='mx-5 mb-2 p-2'
                    controlID='loginUsername'
                  >
                    <Form.Label className=''>Username</Form.Label>
                    <Form.Control
                      type='text'
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                    />
                  </Form.Group>
                  <Form.Group
                    className='mx-5 mb-3 p-2'
                    controlID='loginPassword'
                  >
                    <Form.Label className=''>Password</Form.Label>
                    <Form.Control
                      type='password'
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </Form.Group>
                  <Form.Group>
                    <div className='d-grid m-3'>
                      <Button className='accButton mx-5' type='submit'>
                        Submit
                      </Button>
                    </div>
                  </Form.Group>
                </Form>
              </Tab.Pane>
              <Tab.Pane eventKey={'signup'}>
                <Form
                  className='border rounded bg-light p-2'
                  onSubmit={handleSubmitRegister}
                >
                  <Form.Group className='mx-5 mb-2 p-2'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type='text'
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                    />
                  </Form.Group>
                  <Form.Group className='mx-5 mb-2 p-2'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type='email'
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </Form.Group>
                  <Form.Group className='mx-5 mb-2 p-2'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type='password'
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </Form.Group>
                  <Form.Group className='mx-5 mb-2 p-2'>
                    <Form.Label>Re-Enter Password</Form.Label>
                    <Form.Control
                      type='password'
                      onChange={(e) => setRepassword(e.target.value)}
                      value={repassword}
                    />
                  </Form.Group>
                  <div className='d-grid m-3'>
                    <Button className='accButton mx-5' type='submit'>
                      Submit
                    </Button>
                  </div>
                </Form>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
};

export default AccountBox;
