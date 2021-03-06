import * as WeatherForecasts from './WeatherForecasts';
import * as Counter from './Counter';
import * as Messaging from './Messaging';
import * as CodeProjectApi from './CodeProjectApi';
import type * as MessagingType from './Messaging';
import type * as CodeProjectApiType from './CodeProjectApi';

// The top-level state object
export interface ApplicationState {
    counter: Counter.CounterState | undefined;
    weatherForecasts: WeatherForecasts.WeatherForecastsState | undefined;
    messaging: Messaging.MessagingState | undefined;
    codeProjectApi: CodeProjectApi.CodeProjectApiState | undefined;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer,
    messaging: Messaging.reducer,
    codeProjectApi: CodeProjectApi.reducer,
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}

export type KnownAction
  = MessagingType.KnownAction
  | CodeProjectApiType.KnownAction;

export type {
  Message,
  SaveMessageResult,
  ValidationErrorInfo
} from './Messaging';
