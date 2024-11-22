import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProjectInfo } from '../model/my-projects.model';

const data: ProjectInfo[] = [
  {
    id: "power-maniac",
    name: "Power Maniac",
    category: "GameApp",
    logo: "/assets/icon-power-maniac.png",
    logoAlt: "logo image",
    subLogo: "/assets/google-play-badge.png",
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
    image: "/assets/power-maniac-play.png",
  },
];

interface ProjectsState {
  isLoading: boolean,
  data?: ProjectInfo[],
}

export interface SJProjectsState {
  projects: ProjectsState,
}

export const initialState: SJProjectsState = {
  projects: {
    isLoading: false,
  },
} as const;

export const requestSJProjectsAsync = createAsyncThunk(
  'SJProjects/requestSJProjectsAsync',
  async () => ({data})
);

const sjProjectsSlice = createSlice({
  name: 'sj-projects',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(requestSJProjectsAsync.pending, state => {
      state.projects = {
        isLoading: true,
      };
    })
    .addCase(requestSJProjectsAsync.fulfilled, (state, action) => {
      state.projects = {
        ...state.projects,
        isLoading: false,
        data: action.payload.data,
      };
    }),
});

export default sjProjectsSlice;
export const { actions } = sjProjectsSlice;
