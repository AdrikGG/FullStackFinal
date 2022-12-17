import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { MdAccountCircle } from 'react-icons/md';
import { GoGlobe } from 'react-icons/go';
import MainButton from '../components/MainButton';
import './Navbar.css';

import { useSelector } from 'react-redux';

const AppNavbar = () => {
  const user = useSelector((state) => state.user);
  if (user) console.log(user);

  return (
    <>
      <Navbar bg="light">
        <LinkContainer to="/dashboard">
          <Navbar.Brand className="changeText">
            <GoGlobe className="mx-1" style={{ width: 50, height: 50 }} />
            GeoQuiz
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            {user && (
              <LinkContainer to="/profile">
                <Nav.Link>
                  <MdAccountCircle className="mx-1 changeIcon" />
                </Nav.Link>
              </LinkContainer>
            )}
            {!user && (
              <LinkContainer to="/login">
                <Nav.Link>
                  <MainButton
                    text={'Login/Register'}
                    looks={{ fontWeight: 'bold' }}
                  />
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Outlet />
    </>
  );
};

export default AppNavbar;
