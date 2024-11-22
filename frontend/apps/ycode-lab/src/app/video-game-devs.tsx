import { injectLink, RoutingProps, useRoutingHooks } from '@ycode-lab/common';
import styles from './app.module.scss';
import { Badge, Col, Container, Row } from 'reactstrap';

interface VideoGameDevItem {
  id: string,
  name: string,
  actionTypes: ('C#'|'3D Game'|'3D Modeling'|'Online Multiplayer'|'3D Animation'|'ShaderLab'|'Algorithm'|'Vector Geometry')[],
  status: ('Prototype'|'In Development'|'Released'),
  videoId: string,
  description: string[],
  linkToItchio: string,
  links: { [key:string]: string },
}

const data: VideoGameDevItem[] = [
  {
    id: "bwc",
    name: 'Babble Warriors Colosseum',
    actionTypes: [ 'C#', 'Online Multiplayer', '3D Game', '3D Animation' ],
    status: 'In Development',
    videoId: '3L3cToPfDqg',
    description: [
      'Babble Warriors Colosseum is one of my attempts at online multiplayer game development. Please have a look at the work I\'ve ever done in the demo video. You can play the game at itchi.io in WebGL version and Standalone version. Unfortunately, UNet Matchmaking does not work in WebGL platform. Please download PC version to enjoy the multiplayer mode.',
      'I\'ve been developing with UNet HLAPI, but now it is deprecated. New online game solutions are available, and I\'m learning the new ones and thinking about how to migrate this game to a new framework.',
      'In this development, I also put efforts in 3D character modelling, especially in clothing and rigging. Please also take a close look at the player avatar.',
    ],
    linkToItchio: 'https://y-code.itch.io/babble-warriors',
    links: {
      'Babble Warriors Colosseum': 'https://y-code.itch.io/babble-warriors',
    }
  },
  {
    id: "tower-of-maze",
    name: 'Tower of Maze',
    actionTypes: [ 'C#', 'Algorithm', 'Vector Geometry', '3D Game'],
    status: 'In Development',
    videoId: '-GQ1SAOzkWQ',
    description: [
      'I started developing Tower of Maze to try shortest path algorithms. In this game, the opponent character is controlled by the algorithm. To begin with, I chose the Lee algorithm. I\'m thinking to try A* search algorithm next and want to see how it would be different in the pathfinding results.',
      'This game generates walls in the maze in random when a game starts so that the maze is always unique. The goal location is calculated based on the breadth-first search to be the farthest from the start location.',
      'However, the control of the opponent character was a more challenging problem than the pathfinding. Because the maze is composed of hexagons, the opponent character could hit a wall and stick on it if it would try to go straight onto the next tile depending on from where it starts. Therefore, I needed to calculate opponent control to adjust the moving direction when there\'s a wall on the way.',
    ],
    linkToItchio: 'https://y-code.itch.io/dungeons-of-mazes',
    links: {
      'Tower of Maze': 'https://y-code.itch.io/dungeons-of-mazes',
    }
  },
  {
    id: "cube-dojo",
    name: 'Cube Dojo',
    actionTypes: [ 'C#', 'Vector Geometry', '3D Game' ],
    status: 'Prototype',
    videoId: 'txrMp1yyNeA',
    description: [
      'In Cube Dojo, intuitive control was a challenging problem. I\'m satisfied with my implementation of the rotation control of each layer of cubes. A player can rotate a layer by drag and drop operation, or touch and swipe action in mobile devices. I\'m currently improving view angle rotation control to make it more intuitive.',
    ],
    linkToItchio: 'https://y-code.itch.io/cuber-dojo',
    links: {
      'Cube Dojo': 'https://y-code.itch.io/cuber-dojo',
    }
  },
  {
    id: "koto-dama",
    name: 'KotoDama',
    actionTypes: [ 'C#', '3D Game', '3D Animation' ],
    status: 'Prototype',
    videoId: 'sXcFglOtCRo',
    description: [
      'KotoDama is still at the very beginning of development, and I have only finished avatar action and some model design. This time, I attempted to utilize the simulation methods of Blender to add natural movements into animation.',
      'Besides, I also tried modelling a realistic tree for this game world. I\'m pretty satisfied with the result.',
    ],
    linkToItchio: 'https://y-code.itch.io/kotodama',
    links: {
      'KotoDama': 'https://y-code.itch.io/kotodama',
    }
  },
  {
    id: "avatar-demo",
    name: 'Humanoid Avatar Demo',
    actionTypes: [ 'C#', '3D Game', '3D Modeling', '3D Animation' ],
    status: 'Prototype',
    videoId: 'i6IsGgb_ZF0',
    description: [
      'Humanoid Avatar Demo is a demo for one of my humanoid model with rigging and animation. I tried to reduce the vertices of the model polygon while keeping the quality in animation. It was also challenging to set up colliders over the humanoid body which moves around during animation.',
    ],
    linkToItchio: 'https://y-code.itch.io/humanoid-avatar-sample',
    links: {
      'Humanoid Avatar Demo': 'https://y-code.itch.io/humanoid-avatar-sample',
    }
  },
  {
    id: "fairy-dungeon",
    name: 'Fairy Dungeon',
    actionTypes: [ 'C#', 'ShaderLab', '3D Game', '3D Modeling' ],
    status: 'Prototype',
    videoId: 'DcrcgEQ1lb8',
    description: [
      'Fairy Dungeon was just a demo to test a shader that my kid and I designed and developed together. In my kid\'s game development project, the video game he designed required an unusual rendering, and we found that creating a custom shader can be a solution for it. It was the first time for me, and also for my kid, to write code in ShaderLab language. So, I made a simple video game so as for my kid to test the shader before using it in his video game.',
    ],
    linkToItchio: 'https://y-code.itch.io/fairy-dungeon',
    links: {
      'Fairy Dungeon': 'https://y-code.itch.io/fairy-dungeon',
    }
  },
];

