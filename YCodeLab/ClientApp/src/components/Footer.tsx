import * as React from 'react';
import { Container, Row, Col, NavItem, NavLink, Nav, NavbarBrand, NavbarToggler, Collapse, Tooltip } from 'reactstrap';
import './Footer.scss';
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
                <img className='profile-img' src='/profile-img.jpg'/>
              </div>
            </div>
            <div className='profile-content-col text-light'>
              <h2>Yas Ikeda</h2>
              <p>
                I'm a Software Engineer experienced in enterprise system development. I'm most skilled in Web System Development while increasing knowledge in Video Game Development these days.
              </p>
              <p>
                As well as I love coding, I have a keen interest in the way how to develop and apply computer systems to improve business processes effectively. In some projects in the past, I worked as a business analyst and worked in Business Process Analysis and Systems design.
              </p>
              <p>
                In recent years, I gained more knowledge in Project Management and Test Strategy. I've been practising the implementation of effective and also efficient Quality Assurance process under Agile Project Management from the aspect of Development Process and Test Automation.
              </p>
              <Row>
                <Col sm={12} md={6} lg={10} xl={6}>
                  <div className="LI-profile-badge"  data-version="v1" data-size="large" data-locale="en_US" data-type="horizontal" data-theme="light" data-vanity="yasuikeda">
                    <a className="LI-simple-link" href='https://nz.linkedin.com/in/yasuikeda?trk=profile-badge'>Yasunori Ikeda</a>
                  </div>
                </Col>
                <Col sm={12} md={6} lg={2} xl={6}>
                    <Row style={{ paddingTop: "20px" }}>
                      <Col className="col-center" xs={6} md={12} style={{ marginBottom: "20px" }}>
                          <a id="stack-overflow-badge" href="https://stackoverflow.com/users/9195902/yas-ikeda" target="_blank">
                            <img src="https://stackoverflow.com/users/flair/9195902.png" width="208" height="58" alt="profile for Yas Ikeda at Stack Overflow, Q&amp;A for professional and enthusiast programmers" title="profile for Yas Ikeda at Stack Overflow, Q&amp;A for professional and enthusiast programmers" />
                          </a>
                          <Tooltip target="stack-overflow-badge"
                                   placement="bottom"
                                   isOpen={isStackOverflowIconTooltipOpen}
                                   toggle={() => setIsStackOverflowIconTooltipOpen(!isStackOverflowIconTooltipOpen)}
                          >
                            My Profile in Stack Overflow
                          </Tooltip>
                      </Col>
                      <Col className="col-center" xs={6} md={12}>
                        <a id="github-badge" href="https://github.com/y-code" target="_blank">
                            <img src="/GitHub-Mark-Light-120px-plus.png"/>
                        </a>
                        <Tooltip target="github-badge"
                                   placement="bottom"
                                   isOpen={isGitHubTooltipOpen}
                                   toggle={() => setIsGitHubTooltipOpen(!isGitHubTooltipOpen)}
                          >
                            My Profile in GitHub                          </Tooltip>
                      </Col>
                    </Row>
                </Col>
              </Row>
            </div>
            <div className='links-col'>
              <div className='d-xs-inline-flex flex-xs-row-reverse'>
                <Nav className="navbar-nav flex-grow">
                    <NavItem className="col-md-3">
                        <NavLink tag={Link} className="text-light" to="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} className="text-light" to="/my-projects">My Projects</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} className="text-light" to="/third-party-devs">Devs in 3rd Party</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} className="text-light" to="/video-game-devs">Video Game Devs</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} className="text-light" to="/tech-writings">Writings</NavLink>
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
                </Nav>
              </div>
            </div>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}
