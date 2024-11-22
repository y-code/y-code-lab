import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NuGetInfo, ProjectInfo } from "../model/my-projects.model";

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
];

interface NuGetInfoState {
  isLoading: boolean,
  data?: NuGetInfo,
}

interface ProjectState {
  data: ProjectInfo,
  nugetInfo: NuGetInfoState,
}

interface ProjectsState {
  isLoading: boolean,
  data?: Record<string, ProjectState>,
}

export interface SJProjectsState {
  projects: ProjectsState,
}

export const initialState: SJProjectsState = {
  projects: {
    isLoading: false,
  },
} as const;

export const requestProjectsAsync = createAsyncThunk(
  'SJProjects/requestProjectsAsync',
  async ({}: {}, { dispatch }) => {
    for (const project of data) {
      if (project.nugetPackage)
        // intentionally not awaiting
        dispatch(requestNuGetInfoAsync({id: project.id, nugetPackage: project.nugetPackage}));
    }
    return {data};
  }
);

export const requestNuGetInfoAsync = createAsyncThunk(
  'SJProjects/requestNuGetInfoAsync',
  async ({ id, nugetPackage }: {id: string, nugetPackage: string}, { dispatch }) => {
    const response = await fetch(`https://api.nuget.org/v3-flatcontainer/${nugetPackage}/index.json`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const data: NuGetInfo = await response.json();
    return {data};
  }
)

const sjProjectsSlice = createSlice({
  name: 'sj-projects',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(requestProjectsAsync.pending, state => {
      state.projects = {
        isLoading: true,
      };
    })
    .addCase(requestProjectsAsync.fulfilled, (state, action) => {
      state.projects = {
        ...state.projects,
        isLoading: false,
      };
      state.projects.data = {...state.projects.data};
      for (const project of action.payload.data) {
        state.projects.data[project.id] = {
          ...state.projects.data[project.id],
          data: project,
        };
      }
    })
    .addCase(requestNuGetInfoAsync.pending, (state, action) => {
      state.projects.data = {...state.projects.data};
      state.projects.data[action.meta.arg.id] = {
        ...state.projects.data[action.meta.arg.id],
        nugetInfo: {
          isLoading: true,
        },
      };
    })
    .addCase(requestNuGetInfoAsync.fulfilled, (state, action) => {
      state.projects.data = {...state.projects.data};
      state.projects.data[action.meta.arg.id].nugetInfo = {
        ...state.projects.data[action.meta.arg.id].nugetInfo,
        isLoading: false,
        data: action.payload.data,
      };
    }),
});

export default sjProjectsSlice;
export const { actions } = sjProjectsSlice;
