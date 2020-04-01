import * as React from 'react';

import './VideoGameDevs.scss';
import { Row, Col } from 'reactstrap';

export default class VideoGameDevs extends React.PureComponent<{
}, {
}> {
  public render() {
    return (
      <div className="video-game-devs-page">
        <h1>Video Game Developments</h1>
        <Introduction {...this.props}/>
        <NetworkMultiplayerGames/>
        <TowerOfMazes/>
        <CubeDojo/>
        <KotoDama/>
        <HumanoidAvatar/>
        <FairyDungeon/>
      </div>
    );
  }
}

function Introduction(props: any) {
  return (
    <Row className="intro">
      <Col>
        <p>
          I've been enjoying Video Game Development in my spare time for recent years. I develop 3D video games by Unity game engine and create 3D models by Blender.
        </p>
        <p>
          There are several personal development projects ongoing in parallel.
        </p>
      </Col>
    </Row>
  );
}

function NetworkMultiplayerGames(props: any) {
  return (
    <Row className="section">
      <Col min={560}>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/3L3cToPfDqg" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </Col>
      <Col>
        <p>
          Babble Warriors Colosseum are my attempts at online multiplayer game development. I've been developing them with UNet HLAPI, but now it is deprecated, and new online game solutions are available. I will have to migrate those games to a new framework.
        </p>
        <p>
          By the way, in Babble Warriors Colosseum, I also put efforts in 3D character modelling, especially in clothing and rigging.
        </p>
      </Col>
    </Row>
  );
}

function TowerOfMazes(props: any) {
  return (
    <Row className="section">
      <Col min={560}>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/-GQ1SAOzkWQ" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </Col>
      <Col>
        <p>
          I started developing Tower of Maze to use shortest path algorithm. In this game, the opponent character is controlled by the algorithm. To begin with, I chose the Lee algorithm. I'm thinking to try A* search algorithm next and want to see how it would be different in the pathfinding results.
        </p>
        <p>
          This game generates the walls in random every time and calculates the goal location based on the breadth-first search to be the farthest from the start location.
        </p>
        <p>
          However, the control of the opponent character was a more challenging problem than the pathfinding. Because the maze is composed of hexagons, the opponent character could hit a wall and stick on it if it would try to go straight onto the next tile depending on from where it starts. Therefore, I needed to calculate opponent control to adjust the moving direction when there's a wall on the way.
        </p>
      </Col>
    </Row>
  );
}

function CubeDojo(props: any) {
  return (
    <Row className="section">
      <Col min={560}>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/txrMp1yyNeA" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </Col>
      <Col>
        <p>
          In Cube Dojo, intuitive control was a challenging problem. I'm satisfied with my implementation of the rotation control of each layer of cubes. A player can rotate a layer by drag and drop operation, or touch and swipe action in mobile devices. I'm currently improving view angle rotation control to make it more intuitive.
        </p>
      </Col>
    </Row>
  );
}

function KotoDama(props: any) {
  return (
    <Row className="section">
      <Col min={560}>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/sXcFglOtCRo" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </Col>
      <Col>
        <p>
          KotoDama is still at the very beginning of development, and I have only finished avatar action and some model design. This time, I attempted to utilize the simulation methods of Blender to add natural movements into animation.
        </p>
        <p>
          Besides, I also tried modelling a realistic tree for this game world. I'm pretty satisfied with the result.
        </p>
      </Col>
    </Row>
  );
}

function HumanoidAvatar(props: any) {
  return (
    <Row className="section">
      <Col min={560}>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/i6IsGgb_ZF0" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </Col>
      <Col>
        <p>
          Humanoid Avatar Demo is a demo for one of my humanoid model with rigging and animation. I tried to reduce the vertices of the model polygon while keeping the quality in animation. It was also challenging to set up colliders over the humanoid body which moves around during animation.
        </p>
      </Col>
    </Row>
  );
}

function FairyDungeon(props: any) {
  return (
    <Row className="section">
      <Col min={560}>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/DcrcgEQ1lb8" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </Col>
      <Col>
        <p>
          Fairy Dungeon was just a demo to test a shader that my kid and I designed and developed together. In my kid's game development project, the video game he designed required an unusual rendering, and we found that creating a custom shader can be a solution for it. It was the first time for me, and also for my kid, to write code in ShaderLab language. So, I made a simple video game so as for my kid to test the shader before using it in his video game.
        </p>
      </Col>
    </Row>
  )
}