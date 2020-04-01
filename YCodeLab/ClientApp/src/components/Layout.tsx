import * as React from 'react';
import { Container, Alert } from 'reactstrap';
import NavMenu from './NavMenu';
import Footer from './Footer';

import './Layout.scss';
import { Link } from 'react-router-dom';

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
        <Container className='main-content-container'>
          {this.props.children}
        </Container>
        <Footer/>
      </React.Fragment>
    );
  }
}

const Notifications: React.FunctionComponent = props => {
  const [ isAlertingJobSeeking, setAlertingJobSeeking ] = React.useState(true);
  return (
    <Container>
      <Alert color='warning' isOpen={isAlertingJobSeeking} toggle={() => setAlertingJobSeeking(!isAlertingJobSeeking)}>
        I'm currently looking for a Software Engineer role. Please visit <Link to="/profile">Profile page</Link> and <Link to="/contact-me">Contact ME</Link>.
      </Alert>
    </Container>
  );
}
