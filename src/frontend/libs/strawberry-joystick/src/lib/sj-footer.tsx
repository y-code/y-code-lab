import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import styles from "./strawberry-joystick.module.scss";

export function SJFooterTop() {
  return (
    <Container className='text-end text-light'>
      &copy;Y-code
    </Container>
  );
}

export function SjFooterContent() {
  const [ isStackOverflowIconTooltipOpen, setIsStackOverflowIconTooltipOpen ] = React.useState(false);
  const [ isGitHubTooltipOpen, setIsGitHubTooltipOpen ] = React.useState(false);

  return (
    <Container>
      <Row className="align-items-center">
        <Col sm={12} md={4} lg={3} xl={3} xxl={3}>
          <div className={'text-center ' + styles['footer-profile-img-col']}>
            <img className='profile-img' src='/assets/logo-strawberry-joystick.png'/>
          </div>
        </Col>
        <Col sm={12} md={8} lg={6} xl={6} xxl={6}>
          <h2 className='text-light'>Strawberry Joystick</h2>
          <div>
            I'm a Game Mechanics Designer and a Video Game Developer. I just started my career and will bring you full of joy. I'm sure you'll love my games. Stay tuned.
          </div>
        </Col>
      </Row>
    </Container>
  );
}
