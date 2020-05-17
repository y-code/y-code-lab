import * as React from 'react';
import { HashLink } from 'react-router-hash-link';

import './MyProjects.scss';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class MyProjects extends React.PureComponent<{
}, {
}> {
  public render() {
    return (
      <div className="page-my-projects">
        <div className='table-of-contents'>
          <Container>
            <h1>My Projects</h1>

            <ul className="h2">
              <li><HashLink to="#web-app-dev">Web Application Developments</HashLink></li>
              <ul className="h3">
                <li>
                  <HashLink to="#ycode-lab">
                    <div style={{ marginRight: "10px", backgroundImage: "url(/favicon.png)", backgroundRepeat: "no-repeat", backgroundPositionY: "center", display: "inline", width: "16px", height: "16px"}}>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                    Y-code Lab
                  </HashLink>
                </li>
                <li>
                  <HashLink to="#happyfl">
                    <div style={{ marginRight: "10px", backgroundImage: "url(https://happyfl.apphb.com/favicon.png)", backgroundRepeat: "no-repeat", backgroundPositionY: "center", backgroundSize: "16px", display: "inline", width: "16px", height: "16px"}}>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                    HappyFL
                  </HashLink>
                </li>
              </ul>
              <li><HashLink to="#lib-dev">Library Developments</HashLink></li>
              <ul className="h3">
                <li>
                  <HashLink to="#react-redux-stethoscope">
                    <img src="https://badge.fury.io/js/react-redux-stethoscope.svg" alt="npm version" height="18" />
                    &nbsp;
                    React-Redux Stethoscope
                  </HashLink>
                </li>
                <li>
                  <HashLink to="#reactstrap-paginationbar">
                    <img src="https://badge.fury.io/js/reactstrap-paginationbar.svg" alt="npm version" height="18" />
                    &nbsp;
                    Reactstrap Paginationbar
                  </HashLink>
                </li>
              </ul>
              <li><HashLink to="#video-game-dev">Video Game Developments</HashLink></li>
              <li><HashLink to="#tech-writings">Technical Writings</HashLink></li>
            </ul>
          </Container>
        </div>

        <a className="anchor" id="web-app-dev"/>

        <div className='page-section page-section-web-app-dev'>

          <h2>Web Application Developments</h2>

        </div>

        <a className="anchor" id="ycode-lab"/>

        <div className='page-section page-section-web-app-dev'>
          <Container>
            <h3>
              <div style={{ marginRight: "10px", backgroundImage: "url(/favicon-32.png)", backgroundRepeat: "no-repeat", backgroundPositionY: "center", display: "inline", width: "32px", height: "32px"}}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </div>
              Y-code Lab
              <a href="https://github.com/y-code/y-code-lab" target="_blank"><img src="/GitHub-Mark-64px.png" style={{ width: "26px", marginLeft: "10px" }}/></a>
            </h3>
            <Container>
              <Row>
                <Col lg={12}>
                  <p>
                    Y-code Lab is my profile website here. I'm using ASP.Net Core SPA with React/Redux and Entity Framework with PostgreSQL for this web application development. I dockerize it and am hosting the docker container at Heroku.
                  </p>
                  <p>
                    A service is running in the backend to cache updates from <a href="https://api.codeproject.com/">Code Project API</a> in terms of my articles. This API is still in beta release, and it turned to be very unstable where requests sometimes fail. Therefore, I created the caching service to provide my articles information on <Link to="/tech-writings">Technical Writings page</Link> in a stable.
                  </p>
                  <p>
                    Entity Framework is for saving the message on <Link to="/contact-me">Contact ME page</Link>.
                  </p>
                  <p>
                    The source code of this web application is in public in <a href="https://github.com/y-code/y-code-lab" target="_blank">y-code/y-code-lab repository at GitHub</a>. Please feel free to look over it.
                  </p>
                </Col>
              </Row>
            </Container>
          </Container>
        </div>

        <a className="anchor" id="happyfl"/>
        
        <div className="page-section page-section-web-app-dev">
          <Container>
            <h3>
              <div style={{ marginRight: "10px", backgroundImage: "url(https://happyfl.apphb.com/favicon.png)", backgroundRepeat: "no-repeat", backgroundPositionY: "center", display: "inline", width: "32px", height: "32px"}}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </div>
              HappyFL
              <a href="https://happyfl.apphb.com/" target="_blank"><img src="https://img.icons8.com/metro/26/000000/external-link.png" style={{ width: "20px", marginLeft: "10px" }}/></a>
            </h3>
            <Container>
              <Row>
                <Col lg={12} xl={6}>
                  <p>
                    HappyFL is a web application I'm personally developing. I'm using ASP.Net Core SPA with Angular and Entity Framework with PostgreSQL for this web application development.
                  </p>
                  <p>
                    This web application is a daily food management system, which integrates meal planning, shopping list generation, and recipe management. The development is still at the beginning, and what you can do so far is to parse recipe webpages, to save the parsed recipe information, and to view the saved recipes (dishes).
                  </p>
                  <p>
                    By the way, the enhancement in Npgsql that I'm pull-requesting is used in this application to host it at App Harbor. Please find the details of the enhancement in <Link to="/tech-writings">Contributions in Third-Party Software page here</Link> or <a href="https://github.com/npgsql/npgsql/pull/2733">my pull request at GitHub</a>.
                  </p>
                </Col>
                <Col lg={12} xl={6} className="col-center">
                  <iframe className="youtube-video" src="https://www.youtube.com/embed/rzlIH8FfK6E"
                    frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </Col>
              </Row>
            </Container>
          </Container>
        </div>

        <a className="anchor" id="lib-dev" />

        <div className='page-section page-section-lib-dev'>

          <h2>Library Developments</h2>

        </div>

        <a className="anchor" id="react-redux-stethoscope"/>

        <div className="page-section page-section-lib-dev">
          <Container>
            <h3>React-Redux Stethoscope</h3>
            <p>
              <a target="_blank" href="https://badge.fury.io/js/react-redux-stethoscope">
                <img src="https://badge.fury.io/js/react-redux-stethoscope.svg" alt="npm version" height="18" />
              </a>
            </p>
            <p>
              When you want to test a React component after an operation that dispatches a Redux action, you need to make it sure that before your test code goes on, all the React components connected to the Redux store are thoroughly updated based on the new state. We can easily assure it with act() provided by <a href="https://reactjs.org/docs/test-utils.html#act">React Test Utility</a> or <a href="https://testing-library.com/docs/react-testing-library/api#act">Testing Library for React</a>. However, it cannot help when a test target operation dispatches Redux actions asynchronously.
            </p>
            <p>
              That's where React-Redux Stethoscope comes to help you. It can target specific Redux actions, and run test code after each action entirely takes effect on all the React components. Test code becomes like below.
            </p>
            <p>
              <pre>
{`await stethoscope.listenAsync({
  act: () => {
    wrapper.getAllByText('↺')[0].click()
  },
  targets: [
    {
      actionType: actionCreators.requestMessages().type,
      onUpdated: () => {
        expect(wrapper.queryAllByText('Loading...')).toHaveLength(1)
      }
    },
    {
      actionType: actionCreators.receiveMessages({}).type,
      onUpdated: () => {
        expect(wrapper.queryByText('Loading...')).toBeNull()
        expect(wrapper.queryAllByText('Hello, World')).toHaveLength(1)
      }
    },
  ]
})`}
              </pre>
            </p>
            <p>
              Please find more details at <a href="https://www.npmjs.com/package/react-redux-stethoscope">npmjs.com</a>
            </p>
          </Container>
        </div>

        <a className="anchor" id="reactstrap-paginationbar"/>

        <div className="page-section page-section-lib-dev">
          <Container>
            <h3>Reactstrap Paginationbar</h3>
            <p>
              <a target="_blank" href="https://badge.fury.io/js/reactstrap-paginationbar">
                <img src="https://badge.fury.io/js/reactstrap-paginationbar.svg" alt="npm version" height="18" />
              </a>
            </p>
            <p>
              When I was developing a support tool using React at my work, I found that implementing pagination with the component of Bootstrap requires a particular effort. Unfortunately, there's no difference with Reactstrap either. So, I developed a higher level of pagination component for Reactstrap and published it as an npm package.
            </p>
            <p>
              This component assembles Reactstrap's stateless pagination components and provides stateful pagination functionality. Import the component and place it in code, then you will instantly see a pagination bar on UI.
            </p>
            <p>
              <iframe
                src="https://codesandbox.io/embed/p3yjn7rpv0?fontsize=14&amp;hidenavigation=1&amp;theme=dark"
                style={{ width: "100%", height: "500px", border: "0", borderRadius: "4px", overflow: "hidden" }}
                title="p3yjn7rpv0"
                allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
                sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
              />
            </p>
          </Container>
        </div>

        <a className="anchor" id="video-game-dev"/>

        <div className='page-section page-section-video-game-dev'>
          <Container>
            <h2>Video Game Developments</h2>
            <p className="introduction-container">
              I've been enjoying Video Game Development in my spare time for recent years. Please see <Link to="/video-game-devs">the demo videos of my video games here</Link>.
            </p>
          </Container>
        </div>

        <a className="anchor" id="tech-writings"/>

        <div className='page-section page-section-tech-writings'>
          <Container>
            <h2>Technical Writings</h2>
            <p className="introduction-container">
              I sometimes write articles when I discover something during my software developments. Please have a look at <Link to="/tech-writings">the list of my articles here</Link>.
            </p>
          </Container>
        </div>
      </div>
    );
  }
}
