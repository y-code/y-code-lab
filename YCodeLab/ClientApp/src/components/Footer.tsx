import * as React from 'react';
import { Container, Row, Col, NavItem, NavLink, Nav } from 'reactstrap';
import './Footer.scss';
import { Link } from 'react-router-dom';
import Navbar from 'reactstrap/lib/Navbar';

export default (props: { children?: React.ReactNode }) => (
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
              <img className='profile-img' src='/profile-img.jpg'/>
            </div>
          </div>
          <div className='profile-content-col'>
            <h2 className='text-light'>Yas Ikeda</h2>
            <p className='text-light'>
              I'm a Software Engineer most skilled in web system development. I have experienced many enterprise system development projects in Japan and New Zealand.
            </p>
            {/* <p className='text-light'>
              I also have work experiences in every phase of the systems development life cycle through those projects. Ability to perform any development phase and to drive development projects is my strength besides my technical skills.
            </p> */}
            <p className='text-light'>
              As much as I love coding, I also have a keen interest in the way how computer systems can make our life and business better. In some projects in the past, I was a business analyst and worked in busyness process analysis and software requirements documentation.
            </p>
            <p className='text-light'>
              For more details, please visit <Link to="/profile">Profile page</Link>.
            </p>
          </div>
          <div className='links-col'>
            <Nav vertical>
              <NavItem>
                  <NavLink tag={Link} className="text-light" to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink tag={Link} className="text-light" to="/web-app-devs">Web App Devs</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink tag={Link} className="text-light" to="/tech-writings">Technical Writings</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink tag={Link} className="text-light" to="/video-game-devs">Video Game Devs</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink tag={Link} className="text-light" to="/profile">Profile</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink tag={Link} className="text-light" to="/contact-me">Contact ME</NavLink>
              </NavItem>
              {/* <NavItem>
                  <NavLink tag={Link} className="text-light" to="/counter">Counter</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink tag={Link} className="text-light" to="/fetch-data">Fetch data</NavLink>
              </NavItem> */}
              <a href="/" target="_blank" className="github-link">
                <img src="/GitHub-Mark-Light-120px-plus.png"/>
              </a>
            </Nav>
          </div>
        </Row>
      </Container>
    </div>
  </React.Fragment>
);
