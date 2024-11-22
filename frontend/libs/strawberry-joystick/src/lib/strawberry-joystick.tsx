import React from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Outlet } from 'react-router-dom';
import { useScrollableStickyFooter } from '@ycode-lab/common';
import { SjFooterContent, SJFooterTop } from "./sj-footer";

import styles from "./strawberry-joystick.module.scss";

/* eslint-disable-next-line */
export interface StrawberryJoystickProps {}

export function StrawberryJoystick(props: StrawberryJoystickProps) {
  const [collapsed, setCollapsed] = React.useState(false);
  const toggleNavbar = () => setCollapsed(!collapsed);

  const {footerRef, stickyFooterRef} = useScrollableStickyFooter();

  return (
    <React.Fragment>
      <Navbar color="dark" dark expand="lg" className={styles['header']}>
        <NavbarBrand href="/strawberry-joystick">
          <img alt="logo" src="/assets/logo-strawberry-joystick-32.png" className={styles['header-logo']} />
          Strawberry Joystick
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="me-2" />
        <Collapse isOpen={collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/strawberry-joystick">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/strawberry-joystick/projects">Game Apps</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/strawberry-joystick/privacy-policy">Privacy Policy</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <div className={styles['sj-layout']}>
        <Outlet/>
      </div>
      <footer className={'bg-dark ' + styles['footer-sticky']} ref={stickyFooterRef}>
        <SJFooterTop/>
      </footer>
      <footer className={'bg-dark ' + styles['footer-main']} ref={footerRef}>
        <SJFooterTop/>
        <SjFooterContent/>
      </footer>
    </React.Fragment>
  );
}

export default StrawberryJoystick;
