import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import { FaUserCircle } from 'react-icons/fa';
import MainButton from './MainButton';

const ProfileBox = () => {
  let avatar = false;
  if (avatar) {
  }

  return (
    <Container className='mt-5 pt-5 bg-light border rounded w-50'>
      <Row>
        <FaUserCircle></FaUserCircle>
      </Row>
      <Row>
        <Col>Username:</Col>
        <Col>Nayapapaya</Col>
      </Row>
      <Row>
        <Col>Email: </Col>
        <Col>mnaya@pdx.edu</Col>
      </Row>
      <Row>
        <Col>High Score Game1</Col>
        <Col>High Score Game2</Col>
      </Row>
      <Row>
        <Col>100</Col>
        <Col>200</Col>
      </Row>
      <Row>
        <MainButton text='Edit Profile' type='button' />
      </Row>
    </Container>
  );
};

export default ProfileBox;