interface Props extends RoutingProps {}

function _VideoGameDevs(props: Props) {
  return (
    <div className={styles['video-game-devs']}>
      <h1>Video Game Developments</h1>
      <Container className={styles['video-game-devs-intro-container']}>
        <p>
          I've been enjoying Video Game Development in my spare time for recent years. I develop 3D video games by Unity game engine and create 3D models by Blender.
        </p>
        <p>
          There are several personal development projects ongoing in parallel.
        </p>
      </Container>
      {
        data.map(d =>
          <div className={styles['video-game-devs-item']}>
            <Container className="d-flex flex-column gap-2">
              <h2>
                {d.name}
              </h2>
              <div className="d-flex justify-content-center gap-2">
                {
                  d.actionTypes.map((actionType, i) =>
                    <Badge key={`badge-${d.id}-${i}`} color="primary">{actionType}</Badge>
                  )
                }
                <Badge color="info">{d.status}</Badge>
              </div>
              <Row>
                <Col md={12} lg={7} xl={6} min={560} className="d-flex justify-content-center">
                  <iframe className={styles['video-game-devs-demo-video']} src={`https://www.youtube.com/embed/${d.videoId}`}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    frameBorder="0" allowFullScreen
                  />
                </Col>
                <Col>
                  {
                    d.description.map((desc, i) =>
                      <p key={`description-${d.id}-${i}`}>
                        {injectLink([ desc ], d.links)}
                      </p>
                    )
                  }
                </Col>
              </Row>
              <div className={'d-flex justify-content-center gap-1 ' + styles['video-game-devs-play-link']}>
                {
                  d.linkToItchio
                    ? (
                      <a href={d.linkToItchio} target="_blank">
                        <img src="https://img.icons8.com/?size=100&id=KA1Qctl9ZJH8&format=png&color=000000"/>
                        play
                        <img src="https://img.icons8.com/metro/26/000000/external-link.png"/>
                      </a>
                    )
                    : null
                }
              </div>
            </Container>
          </div>
        )
      }
    </div>
  )
}

export const VideoGameDevs = (props: Props) => <_VideoGameDevs {...useRoutingHooks(props)}/>;