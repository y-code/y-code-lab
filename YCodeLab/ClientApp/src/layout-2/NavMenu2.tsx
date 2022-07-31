import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Tooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu2.scss';

export default function(props: {}){
  const [ isNavOpen, setIsNavOpen ] = React.useState(false);
  const [ isStackOverflowIconTooltipOpen, setIsStackOverflowIconTooltipOpen ] = React.useState(false);
  const [ isGitHubTooltipOpen, setIsGitHubTooltipOpen ] = React.useState(false);

  const toggle = (target: EventTarget) => setIsNavOpen(!isNavOpen)

  const toggleOnLink = (target: EventTarget) => {
    if ((target as HTMLElement).clientWidth === (target as HTMLElement).parentElement?.parentElement?.clientWidth)
      setIsNavOpen(!isNavOpen)
  }

  return (
    <header className="nav-menu">
      <Navbar className="fixed-top navbar-expand-lg navbar-toggleable-lg border-bottom box-shadow mb-3 navbar-dark bg-primary">
        <Container>
          <img className="favicon" src="/logo-strawberry-joystick-32.png"/>
          <NavbarBrand tag={Link} to="/strawberry-joystick" className="text-light">Strawberry Joystick</NavbarBrand>
          <NavbarToggler onClick={e => toggle(e.target)} className="mr-2"/>
          <Collapse className="d-lg-inline-flex flex-lg-row-reverse" isOpen={isNavOpen} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-light" to="/strawberry-joystick" onClick={e => toggleOnLink(e.target)}>Home</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink tag={Link} className="text-light" to="/strawberry-joystick/projects" onClick={e => toggleOnLink(e.target)}>Game Apps</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink tag={Link} className="text-light" to="/strawberry-joystick/privacy-policy" onClick={e => toggleOnLink(e.target)}>Privacy Policy</NavLink>
              </NavItem>
            </ul>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
