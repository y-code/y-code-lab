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
                This is my personal development. This web application is a daily food management system, which integrates meal planning, shopping list generation, and recipe management. The development is still at the beginning. What you can do so far is to parse recipe webpages, to save the parsed recipe information, and to view the saved recipes (dishes).
              </p>
              <p>
                This web application is created using ASP.Net Core, Entity Framework with PostgreSQL, and Angular.
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
