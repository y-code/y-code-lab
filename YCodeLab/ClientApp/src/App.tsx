import * as React from 'react';
import { NavigateFunction, Params, Route, Routes, useNavigate } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import ContributionsIn3rdParty from './components/ContributionsIn3rdParty';
import MyProjects from './components/MyProjects';
import TechWritings from './components/TechWritings';
import VideoGameDevs from './components/VideoGameDevs';
import ContactMe from './components/ContactMe';
import Counter from './components/Counter';
import FetchData from './components/FetchData';

import './custom.scss'
import Layout2 from './layout-2/Layout2';
import { useParams } from 'react-router';

// class ScrollToTopWithoutRouter extends React.Component<RouteComponentProps<any>, any> {
//   componentDidUpdate(prevProps: Readonly<RouteComponentProps<any>>) {
//     if (this.props.location !== prevProps.location) {
//       window.scrollTo(0, 0)
//     }
//   }
//   render(): JSX.Element {
//     return <>{this.props.children}</>;
//   }
// }
// var ScrollToTop = withRouter(ScrollToTopWithoutRouter);

export interface RoutingProps {
  navigate?: NavigateFunction,
  param?: Readonly<Params<string>>
}

function useHooks(props: any) : {
  navigate: NavigateFunction,
  param: Readonly<Params<string>>
} {
  return {
    ...props,
    navigate: useNavigate(),
    params: useParams(),
  }
}

const _Home = (props: any) => <Home {...useHooks(props)}/>;
const _ContributionsIn3rdParty = (props: any) => <ContributionsIn3rdParty {...useHooks(props)}/>
const _MyProjects = (props: any) => <MyProjects {...useHooks(props)}/>
const _TechWritings = (props: any) => <TechWritings {...useHooks(props)}/>
const _VideoGameDevs = (props: any) => <VideoGameDevs {...useHooks(props)}/>
const _ContactMe = (props: any) => <ContactMe {...useHooks(props)}/>

export default class App extends React.Component {

  componentDidMount() {
    document.body.classList.add('bg-light');
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route path='' element={<_Home/>} />
            <Route path='Home' element={<_Home/>} />
            <Route path='contributions-in-3rd-party' element={<_ContributionsIn3rdParty/>} />
            <Route path='my-projects' element={<_MyProjects/>} />
            <Route path='tech-writings' element={<_TechWritings/>} />
            <Route path='video-game-devs' element={<_VideoGameDevs/>} />
            <Route path='contact-me' element={<_ContactMe/>} />
            {/* <Route key='counter' element={Counter} />
            <Route key='fetch-data/:startDateIndex?' element={FetchData} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}
