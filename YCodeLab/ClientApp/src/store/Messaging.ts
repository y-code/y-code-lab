import { createAction, Action, ActionFunction1, handleActions, ReducerMap, Reducer } from 'redux-actions';
import { AppThunkAction } from '.';

export interface MessagingState {
  saveMessage: SaveMessageState;
}

export interface SaveMessageState {
  isLoading: boolean;
  result: SaveMessageResult;
}

export interface Message {
  senderName: string;
  senderEmail: string;
  content: string;
}

export interface ValidationErrorInfo {
  errors: Array<{ errorMessage: string }>;
}

export interface SaveMessageResult {
  status: ApiResultStatus;
  message: string;
  errors: {
    senderName: ValidationErrorInfo,
    senderEmail: ValidationErrorInfo,
    content: ValidationErrorInfo,
  };
}

export type ApiResultStatus = "Success" | "Failure";

const ACTION_MESSAGING_REQUEST_SAVE_MESSAGE = "[Messaging] Request save message";
const ACTION_MESSAGING_RECEIVE_SAVE_MESSAGE_RESULT = "[Messaging] Receive save message result";

export const actions = {
  requestSaveMessage: createAction(ACTION_MESSAGING_REQUEST_SAVE_MESSAGE, (data: Message) => data),
  receiveSaveMessageResult: createAction(ACTION_MESSAGING_RECEIVE_SAVE_MESSAGE_RESULT, (data: SaveMessageResult) => data),
};

type extractAction<Type> = Type extends ActionFunction1<infer X, infer Y> ? Y : never;

export type KnownAction
  = extractAction<typeof actions.requestSaveMessage>
  | extractAction<typeof actions.receiveSaveMessageResult>;

export const actionCreators = {
  requestSaveMessage: (data: Message, submit: boolean): AppThunkAction<KnownAction> => (dispatch, getState) => {
    var state = getState();
    fetch(`/api/Messaging/Messages${submit ? '?submit=true' : ''}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(response => {
        response.json().then(data => {
          let result = data as SaveMessageResult;
          dispatch(actions.receiveSaveMessageResult(result));
        })
      })
    dispatch(actions.requestSaveMessage(data));
  },
}

const reducerMap: ReducerMap<MessagingState, Message & SaveMessageResult> = {};
reducerMap[ACTION_MESSAGING_REQUEST_SAVE_MESSAGE] = ((state, action) => ({
  saveMessage: {
    isLoading: true,
  },
})) as Reducer<MessagingState, Message>
reducerMap[ACTION_MESSAGING_RECEIVE_SAVE_MESSAGE_RESULT] = ((state, action) => ({
  saveMessage: {
    isLoading: false,
    result: action.payload
  },
})) as Reducer<MessagingState, SaveMessageResult>

export const reducer = handleActions<MessagingState, Message & SaveMessageResult>(
  reducerMap,
  {
    saveMessage: {
      isLoading: false,
    }
  } as MessagingState
);
