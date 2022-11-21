import React, { useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

const FormBox = () => {
  const [key, setKey] = useState('Login');
  return (
    <Tabs
      id='controlled-tab'
      activeKey={key}
      onSelect={(temp) => setKey(temp)}
      className='mb-3'
    >
      <Tab eventKey='Login' title='Login'>
        <form>
          <label className='form-label'>Username</label>
          <input type='email' className='form-control' />
          <label className='form-label'>Password</label>
          <input type='password' className='form-control' />
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
