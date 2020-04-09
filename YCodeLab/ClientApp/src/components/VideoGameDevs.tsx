import * as React from 'react';

import './VideoGameDevs.scss';
import { Row, Col, Badge } from 'reactstrap';

interface VideoGameDevItem {
  name: string,
  actionTypes: ('3D Game'|'3D Modeling'|'Online Multiplayer'|'3D Animation'|'ShaderLab'|'Algorithm'|'Vector Geometry')[],
  status: ('Prototype'|'In Development'|'Released'),
  videoId: string,
  description: string[],
  links: { [key:string]: string },
}

interface Props {
}

interface State {
  items: VideoGameDevItem[],
}

export default class VideoGameDevs extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      items: [
        {
          name: 'Babble Warriors Colosseum',
          actionTypes: [ 'Online Multiplayer', '3D Game', '3D Animation' ],
          status: 'In Development',
          videoId: '3L3cToPfDqg',
          description: [
            'Babble Warriors Colosseum are my attempts at online multiplayer game development. I\'ve been developing them with UNet HLAPI, but now it is deprecated, and new online game solutions are available. I will have to migrate those games to a new framework.',
            'By the way, in Babble Warriors Colosseum, I also put efforts in 3D character modelling, especially in clothing and rigging.',
          ],
          links: {
          }
        },
        {
          name: 'Tower of Maze',
          actionTypes: [ 'Algorithm', 'Vector Geometry', '3D Game'],
          status: 'In Development',
          videoId: '-GQ1SAOzkWQ',
          description: [
            'I started developing Tower of Maze to try shortest path algorithms. In this game, the opponent character is controlled by the algorithm. To begin with, I chose the Lee algorithm. I\'m thinking to try A* search algorithm next and want to see how it would be different in the pathfinding results.',
            'This game generates walls in the maze in random when a game starts so that the maze is always unique. The goal location is calculated based on the breadth-first search to be the farthest from the start location.',
            'However, the control of the opponent character was a more challenging problem than the pathfinding. Because the maze is composed of hexagons, the opponent character could hit a wall and stick on it if it would try to go straight onto the next tile depending on from where it starts. Therefore, I needed to calculate opponent control to adjust the moving direction when there\'s a wall on the way.',
          ],
          links: {
          }
        },
        {
          name: 'Cube Dojo',
          actionTypes: [ 'Vector Geometry', '3D Game' ],
          status: 'Prototype',
          videoId: 'txrMp1yyNeA',
          description: [
            'In Cube Dojo, intuitive control was a challenging problem. I\'m satisfied with my implementation of the rotation control of each layer of cubes. A player can rotate a layer by drag and drop operation, or touch and swipe action in mobile devices. I\'m currently improving view angle rotation control to make it more intuitive.',
          ],
          links: {
          }
        },
        {
          name: 'KotoDama',
          actionTypes: [ '3D Game', '3D Animation' ],
          status: 'Prototype',
          videoId: 'sXcFglOtCRo',
          description: [
            'KotoDama is still at the very beginning of development, and I have only finished avatar action and some model design. This time, I attempted to utilize the simulation methods of Blender to add natural movements into animation.',
            'Besides, I also tried modelling a realistic tree for this game world. I\'m pretty satisfied with the result.',
          ],
          links: {
          }
        },
        {
          name: 'Humanoid Avatar Demo',
          actionTypes: [ '3D Game', '3D Modeling', '3D Animation' ],
          status: 'Prototype',
          videoId: 'i6IsGgb_ZF0',
          description: [
            'Humanoid Avatar Demo is a demo for one of my humanoid model with rigging and animation. I tried to reduce the vertices of the model polygon while keeping the quality in animation. It was also challenging to set up colliders over the humanoid body which moves around during animation.',
          ],
          links: {
          }
        },
        {
          name: 'Fairy Dungeon',
          actionTypes: [ 'ShaderLab', '3D Game', '3D Modeling' ],
          status: 'Prototype',
          videoId: 'DcrcgEQ1lb8',
          description: [
            'Fairy Dungeon was just a demo to test a shader that my kid and I designed and developed together. In my kid\'s game development project, the video game he designed required an unusual rendering, and we found that creating a custom shader can be a solution for it. It was the first time for me, and also for my kid, to write code in ShaderLab language. So, I made a simple video game so as for my kid to test the shader before using it in his video game.',
          ],
          links: {
          }
        },
      ]
    };
  }

  public render() {
    return (
      <div className="video-game-devs-page">
        <h1>Video Game Developments</h1>
        <Introduction {...this.props}/>
        {(() => this.state.items.map(item => <VideoGameDev data={item} />))()}
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

function VideoGameDev(props: { data: VideoGameDevItem }) {
  const { data } = props;
  return (
    <Row className="section">
      <Col xs={12}>
        <h2>{data.name}</h2>
      </Col>
      <Col xs={12}className="col-tags">
        <>
          {(() => data.actionTypes.map(actionType => <Badge color="primary">{actionType}</Badge>))()}
          <Badge color="info">{data.status}</Badge>
        </>
      </Col>
      <Col md={12} lg={7} xl={6} min={560} className="col-center">
        <iframe className="youtube-video" src={`https://www.youtube.com/embed/${data.videoId}`}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          frameBorder="0" allowFullScreen
        />
      </Col>
      <Col>
        {(() => data.description.map(p => (<p>{p}</p>)))()}
      </Col>
    </Row>
  );
}
