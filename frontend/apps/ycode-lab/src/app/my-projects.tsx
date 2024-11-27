import React from 'react';
import { injectLink, NuGetInfo, ProjectInfo, requestProjectsAsync, RoutingProps, useAppDispatch, useAppSelector, useRoutingHooks } from '@ycode-lab/common';
import { Badge, Col, Container, Row } from 'reactstrap';
import styles from './app.module.scss';

interface Props extends RoutingProps {}

function _MyProjects(props: Props) {
  const projects = useAppSelector(state => state.myProjects.projects.data);
  const isLoadingProjects = useAppSelector(state => state.myProjects.projects.isLoading);
  const dispatch = useAppDispatch();

  let webAppDevNavItems: JSX.Element[] = [];
  let libDevNavItems: JSX.Element[] = [];
  let webAppDevSections: JSX.Element[] = [];
  let libDevSections: JSX.Element[] = [];

  React.useEffect(() => {
    dispatch(requestProjectsAsync({}));
  }, [dispatch]);

  if (projects)
    for (const projectId in projects) {
      if (!projects[projectId].data)
        continue;
      const project = projects[projectId].data
      const nuget = projects[projectId].nugetInfo?.data
      switch (project.category) {
        case "AppDev":
          webAppDevNavItems = [
            ...webAppDevNavItems,
            generateNavItem(project, nuget, "/my-projects"),
          ]
          webAppDevSections = [
            ...webAppDevSections,
            ...generatePageSection(project, nuget),
          ]
          break
        case "LibDev":
          libDevNavItems = [
            ...libDevNavItems,
            generateNavItem(project, nuget, "/my-projects"),
          ]
          libDevSections = [
            ...libDevSections,
            ...generatePageSection(project, nuget),
          ]
          break
      }
    }

  return (
    <div className={styles['my-projects']}>

      <h1>My Projects</h1>

      <Container className={styles['my-projects']}>
        <ul>
          <li><a href="/my-projects#web-app-dev">Application Developments</a></li>
          <ul>
            {webAppDevNavItems}
          </ul>
          <li><a href="/my-projects#lib-dev">Library Developments</a></li>
          <ul>
            {libDevNavItems}
          </ul>
        </ul>
      </Container>

      <a className="anchor" id="web-app-dev"/>

      <div className={styles['my-projects-section']}>
        <h2>Web Application Developments</h2>
      </div>

      {webAppDevSections}

      <a className="anchor" id="lib-dev" />

      <div className={styles['my-projects-section']}>
        <h2>Library Developments</h2>
      </div>

      {libDevSections}
    </div>
  );
}

export const MyProjects = (props: Props) => <_MyProjects {...useRoutingHooks(props)}/>;

function generateNavItem(project: ProjectInfo, nuget?: NuGetInfo, baseUrl = "") : JSX.Element {
  return (
    <li key={`nav-item-${project.id}`}>
      <a href={`${baseUrl}#${project.id}`}>
        {
          project.logo ? [ <img key={`nav-logo-${project.id}`} src={project.logo} alt={project.logoAlt} style={{ margin: 10, height: 18 }}/> ] : []
        }
        {project.name}
        {
          project.npmBadge ? [ <img key={`nav-npm-badge-${project.id}`} src={`https://badge.fury.io/js/${project.npmBadge}.svg`} alt="npm version" style={{ margin: 10, height: 18 }} /> ] : []
        }
        {
          (project.nugetPackage && nuget) ? [ <img key={`nav-nuget-badge-${project.id}`} src={`https://img.shields.io/badge/NuGet-${escapeInVersion(nuget.versions[nuget.versions.length - 1])}-blue?style=plastic&logo=nuget`} alt="npm version" style={{ margin: 10, height: 18 }} /> ] : []
        }
      </a>
    </li>
  )
}

function escapeInVersion(version: string) : string {
  if (!version)
    return version
    
  const result = version.replace("-", "--")
  return result
}

export function generatePageSection(item: ProjectInfo, nuget?: NuGetInfo) : JSX.Element[] {
  const elements: JSX.Element[] = [];

  let cssClassPageSection = '';
  switch (item.category) {
    case 'AppDev':
      cssClassPageSection = 'my-projects-section-web-app-dev';
      break;
    case 'LibDev':
      cssClassPageSection = 'my-projects-section-lib-dev';
      break;
    case 'GameApp':
      cssClassPageSection = 'my-projects-section-video-game';
      break;
  };

  const getSublogoStyle = () => {
    switch (item.subLogo) {
      case '/assets/google-play-badge.png':
        return `${styles['my-project-sublogo']} ${styles['google-play']}`;
      default:
        return styles['my-project-sublogo'];
    }
  };

  elements.push(<a key={`anchor-${item.id}`} className="anchor" id={item.id}/>)
  elements.push(
    <div key={`item-${item.id}`} className={styles[cssClassPageSection]}>
      <Container>
        <h3>
          { item.logo ? [ <img key={`logo-${item.id}`} src={item.logo} className={styles['my-project-logo']} /> ] : [] }
          {item.name}
          <a key={`sublogo-${item.id}`} href={item.subLogoLink} target="_blank">
            <img src={item.subLogo} className={getSublogoStyle()}/>
          </a>
        </h3>
        <Row>
          <Col className="d-flex gap-2 flex-wrap">
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
                ...((item.nugetPackage && nuget) ? [
                  <p key={`npm-nuget-badge-${item.id}`}>
                    <a target="_blank" href={`https://www.nuget.org/packages/${item.nugetPackage}/`}>
                      <img src={`https://img.shields.io/badge/NuGet-${escapeInVersion(item.nugetPackage)}%20${escapeInVersion(nuget.versions[nuget.versions.length - 1])}-blue?style=plastic&logo=nuget`} alt="npm version" height="18" />
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
              <Col key={`col-${item.id}-code-sandbox`} md={12} lg={6} className={styles['my-project-code-snippet']}>
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
              <Col key={`col-${item.id}-video`} md={12} lg={6} className={styles['my-project-video']}>
                <iframe src={item.video}
                  frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Col>
            ] : []
          }
          {
            item.image ? [
              <Col key={`col-${item.id}-image`} md={12} lg={6} className={styles['my-project-image']}>
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
