import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import cat from './cat.jpg';
import { FaUserCircle } from 'react-icons/fa';

const ProfileBox = () => {
  const displayAvi = (hasAvi) => {
    let profilePic = '';
    if (hasAvi) {
      //for now the profile pic will be of a cat, will need to figure out back end stuff to allow user uploading.
      profilePic = (
        <Image
          width={180}
          height={180}
          roundedCircle={true}
          src={cat}
          alt='no'
        ></Image>
      );
    } else {
      profilePic = (
        <FaUserCircle
          size={180}
          className='m-3'
          style={{ color: '#6d8fae ' }}
        ></FaUserCircle>
      );
    }
    return profilePic;
  };

  //have a function to check if account has an avi from back end
  //for now it will be false bc we want to show default icon for no avi
  let pix = displayAvi(false);

  return (
    <Container className='mt-5 pt-3 bg-light border rounded w-50'>
      <Row>
        <Col className='d-flex justify-content-center'>{pix}</Col>
      </Row>
      <Row className='my-3'>
        <Col className='d-flex justify-content-around fw-bold'>Username:</Col>
        <Col className='d-flex justify-content-around text-primary'>
          Nayapapaya
        </Col>
      </Row>
      <Row className='my-3'>
        <Col className='d-flex justify-content-around fw-bold'>Email:</Col>
        <Col className='d-flex justify-content-around  text-primary'>
          mnaya@pdx.edu
        </Col>
      </Row>
      <Row className='border m-2'>
        <Row className='m-2'>
          <Col className='d-flex justify-content-around fw-bold'>
            High Score Game1
          </Col>
          <Col className='d-flex justify-content-around  text-primary'>
            1000
          </Col>
        </Row>
        <Row className='m-2'>
          <Col className='d-flex justify-content-around fw-bold'>
            High Score Game2
          </Col>
          <Col className='d-flex justify-content-around  text-primary'>
            2000
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default ProfileBox;
