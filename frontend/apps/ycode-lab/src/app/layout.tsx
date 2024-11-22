import React from 'react';
import { Outlet } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { useScrollableStickyFooter } from '@ycode-lab/common';
import { FooterContent, FooterTop } from "./footer";
import styles from "./app.module.scss";

interface Props {}

export function YcodeLabLayout(props: Props) {
  const [collapsed, setCollapsed] = React.useState(false);
  const toggleNavbar = () => setCollapsed(!collapsed);

  const {footerRef, stickyFooterRef} = useScrollableStickyFooter();

  return (
    <React.Fragment>
      <Navbar color="dark" dark expand="lg" className={styles['header']}>
        <NavbarBrand href="/">
          <img alt="logo" src="/assets/favicon-32.png" className={styles['header-logo']} />
          Ycode Lab
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="me-2" />
        <Collapse isOpen={collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/my-projects">My Projects</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/video-game-devs">Video Game Devs</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/tech-writings">Technical Writings</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <div className={styles['ycode-lab-layout']}>
        <Outlet/>
      </div>
      <footer className={'bg-dark ' + styles['footer-sticky']} ref={stickyFooterRef}>
        <FooterTop/>
      </footer>
      <footer className={'bg-dark ' + styles['footer-main']} ref={footerRef}>
        <FooterTop/>
        <FooterContent/>
      </footer>
    </React.Fragment>
  );
}
