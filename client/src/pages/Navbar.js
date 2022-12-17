import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { MdAccountCircle } from 'react-icons/md';
import { GoGlobe } from 'react-icons/go';
import MainButton from '../components/MainButton';
import './Navbar.css';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AppNavbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  if (user) console.log(user);

  const logout = () => {
    // log user out
    localStorage.clear();
    navigate('/dashboard');
    window.location.reload();
  };

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
              <div>
                <LinkContainer to="/profile">
                  <Nav.Link>
                    <MdAccountCircle className="mx-1 changeIcon" />
                  </Nav.Link>
                </LinkContainer>
                <MainButton
                  text={'Logout'}
                  looks={{ fontWeight: 'bold' }}
                  onClick={logout}
                />
              </div>
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
