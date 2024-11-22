import * as React from 'react'
import { connect } from 'react-redux'

import './MyProjects.scss'
import { Container, Row, Col, Badge } from 'reactstrap'
import { Link } from 'react-router-dom'
import linkInjector from '../utilities/linkInjector'
import { ApplicationState } from '../store'
import { actionCreators, MyProjectsState } from '../store/MyProjects'
import { RoutingProps } from '../App'
import { NuGetInfo, ProjectInfo } from '../models/ProjectInfo'

interface Props extends RoutingProps {
  myProjects: MyProjectsState
}

interface State {
}

class MyProjects extends React.PureComponent<Props & typeof actionCreators, State> {
  constructor(props: Props & typeof actionCreators) {
    super(props)
  }
  
  public componentDidMount() {
    this.ensureDataFetched();
  }

  private ensureDataFetched() {
    (this.props as typeof actionCreators).requestProjects();
  }

  public render() {
    console.log(this.props.myProjects)

    let webAppDevNavItems: JSX.Element[] = [];
    let libDevNavItems: JSX.Element[] = [];
    let webAppDevSections: JSX.Element[] = [];
    let libDevSections: JSX.Element[] = [];

    if (this.props.myProjects && this.props.myProjects.projects && this.props.myProjects.projects.data) {
      for (let projectId in this.props.myProjects.projects.data) {
        let project = this.props.myProjects.projects.data[projectId].data
        let nuget = this.props.myProjects.projects.data[projectId].nuget.data
        switch (project.category) {
          case "WebAppDev":
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
    }

    return (
      <div className="page-my-projects">
        <div className='table-of-contents'>
          <h1>My Projects</h1>

          <ul className="h2">
            <li><a href="/my-projects#web-app-dev">Web Application Developments</a></li>
            <ul className="h3">
              {webAppDevNavItems}
            </ul>
            <li><a href="/my-projects#lib-dev">Library Developments</a></li>
            <ul className="h3">
              {libDevNavItems}
            </ul>
            <li><a href="/my-projects#video-game-dev">Video Game Developments</a></li>
            <li><a href="/my-projects#tech-writings">Technical Writings</a></li>
          </ul>
        </div>

        <a className="anchor" id="web-app-dev"/>

        <div className='page-section page-section-web-app-dev'>

          <h2>Web Application Developments</h2>

        </div>

        {webAppDevSections}

        <a className="anchor" id="lib-dev" />

        <div className='page-section page-section-lib-dev'>

          <h2>Library Developments</h2>

        </div>

        {libDevSections}

        <a className="anchor" id="video-game-dev"/>

        <div className='page-section page-section-video-game-dev'>
          <Container>
            <h2>Video Game Developments</h2>
            <p className="introduction-container">
              I've been enjoying Video Game Development in my spare time for recent years. Please see <Link to="/video-game-devs">the demo videos of my video games here</Link>.
            </p>
          </Container>
        </div>

        <a className="anchor" id="tech-writings"/>

        <div className='page-section page-section-tech-writings'>
          <Container>
            <h2>Technical Writings</h2>
            <p className="introduction-container">
              I sometimes write articles when I discover something during my software developments. Please have a look at <Link to="/tech-writings">the list of my articles here</Link>.
            </p>
          </Container>
        </div>
      </div>
    );
  }
}

export function generateNavItem(project: ProjectInfo, nuget: NuGetInfo, baseUrl: string = "") : JSX.Element {
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
          project.nugetPackage ? [ <img key={`nav-nuget-badge-${project.id}`} src={`https://img.shields.io/badge/NuGet-${escapeInVersion(nuget.versions[nuget.versions.length - 1])}-blue?style=plastic&logo=nuget`} alt="npm version" style={{ margin: 10, height: 18 }} /> ] : []
        }
      </a>
    </li>
  )
}

function escapeInVersion(version: string) : string {
  if (!version)
    return version
    
  let result = version.replace("-", "--")
  return result
}

