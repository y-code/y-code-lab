import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Tooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.scss';

export default function(props: {}){
  const [ isNavOpen, setIsNavOpen ] = React.useState(false);
  const [ isStackOverflowIconTooltipOpen, setIsStackOverflowIconTooltipOpen ] = React.useState(false);
  const [ isGitHubTooltipOpen, setIsGitHubTooltipOpen ] = React.useState(false);

  return (
    <header className="nav-menu">
      <Navbar className="fixed-top navbar-expand-lg navbar-toggleable-lg border-bottom box-shadow mb-3 navbar-dark bg-primary">
        <Container>
          <NavbarBrand tag={Link} to="/" className="text-light">Y-code Lab</NavbarBrand>
          <NavbarToggler onClick={() => setIsNavOpen(!isNavOpen)} className="mr-2"/>
          <Collapse className="d-lg-inline-flex flex-lg-row-reverse" isOpen={isNavOpen} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-light" to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink tag={Link} className="text-light" to="/my-projects">My Projects</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-light" to="/contributions-in-3rd-party">Devs in 3rd Party</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink tag={Link} className="text-light" to="/video-game-devs">Video Game Devs</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink tag={Link} className="text-light" to="/tech-writings">Writings</NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink tag={Link} className="text-light" to="/profile">Profile</NavLink>
              </NavItem> */}
              <NavItem>
                  <NavLink tag={Link} className="text-light" to="/contact-me">Contact ME</NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink tag={Link} className="text-light" to="/counter">Counter</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-light" to="/fetch-data">Fetch data</NavLink>
              </NavItem> */}
              <NavItem>
                <a id="stack-overflow-icon"
                   href="https://stackoverflow.com/users/9195902/yas-ikeda"
                   target="_blank"
                   className="text-light nav-icon nav-link"
                >
                  <img src="https://cdn.sstatic.net/Sites/stackoverflow/company/img/logos/so/so-icon.png?v=c78bd457575a"
                        width="40px"/>
                  <span className="nav-icon-label">
                    My Profile in Stack Overflow
                  </span>
                </a>
                <Tooltip target="stack-overflow-icon"
                         placement="bottom-start"
                         isOpen={isStackOverflowIconTooltipOpen}
                         toggle={() => setIsStackOverflowIconTooltipOpen(!isStackOverflowIconTooltipOpen)}
                >
                  My Profile in GitHub
                </Tooltip>
              </NavItem>
              <NavItem>
                <a id="github-icon"
                   href="https://github.com/y-code"
                   target="_blank"
                   className="text-light nav-icon nav-link"
                >
                  <img src="/GitHub-Mark-Light-32px.png" className="icon-github"/>
                  <span className="nav-icon-label">
                    My Profile in GitHub
                  </span>
                </a>
                <Tooltip target="github-icon"
                         placement="bottom-start"
                         isOpen={isGitHubTooltipOpen}
                         toggle={() => setIsGitHubTooltipOpen(!isGitHubTooltipOpen)}
                >
                  My Profile in GitHub
                </Tooltip>
              </NavItem>
            </ul>
          </Collapse>
          {/* <a href="/" target="_blank" className="github-link">
            <img src="/GitHub-Mark-Light-32px.png"/>
          </a> */}
        </Container>
      </Navbar>
    </header>
  );
}
