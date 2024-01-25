import React from 'react';
import { Outlet } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import { MdAccountCircle } from 'react-icons/md';
import { GoGlobe } from 'react-icons/go';
import { FaRegMoon, FaRegSun } from 'react-icons/fa';

import MainButton from '../components/MainButton';
import { useTheme } from '../global styles/ThemeContext';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Nav, Navbar, Col } from 'react-bootstrap';
import { DarkTheme, LightTheme } from '../global styles/ColorTheme';

const Layout = () => {
  const { theme, toggleTheme } = useTheme();
  const primaryColor =
    theme === 'light' ? LightTheme.PrimaryColor : DarkTheme.PrimaryColor;
  const secondaryColor =
    theme === 'light' ? LightTheme.SecondaryColor : DarkTheme.SecondaryColor;

  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const logout = () => {
    // log user out
    localStorage.clear();
    navigate('/dashboard');
    window.location.reload();
  };

  // implement toggle for light and dark theme
  return (
    <>
      <Navbar
        style={{
          backgroundColor: secondaryColor
        }}
      >
        <Col>
          <LinkContainer to="/dashboard">
            <Navbar.Brand className="px-2 d-flex align-items-center">
              <GoGlobe
                className="mx-1"
                style={{
                  color: primaryColor,
                  width: 50,
                  height: 50
                }}
              />
              <div
                className="fw-bold text-center"
                style={{
                  color: primaryColor
                }}
              >
                GeoQuiz
              </div>
            </Navbar.Brand>
          </LinkContainer>
        </Col>
        <Col className="d-flex justify-content-end">
          <div className="px-4 d-flex align-items-center">
            <div className="mx-5">
              {theme === 'light' ? (
                <FaRegMoon
                  style={{
                    color: primaryColor,
                    width: 25,
                    height: 25
                  }}
                  onClick={toggleTheme}
                />
              ) : (
                <FaRegSun
                  style={{
                    color: primaryColor,
                    width: 25,
                    height: 25
                  }}
                  onClick={toggleTheme}
                />
              )}
            </div>
            <Navbar.Collapse className="me-auto">
              <Nav>
                {user ? (
                  <div className="d-flex align-items-center">
                    <LinkContainer to="/profile">
                      <Nav.Link>
                        {user.avatar ? (
                          <div
                            style={{
                              borderRadius: '50%',
                              backgroundImage: `url(${user.avatar.url})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              height: 50,
                              width: 50
                            }}
                            alt="profile picture"
                          ></div>
                        ) : (
                          <MdAccountCircle
                            className="mx-1"
                            style={{
                              width: '50px',
                              height: '50px',
                              color: primaryColor
                            }}
                          />
                        )}
                      </Nav.Link>
                    </LinkContainer>
                    <div>
                      <MainButton
                        text={'Logout'}
                        looks={{ fontWeight: 'bold' }}
                        onClick={logout}
                      />
                    </div>
                  </div>
                ) : (
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <MainButton
                        text={'Login / Register'}
                        looks={{ fontWeight: 'bold' }}
                      />
                    </Nav.Link>
                  </LinkContainer>
                )}
              </Nav>
            </Navbar.Collapse>
          </div>
        </Col>
      </Navbar>
      <Outlet />
    </>
  );
};

export default Layout;
