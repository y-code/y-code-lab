import * as React from 'react'
import { connect } from 'react-redux'

import './SJProjects.scss'
import { ApplicationState } from '../../store'
import { actionCreators, SJProjectsState } from '../../store/SJProjects'
import { RoutingProps } from '../../App'
import { generateNavItem, generatePageSection } from '../MyProjects'

interface Props extends RoutingProps {
  projects: SJProjectsState
}

interface State {
}

class SJProjects extends React.PureComponent<Props & typeof actionCreators, State> {
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
    console.log(this.props.projects)

    let videoGameNavItems: JSX.Element[] = [];
    let videoGameSections: JSX.Element[] = [];

    if (this.props.projects && this.props.projects.projects && this.props.projects.projects.data) {
      for (let projectId in this.props.projects.projects.data) {
        let project = this.props.projects.projects.data[projectId].data
        let nuget = this.props.projects.projects.data[projectId].nuget.data
        switch (project.category) {
          case "GameApp":
            videoGameNavItems = [
              ...videoGameNavItems,
              generateNavItem(project, nuget, "/strawberry-joystick/projects"),
            ]
            videoGameSections = [
              ...videoGameSections,
              ...generatePageSection(project, nuget),
            ]
            break
        }
      }
    }

    return (
      <div className="page-sj-projects">
        <div className='table-of-contents'>
          <h1>Game Apps</h1>

          <ul className="h2">
            {/* <li><a href="#web-app-dev">Game Apps</a></li> */}
            <ul className="h3">
              {videoGameNavItems}
            </ul>
          </ul>
        </div>

        <a className="anchor" id="game-app-dev"/>

        <div className='page-section page-section-game-apps'>

          {/* <h2>Game Apps</h2> */}

          {videoGameSections}

        </div>
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => ({ projects: state.sjProjects }),
  actionCreators
)(SJProjects as any);
