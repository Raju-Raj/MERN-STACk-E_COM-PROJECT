import React from 'react';
import {Navbar,Nav,Container, NavDropdown} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
import { logout } from '../actions/userAction';


const Header = () => {
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <>
     <Navbar bg="dark" expand="lg" variant="dark" collapseOnSelect>
        <Container>
        <LinkContainer to="/">
            <Navbar.Brand>ONLINE SHOP</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/cart">
            <Nav.Link>
                <i className="fa-solid fa-cart-arrow-down"></i>
                &nbsp;
                CART
            </Nav.Link>
            </LinkContainer>
            {userInfo ?(
              <NavDropdown title={userInfo.name}>
                <LinkContainer to="/profile">
                <NavDropdown.Item>
                    Profile
                  </NavDropdown.Item>
                </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    LogOut
                  </NavDropdown.Item>
              </NavDropdown>
            ):(
              <LinkContainer to="/login">
              <Nav.Link>
                  <i className="fa-solid fa-user"></i>
                  &nbsp;
                  SIGNIN
              </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
    </>
  )
}

export default Header
