import * as React from 'react';

import './MyProjects.scss';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class MyProjects extends React.PureComponent<{
}, {
}> {
  public render() {
    return (
      <div className="page-my-projects">
        <h1>My Projects</h1>

        <h2>Web Application Developments</h2>

        <h3>
          <div style={{ marginRight: "10px", backgroundImage: "url(/favicon-32.png)", backgroundRepeat: "no-repeat", display: "inline", width: "32px", height: "32px"}}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          Y-Code Lab
          <a href="https://github.com/y-code/y-code-lab" target="_blank"><img src="/GitHub-Mark-64px.png" style={{ width: "26px", marginLeft: "10px" }}/></a>
        </h3>
        <Container>
          <Row>
            <Col lg={12}>
              <p>
                Y-Code Lab is my profile website here. I'm using ASP.Net Core SPA with React/Redux and Entity Framework with PostgreSQL for this web application development. I dockerize it and am hosting the docker container at Heroku.
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

        <h3>
          <div style={{ marginRight: "10px", backgroundImage: "url(https://happyfl.apphb.com/favicon.png)", backgroundRepeat: "no-repeat", display: "inline", width: "32px", height: "32px"}}>
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

        <h2>Library Developments</h2>

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

        <h2>Video Game Developments</h2>
        <p>
          I've been enjoying Video Game Development in my spare time for recent years. Please see <Link to="/video-game-devs">the demo videos of my video games here</Link>.
        </p>

        <h2>Technical Writings</h2>
        <p>
          I sometimes write articles when I discover something during my software developments. Please have a look at <Link to="/tech-writings">the list of my articles here</Link>.
        </p>
      </div>
    );
  }
}
