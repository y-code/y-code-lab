import React from 'react';
import { Badge, Col, Container, Row } from 'reactstrap';
import { useRoutingHooks, RoutingProps, useAppSelector, useAppDispatch, ProjectInfo, injectLink } from '@ycode-lab/common';
import { requestSJProjectsAsync } from 'libs/common/src/lib/store/sj-projets.feature';
import styles from './strawberry-joystick.module.scss'

interface Props extends RoutingProps {}

export function _SJProjects(props: Props) {
  const projects = useAppSelector(state => state.sjProjects.projects.data);
  const isLoadingProjects = useAppSelector(state => state.sjProjects.projects.isLoading);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(requestSJProjectsAsync());
  }, [dispatch]);

  return (
    <div className={styles['sj-projects']}>

      <h1>Game Apps</h1>

      {
        !projects ? [] : projects.map(x => generatePageSection(x))
      }
    </div>
  );
}

export const SJProjects = (props: Props) => <_SJProjects {...useRoutingHooks(props)}/>;

export function generatePageSection(item: ProjectInfo) : JSX.Element[] {
  const elements: JSX.Element[] = [];

  let cssClassPageSection = '';
  switch (item.category) {
    case 'GameApp':
      cssClassPageSection = 'sj-projects-section-game-app';
      break;
  }

  const getSublogoStyle = () => {
    switch (item.subLogo) {
      case '/assets/google-play-badge.png':
        return `${styles['sj-project-sublogo']} ${styles['google-play']}`;
      default:
        return styles['sj-project-sublogo'];
    }
  }

  elements.push(<a key={`anchor-${item.id}`} className="anchor" id={item.id}/>)
  elements.push(
    <div key={`item-${item.id}`} className={styles[cssClassPageSection]}>
      <Container>
        <h3>
          { item.logo ? [ <img key={`logo-${item.id}`} src={item.logo} className={styles['sj-project-logo']} /> ] : [] }
          {item.name}
          <a key={`sublogo-${item.id}`} href={item.subLogoLink} target="_blank">
            <img src={item.subLogo} className={getSublogoStyle()}/>
          </a>
        </h3>
        <Row>
          <Col className="d-flex gap-2">
            {
              item.languages ? item.languages.map(lang => <Badge key={lang} color="primary">{lang}</Badge>) : []
            }
            {
              item.tags ? item.tags.map(tag => <Badge key={tag} color="info">{tag}</Badge>) : []
            }
          </Col>
        </Row>
        <Row>
          <Col key={`col-${item.id}-description`} md={12} lg={(item.codeSample || item.video || item.image) ? 6 : 12}>
            {
              [
                ...(item.npmBadge ? [
                  <p key={`npm-npm-badge-${item.id}`}>
                    <a target="_blank" href={`https://badge.fury.io/js/${item.npmBadge}`}>
                      <img src={`https://badge.fury.io/js/${item.npmBadge}.svg`} alt="npm version" height="18" />
                    </a>
                  </p>
                ] : []),
                ...item.description.map((line, i) =>
                  <p key={`description-${item.id}-${i}`}>
                    {injectLink(line, item.links, item.routerLinks)}
                  </p>
                ),
              ]
            }
          </Col>
          {
            item.codeSample ? [
              <Col key={`col-${item.id}-code-sandbox`} md={12} lg={6} className={styles['sj-project-code-snippet']}>
                <pre key={`code-sample-${item.id}`}>{item.codeSample}</pre>
              </Col>
            ] : []
          }
          {
            item.codeSandbox ? [
              <Col key={`col-${item.id}-code-sandbox`} xl={12}>
                <iframe
                  src={item.codeSandbox}
                  style={{ width: "100%", height: "500px", border: "0", borderRadius: "4px", overflow: "hidden" }}
                  title="p3yjn7rpv0"
                  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
                  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
                />
              </Col>
            ] : []
          }
          {
            item.video ? [
              <Col key={`col-${item.id}-video`} md={12} lg={6} className={styles['sj-project-video']}>
                <iframe src={item.video}
                  frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Col>
            ] : []
          }
          {
            item.image ? [
              <Col key={`col-${item.id}-image`} md={12} lg={6} className={styles['sj-project-image']}>
                <img src={item.image} />
              </Col>
            ] : []
          }
        </Row>
      </Container>
    </div>
  )

  return elements
}