export function generatePageSection(item: ProjectInfo, nuget: NuGetInfo) : JSX.Element[] {
  let elements: JSX.Element[] = [];

  let cssClassPageSection = "";
  switch (item.category) {
    case "WebAppDev":
      cssClassPageSection = "page-section-web-app-dev"
      break
    case "LibDev":
      cssClassPageSection = "page-section-lib-dev"
      break
      case "GameApp":
        cssClassPageSection = "page-section-video-game"
        break
    }

    const getSublogoStyle = () => { switch (item.subLogo) {
    case '/google-play-badge.png':
      return { width: "160px", marginLeft: "10px" };
    default:
      return { width: "26px", marginLeft: "10px" };
  }}

  elements.push(<a key={`anchor-${item.id}`} className="anchor" id={item.id}/>)
  elements.push(
    <div key={`item-${item.id}`} className={`page-section ${cssClassPageSection}`}>
      <Container>
        <h3>
          { item.logo ? [ <img key={`logo-${item.id}`} src={item.logo} style={{ margin: 10, height: 32 }} /> ] : [] }
          {item.name}
          <a key={`sublogo-${item.id}`} href={item.subLogoLink} target="_blank">
            <img src={item.subLogo} style={getSublogoStyle()}/>
          </a>
        </h3>
        <Row>
          <Col>
            {
              item.languages ? item.languages.map(lang => <Badge key={lang} color="primary">{lang}</Badge>) : []
            }
            {
              item.tags ? item.tags.map(tag => <Badge key={tag} color="info">{tag}</Badge>) : []
            }
          </Col>
        </Row>
        <Row>
          <Col key={`col-${item.id}-description`} lg={12} xl={(item.video || item.image) ? 6 : 12}>
            {
              [
                ...(item.npmBadge ? [
                  <p key={`npm-npm-badge-${item.id}`}>
                    <a target="_blank" href={`https://badge.fury.io/js/${item.npmBadge}`}>
                      <img src={`https://badge.fury.io/js/${item.npmBadge}.svg`} alt="npm version" height="18" />
                    </a>
                  </p>
                ] : []),
                ...(item.nugetPackage ? [
                  <p key={`npm-nuget-badge-${item.id}`}>
                    <a target="_blank" href={`https://www.nuget.org/packages/${item.nugetPackage}/`}>
                      <img src={`https://img.shields.io/badge/NuGet-${escapeInVersion(item.nugetPackage)}%20${escapeInVersion(nuget.versions[nuget.versions.length - 1])}-blue?style=plastic&logo=nuget`} alt="npm version" height="18" />
                    </a>
                  </p>
                ] : []),
                ...item.description.map((line, i) =>
                  <p key={`description-${item.id}-${i}`}>
                    {linkInjector.inject(line, item.links, item.routerLinks)}
                  </p>
                ),
                ...(item.codeSample ? [
                  <pre key={`code-sample-${item.id}`}>
                    {item.codeSample}
                  </pre>
                ] : []),
                ...(item.codeSandbox ? [
                  <p key={`code-sandbox-${item.id}`}>
                    <iframe
                      src={item.codeSandbox}
                      style={{ width: "100%", height: "500px", border: "0", borderRadius: "4px", overflow: "hidden" }}
                      title="p3yjn7rpv0"
                      allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
                      sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
                    />
                  </p>
                ] : []),
              ]
            }
          </Col>
          {
            item.video ? [
              <Col key={`col-${item.id}-video`} lg={12} xl={6} className="col-center">
                <iframe className="youtube-video" src={item.video}
                  frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Col>
            ] : []
          }
          {
            item.image ? [
              <Col key={`col-${item.id}-image`} lg={12} xl={6} className="col-center">
                <div>
                  <img className="image" src={item.image} />
                </div>
              </Col>
            ] : []
          }
        </Row>
      </Container>
    </div>
  )

  return elements
}

export default connect(
  (state: ApplicationState) => ({ myProjects: state.myProjects }),
  actionCreators
)(MyProjects as any);
