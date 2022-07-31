import { createAction, Action, ActionFunction1, handleActions, ReducerMap, Reducer } from 'redux-actions';
import { AppThunkAction } from '.';
import { NuGetInfo, ProjectInfo } from '../models/ProjectInfo';

const data: ProjectInfo[] = [
  {
    id: "power-maniac",
    name: "Power Maniac",
    category: "GameApp",
    logo: "/icon-power-maniac.png",
    logoAlt: "logo image",
    subLogo: "/google-play-badge.png",
    subLogoLink: "https://play.google.com/store/games",
    languages: [ ".NET C#" ],
    tags: [ "2D", "Shooter" ],
    description: [
      "Indie 2D shooter game with super power based combat",
    ],
    links: {
    },
    routerLinks: {
    },
    image: "/power-maniac-play.png",
  },
]

export interface SJProjectsState {
  projects: ProjectsState,
}

interface ProjectsState {
  isLoading: boolean,
  data: ProjectMap,
  nugetInfo: NuGetInfoState,
}

export interface ProjectMap {
  [key: string]: Project,
}

export interface Project {
  data: ProjectInfo,
  nuget: NuGetInfoState,
}

interface NuGetInfoState {
  isLoading: boolean,
  data: NuGetInfo,
}

const ACTION_SJ_PROJECTS_REQUEST_PROJECTS = "[SJProjects] Request projects";
const ACTION_SJ_PROJECTS_RECEIVE_PROJECTS = "[SJProjects] Receive projects";
const ACTION_SJ_PROJECTS_REQUEST_NUGET_INFO = "[SJProjects] Request NuGet info";
const ACTION_SJ_PROJECTS_RECEIVE_NUGET_INFO = "[SJProjects] Receive NuGet info";

export const actions = {
  requestProjects: createAction(ACTION_SJ_PROJECTS_REQUEST_PROJECTS, () => ({ })),
  receiveProjects: createAction(ACTION_SJ_PROJECTS_RECEIVE_PROJECTS, (data: ProjectInfo[]) => data),
  requestNuGetInfo: createAction(ACTION_SJ_PROJECTS_REQUEST_NUGET_INFO, (id: string) => ({ id })),
  receiveNuGetInfo: createAction(ACTION_SJ_PROJECTS_RECEIVE_NUGET_INFO, (id: string, data: NuGetInfo) => ({ id, data })),
};

type extractAction<Type> = Type extends ActionFunction1<infer X, infer Y> ? Y : never;

export type KnownAction
  = extractAction<typeof actions.requestProjects>
  | extractAction<typeof actions.receiveProjects>;

export const actionCreators = {
  requestProjects: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
    var state = getState();

    dispatch(actions.requestProjects());

    (async () => {
      dispatch(actions.receiveProjects(data));

      for (let project of data) {
        dispatch(actions.requestNuGetInfo(project.id));

        if (project.nugetPackage) {
          fetch(`https://api.nuget.org/v3-flatcontainer/${project.nugetPackage}/index.json`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          })
            .then(response => {
              response.json().then(data => {
                let result = data as NuGetInfo;
                dispatch(actions.receiveNuGetInfo(project.id, result));
              })
            })
        }
      }
    })()
  },
}

const reducerMap: ReducerMap<SJProjectsState, ProjectInfo[] & { id: string, data: NuGetInfo}> = {};
reducerMap[ACTION_SJ_PROJECTS_REQUEST_PROJECTS] = ((state, action) => ({
  projects: {
    isLoading: true,
    data: {},
  },
})) as Reducer<SJProjectsState, { }>
reducerMap[ACTION_SJ_PROJECTS_RECEIVE_PROJECTS] = ((state, action) => {
  let newState = {
    projects: {
      isLoading: false,
      data: {},
    } as ProjectsState,
  }
  for (let project of action.payload) {
    newState.projects.data[project.id] = {
      data: project,
      nuget: {
        isLoading: false,
        data: {
          versions: []
        }
      },
    }
  }
  return newState
}) as Reducer<SJProjectsState, ProjectInfo[]>
reducerMap[ACTION_SJ_PROJECTS_REQUEST_NUGET_INFO] = ((state, action) => {
  let newState = { projects: { ...state.projects } }
  newState.projects.data[action.payload.id] = {
    ...newState.projects.data[action.payload.id],
    nuget: {
      isLoading: false,
      data: {
        versions: []
      }
    },
  }
  return newState
}) as Reducer<SJProjectsState, { id: string }>
reducerMap[ACTION_SJ_PROJECTS_RECEIVE_NUGET_INFO] = ((state, action) => {
  let newState = { projects: { ...state.projects } }
  newState.projects.data[action.payload.id] = {
    ...newState.projects.data[action.payload.id],
    nuget: {
      isLoading: false,
      data: action.payload.data
    },
  }
  return newState
}) as Reducer<SJProjectsState, { id: string, data: NuGetInfo }>

export const reducer = handleActions<SJProjectsState, ProjectInfo[] &  { id: string, data: NuGetInfo}>(
  reducerMap,
  {
    projects: {
      isLoading: false,
      data: {
      }
    }
  } as SJProjectsState
);
