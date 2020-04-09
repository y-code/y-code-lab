import * as React from 'react';
import { connect } from 'react-redux';
import { Alert, Container, Row, Col } from 'reactstrap';
import { Link, Router } from 'react-router-dom';

import './Home.scss';

const onClickCategoryCol = () => {

};

class Home extends React.Component<{
  history: any,
}, {
}> {
  goTo(path: string) {
    var history = this.props.history.push(path);
  }

  render () {
    return (
      <div className='home-page'>
        <h1 className='site-name'>Y-code Lab</h1>
        <div className='greeting-container'>
          <p>Welcome to Yas's Lab! It is a place I showcase my works. Please feel free to look around. I would be grateful if you could <Link to="/contact-me">leave a comment.</Link></p>
        </div>
        <Container className="menu">
          <Row className='justify-content-center'>
            <Col sm={12} md={12} lg={4}
              className='site-category-col'
              onClick={() => this.goTo('/my-projects')}>
              <Row className='justify-content-center'>
                <div className='my-projects-icon-frame text-center'>
                  <img className='my-projects-icon' src="/happyfl-big.png"/>
                </div>
                <Col xs={12} className='text-center'>
                  <h2 className='site-category-name'>My Projects</h2>
                </Col>
                <Col xs={12}>
                </Col>
              </Row>
            </Col>
            <Col sm={12} md={6} lg={4}
              className='site-category-col'
              onClick={() => this.goTo('/contributions-in-3rd-party')}>
              <Row className='justify-content-center'>
                <div className='devs-in-3rd-party-icon-frame'>
                  <img className='devs-in-3rd-party-icon' src="/contributions-in-3rd-party-icon.png"/>
                </div>
                <Col xs={12}>
                  <h2 className='site-category-name'>Contributions in 3rd Party</h2>
                </Col>
                <Col xs={12}>
                </Col>
              </Row>
            </Col>
            <Col sm={12} md={6} lg={4}
              className='site-category-col'
              onClick={() => this.goTo('/tech-writings')}>
              <Row className='justify-content-center'>
                <div className='code-project-icon-frame'>
                  <img className='code-project-icon' src="/code-project-icon.png"/>
                </div>
                <Col xs={12}>
                  <h2 className='site-category-name'>Technical Writings</h2>
                </Col>
                <Col xs={12}>
                </Col>
              </Row>
            </Col>
            <Col sm={12} md={6} lg={4}
              className='site-category-col'
              onClick={() => this.goTo('/video-game-devs')}>
              <Row className='justify-content-center'>
                <div className='blender-unity-icon-frame'>
                  <img className='blender-unity-icon' src="/blender-unity-icon.gif"/>
                </div>
                <Col xs={12} className='text-center'>
                  <h2 className='site-category-name'>Video Game Developments</h2>
                </Col>
                <Col xs={12}>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect()(Home);
