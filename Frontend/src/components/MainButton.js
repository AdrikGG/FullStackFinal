import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useTheme } from '../global styles/ThemeContext';
import { DarkTheme, LightTheme } from '../global styles/ColorTheme';

const MainButton = (props) => {
  const { theme } = useTheme();
  const primaryColor =
    theme === 'light' ? LightTheme.PrimaryColor : DarkTheme.PrimaryColor;
  const primaryHover =
    theme === 'light' ? LightTheme.PrimaryHover : DarkTheme.PrimaryHover;

  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <Button
      className="mainButton"
      type={props.type}
      style={
        (props.looks,
        {
          border: 'none',
          backgroundColor: isHover ? primaryHover : primaryColor
        })
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={props.onClick}
    >
      {props.text}
    </Button>
  );
};

export default MainButton;
