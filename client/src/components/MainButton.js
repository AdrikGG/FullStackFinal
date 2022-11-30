import React from 'react';
import Button from 'react-bootstrap/Button';
import './MainButton.css';

const MainButton = (props) => {
  return (
    <Button className='mainButton' type={props.type} style={props.looks}>
      {props.text}
    </Button>
  );
};

export default MainButton;
