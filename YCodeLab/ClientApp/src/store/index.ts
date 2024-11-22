import * as WeatherForecasts from './WeatherForecasts'
import * as Counter from './Counter'
import * as Messaging from './Messaging'
import * as CodeProjectApi from './CodeProjectApi'
import * as MyProjects from './MyProjects'
import * as SJProjects from './SJProjects'
import type * as MessagingType from './Messaging'
import type * as CodeProjectApiType from './CodeProjectApi'
import type * as MyProjectsType from './MyProjects'
import type * as SJProjectsType from './SJProjects'

// The top-level state object
export interface ApplicationState {
    counter: Counter.CounterState | undefined,
    weatherForecasts: WeatherForecasts.WeatherForecastsState | undefined,
    messaging: Messaging.MessagingState | undefined,
    codeProjectApi: CodeProjectApi.CodeProjectApiState | undefined,
    myProjects: MyProjects.MyProjectsState | undefined,
    sjProjects?: SJProjects.SJProjectsState,
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer,
    messaging: Messaging.reducer,
    codeProjectApi: CodeProjectApi.reducer,
    myProjects: MyProjects.reducer,
    sjProjects: SJProjects.reducer,
}

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void,
}

export type KnownAction
  = MessagingType.KnownAction
  | CodeProjectApiType.KnownAction
  | MyProjectsType.KnownAction
  | SJProjectsType.KnownAction

export type {
  Message,
  SaveMessageResult,
  ValidationErrorInfo,
} from './Messaging'
