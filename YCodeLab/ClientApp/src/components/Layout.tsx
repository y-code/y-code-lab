import * as React from 'react';
import { Container, Alert } from 'reactstrap';
import NavMenu from './NavMenu';
import Footer from './Footer';

import './Layout.scss';
import { HashLink } from 'react-router-hash-link';

export default class Layout extends React.Component<{
  children?: React.ReactNode
}, {
}> {
  constructor(
    props: {
      children?: React.ReactNode
    }
  ) {
    super(props);
  }

  render () {
    return (
      <React.Fragment>
        <NavMenu/>
        <Notifications/>
        {/* <Container className='main-content-container'> */}
          {this.props.children}
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
      📦📦📦&nbsp;&nbsp;&nbsp;<b><HashLink to="/my-projects#react-redux-stethoscope">React-Redux Stethoscope</HashLink></b> is now available at <b>npm</b>!!&nbsp;&nbsp;&nbsp;📦📦📦
      </Alert>
    </Container>
  );
}
