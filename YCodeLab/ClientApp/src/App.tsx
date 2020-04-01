import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import ThirdPartyLibDevs from './components/ThirdPartyLibDevs';
import WebAppDevs from './components/WebAppDevs';
import TechWritings from './components/TechWritings';
import VideoGameDevs from './components/VideoGameDevs';
import Profile from './components/Profile';
import ContactMe from './components/ContactMe';
import Counter from './components/Counter';
import FetchData from './components/FetchData';

import './custom.scss'

export default class App extends React.Component {
  componentDidMount() {
    document.body.classList.add('bg-light');
  }

  render() {
    return (
      <Layout>
          <Route exact path='/' component={Home} />
          <Route path='/profile' component={Profile} />
          <Route path='/third-party-lib-devs' component={ThirdPartyLibDevs} />
          <Route path='/web-app-devs' component={WebAppDevs} />
          <Route path='/tech-writings' component={TechWritings} />
          <Route path='/video-game-devs' component={VideoGameDevs} />
          <Route path='/contact-me' component={ContactMe} />
          <Route path='/counter' component={Counter} />
          <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
      </Layout>
    );
  }
}
