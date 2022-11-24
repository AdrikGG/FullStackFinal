import React, { useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import './LoginRegisterBox.css';

const FormBox = () => {
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
    <div className='container w-75 '>
      <Tab.Container activeKey={key} onSelect={(temp) => setKey(temp)}>
        <Nav className='nav-justified ' variant='pills'>
          <Nav.Item className='pill1 rounded bg-light'>
            <Nav.Link eventKey={'login'}>LogIn</Nav.Link>
          </Nav.Item>
          <Nav.Item className='pill2 rounded bg-light'>
            <Nav.Link eventKey={'signup'}>Signup</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey={'login'}>
            <Form
              className='border rounded bg-light'
              onSubmit={handleSubmitLogin}
            >
              <Form.Group className='mx-5 my-2' controlID='loginUsername'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Username'
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </Form.Group>
              <Form.Group className='mx-5 my-2' controlID='loginPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter Password'
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </Form.Group>
              <button className='mx-5' type='submit'>
                Log In
              </button>
            </Form>
          </Tab.Pane>
          <Tab.Pane eventKey={'signup'}>
            <Form
              className='border rounded bg-light'
              onSubmit={handleSubmitRegister}
            >
              <Form.Group className='mx-5 my-2'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter a valid Username'
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </Form.Group>
              <Form.Group className='mx-5 my-2'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter a valid Email address'
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </Form.Group>
              <Form.Group className='mx-5 my-2'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter a valid Password'
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </Form.Group>
              <Form.Group className='mx-5 my-2'>
                <Form.Label>Re-Enter Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Re-enter the Password'
                  onChange={(e) => setRepassword(e.target.value)}
                  value={repassword}
                />
              </Form.Group>
            </Form>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );

  /*
  return (
    <div className='container w-75 my-5'>
      <Tabs
        className='boxTabs m-3 nav-justified'
        id='controlled-tab'
        activeKey={key}
        onSelect={(temp) => setKey(temp)}
        variant='pills'
      >
        <Tab eventKey='Login' title='Login'>
          <Form onSubmit={handleSubmitLogin}>
            <Form.Group className='mx-5 my-2' controlID='loginUsername'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Username'
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </Form.Group>
            <Form.Group className='mx-5 my-2' controlID='loginPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter Password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Group>
            <button type='submit'>Log In</button>
          </Form>
        </Tab>
        <Tab eventKey='Register' title='Register'>
          <Form onSubmit={handleSubmitRegister}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter a valid Username'
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter a valid Email address'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter a valid Password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Re-Enter Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Re-enter the Password'
                onChange={(e) => setRepassword(e.target.value)}
                value={repassword}
              />
            </Form.Group>
          </Form>
        </Tab>
      </Tabs>
    </div>
  );*/
};

export default FormBox;
