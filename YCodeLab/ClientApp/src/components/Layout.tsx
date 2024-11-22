import * as React from 'react';
import { Container, Alert } from 'reactstrap';
import NavMenu from './NavMenu';
import Footer from './Footer';

import './Layout.scss';
import { Outlet } from 'react-router';

export default class Layout extends React.Component {
  render () {
    return (
      <React.Fragment>
        <NavMenu/>
        <Notifications/>
        {/* <Container className='main-content-container'> */}
        <Outlet />
        {/* </Container> */}
        <Footer/>
      </React.Fragment>
    );
  }
}

const Notifications: React.FunctionComponent = props => {
  const [ isAlertingJobSeeking, setAlertingJobSeeking ] = React.useState(true);
  return (
    <Container>
      <Alert className="text-center" color='info' isOpen={isAlertingJobSeeking} toggle={() => setAlertingJobSeeking(!isAlertingJobSeeking)}>
      📦📦📦&nbsp;&nbsp;&nbsp;<b><a href="/my-projects#aspnet-api-group-versioning">ASP.NET API Group Versioning</a></b> is now available at <b>nuget.org</b>!!&nbsp;&nbsp;&nbsp;📦📦📦
      </Alert>
    </Container>
  );
}
