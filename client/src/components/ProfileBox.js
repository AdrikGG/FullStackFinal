import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const ProfileBox = () => {
  //const [key, setKey] = useState('');

  return (
    <Container className='mt-5 pt-5 bg-light border rounded'>
      <Row>Profile pic</Row>
      <Row>username</Row>
      <Row>email</Row>
      <Row>highest scores</Row>
      <Row>
        <Button>Edit Profile</Button>
      </Row>
    </Container>
  );
};

export default ProfileBox;
