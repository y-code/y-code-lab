import React from 'react';
import { injectLink, requestVideoGameDevsAsync, RoutingProps, useAppDispatch, useAppSelector, useRoutingHooks, VideoGameDevItem } from '@ycode-lab/common';
import { Badge, Col, Container, Row } from 'reactstrap';
import styles from './app.module.scss';

interface Props extends RoutingProps {}

function _VideoGameDevs(props: Props) {
  const data = useAppSelector(state => state.videoGameDevs.videoGameDevs.data);
  const isLoading = useAppSelector(state => state.videoGameDevs.videoGameDevs.isLoading);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(requestVideoGameDevsAsync());
  }, [dispatch]);

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
        !data ? [] : data.map(d =>
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
