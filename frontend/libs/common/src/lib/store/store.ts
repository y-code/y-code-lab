// store.ts
import { configureStore } from '@reduxjs/toolkit';
import myProjects from './my-projets.feature';
import techWriting from './tech-writing.feature';
import sjProjects from './sj-projets.feature';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    myProjects: myProjects.reducer,
    techWriting: techWriting.reducer,
    sjProjects: sjProjects.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export {
  requestProjectsAsync,
  requestNuGetInfoAsync
} from './my-projets.feature';
export {
  requestTechWritingsAsync,
} from './tech-writing.feature';
export {
  requestSJProjectsAsync,
} from './sj-projets.feature';
