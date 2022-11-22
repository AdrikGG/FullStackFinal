import React, { useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

const FormBox = () => {
  const [key, setKey] = useState('Login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmitLogin = (event) => {
    event.preventDefault();
    console.log(username);
    //I know this is bad but just for now lol.
    console.log(password);
    //Do back end log in stuff?
  };

  return (
    <Tabs
      id='controlled-tab'
      activeKey={key}
      onSelect={(temp) => setKey(temp)}
      className='m-5'
    >
      <Tab eventKey='Login' title='Login'>
        <form onSubmit={handleSubmitLogin}>
          <label className='form-label'>Username</label>
          <input
            type='text'
            className='form-control m-5'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <label className='form-label'>Password</label>
          <input
            type='password'
            className='form-control'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button type='submit'>Log In</button>
        </form>
      </Tab>
      <Tab eventKey='Register' title='Register'>
        <form>
          <label className='form-label'>Username</label>
          <input type='text' className='form-control' />
          <label className='form-label'>Email</label>
          <input type='email' className='form-control' />
          <label className='form-label'>Password</label>
          <input type='password' className='form-control' />
          <label className='form-label'>Re-Enter Password</label>
          <input type='password' className='form-control' />
        </form>
      </Tab>
    </Tabs>
  );
};

export default FormBox;
