import * as React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import './SJHome.scss';
import { RoutingProps } from '../../App';

class Home extends React.Component<RoutingProps> {

  goTo(path: string) {
    if (this.props.navigate)
      this.props.navigate(path);
  }

  render () {
    return (
      <div className='home-page'>
        <Container className="main-content-container">
          <h1 className='site-name'>Strawberry Joystick</h1>
          <div className='introduction-container'>
          </div>
        </Container>

        <div className='page-section page-section-game-app'>
          <Container className="menu">
            <Row className='justify-content-center'>
              <Col sm={12} md={6} lg={4}
                className='site-category-col'
                onClick={() => this.goTo('/strawberry-joystick/projects')}>
                <Row className='justify-content-center'>
                  <div className='blender-unity-icon-frame'>
                    <img className='blender-unity-icon' src="/blender-unity-icon.gif"/>
                  </div>
                  <Col xs={12} className='text-center'>
                    <h2 className='site-category-name'>Game Apps</h2>
                  </Col>
                  <Col xs={12}>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
          </div>
      </div>
    );
  }
}

export default connect()(Home);
