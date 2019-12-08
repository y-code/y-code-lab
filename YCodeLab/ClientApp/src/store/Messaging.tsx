import { Reducer } from 'redux';
import { createAction, Action, ActionFunction1, handleActions } from 'redux-actions';
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

const createRequestSaveMessageAction = createAction('[Messaging] Request save message', (data: Message) => data);
const createReceiveSaveMessageResultAction = createAction('[Messaging] Receive save message result', (data: SaveMessageResult) => data);

type extractAction<Type> = Type extends ActionFunction1<infer X, infer Y> ? Y : never;

type KnownAction
  = extractAction<typeof createRequestSaveMessageAction>
  | extractAction<typeof createReceiveSaveMessageResultAction>;

export const actionCreators = {
  requestSaveMessage: (data: Message, isValidationOnly: boolean = false): AppThunkAction<KnownAction> => (dispatch, getState) => {
    var state = getState();
    fetch(`/api/Messaging/Messages${isValidationOnly ? '?onlyValidation=true' : ''}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(response => {
        response.json().then(data => {
          let result = data as SaveMessageResult;
          dispatch(createReceiveSaveMessageResultAction(result));
        })
      })
    dispatch(createRequestSaveMessageAction(data));
  },
}

export const reducer = handleActions<MessagingState, Message | SaveMessageResult>(
  {
    '[Messaging] Request save message': ((state, action) => ({
      saveMessage: {
        isLoading: true,
      },
    })) as Reducer<MessagingState, any>,
    '[Messaging] Receive save message result': ((state, action) => ({
      saveMessage: {
        isLoading: false,
        result: action.payload
      },
    })) as Reducer<MessagingState, any>
  },
  {
    saveMessage: {
      isLoading: false,
    }
  } as MessagingState
);
