import * as React from 'react';
import { Route, RouteComponentProps, withRouter } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import ContributionsIn3rdParty from './components/ContributionsIn3rdParty';
import MyProjects from './components/MyProjects';
import TechWritings from './components/TechWritings';
import VideoGameDevs from './components/VideoGameDevs';
// import Profile from './components/Profile';
import ContactMe from './components/ContactMe';
import Counter from './components/Counter';
import FetchData from './components/FetchData';

import './custom.scss'

class ScrollToTopWithoutRouter extends React.Component<RouteComponentProps<any>, any> {
  componentDidUpdate(prevProps: Readonly<RouteComponentProps<any>>) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }
  render(): JSX.Element {
    return <>{this.props.children}</>;
  }
}
var ScrollToTop = withRouter(ScrollToTopWithoutRouter);

export default class App extends React.Component {
  componentDidMount() {
    document.body.classList.add('bg-light');
  }

  render() {
    return (
      <ScrollToTop>
        <Layout>
            <Route exact path='/' component={Home} />
            {/* <Route path='/profile' component={Profile} /> */}
            <Route path='/contributions-in-3rd-party' component={ContributionsIn3rdParty} />
            <Route path='/my-projects' component={MyProjects} />
            <Route path='/tech-writings' component={TechWritings} />
            <Route path='/video-game-devs' component={VideoGameDevs} />
            <Route path='/contact-me' component={ContactMe} />
            <Route path='/counter' component={Counter} />
            <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
        </Layout>
      </ScrollToTop>
    );
  }
}
