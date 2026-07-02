import * as React from 'react';
import { Container, Row, Col, NavItem, NavLink, Nav, NavbarBrand, NavbarToggler, Collapse, Tooltip } from 'reactstrap';
import './Footer2.scss';
import { Link } from 'react-router-dom';
import Navbar from 'reactstrap/lib/Navbar';

export default function(props: { children?: React.ReactNode }) {
  const [ isStackOverflowIconTooltipOpen, setIsStackOverflowIconTooltipOpen ] = React.useState(false);
  const [ isGitHubTooltipOpen, setIsGitHubTooltipOpen ] = React.useState(false);
  return (
    <React.Fragment>
      <div className='footer container-fluid bg-secondary text-light'>
        <Container>
          <Row>
            <Col sx={12} className='text-right text-dark'>
              &copy;Y-code
            </Col>
          </Row>
        </Container>
        <Container className='footer-container'>
          <Row>
            <div className='profile-img-col'>
              <div className='image-cropper'>
                <img className='profile-img' src='/logo-strawberry-joystick.png'/>
              </div>
            </div>
            <div className='profile-content-col text-light'>
              <h2 className='text-light'>Strawberry Joystick</h2>
              <p>
              I'm a Game Mechanics Designer and a Video Game Developer. I just started my career and will bring you full of joy. I'm sure you'll love my games. Stay tuned.
              </p>
            </div>
            <div className='links-col'>
              <div className='d-xs-inline-flex flex-xs-row-reverse'>
                <Nav className="navbar-nav flex-grow">
                    <NavItem className="col-md-3">
                        <NavLink tag={Link} className="text-light" to="/strawberry-joystick/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} className="text-light" to="/strawberry-joystick/projects">Game Apps</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} className="text-light" to="/strawberry-joystick/privacy-policy">Privacy Policy</NavLink>
                    </NavItem>
                </Nav>
              </div>
            </div>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}
