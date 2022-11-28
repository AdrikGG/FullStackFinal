import React from 'react';
import Button from 'react-bootstrap/Button';
import './MainButton.css';

const MainButton = (props) => {
  return (
    <Button className='mainButton' type={props.type}>
      {props.text}
    </Button>
  );
};

export default MainButton;
