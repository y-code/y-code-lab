import * as React from 'react';
import { Container, Alert } from 'reactstrap';
import NavMenu2 from './NavMenu2';
import Footer2 from './Footer2';

import './Layout2.scss';
import { Outlet } from 'react-router';
import { ErrorBoundary } from '../utilities/ErrorBoundary';

export default class Layout2 extends React.Component {
  render () {
    return (
      <React.Fragment>
        <NavMenu2/>
        <Notifications/>
        <ErrorBoundary>
          <Outlet/>
        </ErrorBoundary>
        <Footer2/>
      </React.Fragment>
    );
  }
}

const Notifications: React.FunctionComponent = props => {
  const [ isAlertingJobSeeking, setAlertingJobSeeking ] = React.useState(true);
  return (
    <Container>
      <Alert className="text-center" color='info' isOpen={isAlertingJobSeeking} toggle={() => setAlertingJobSeeking(!isAlertingJobSeeking)}>
        📦📦📦&nbsp;&nbsp;&nbsp;<b><a href="/strawberry-joystick/projects#power-maniac">Power Mainiac</a></b> is now available at <b>Google Play</b>!!&nbsp;&nbsp;&nbsp;📦📦📦
      </Alert>
    </Container>
  );
}
