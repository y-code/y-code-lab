import { Reducer } from 'redux';
import { createAction, ActionFunction1, handleAction, handleActions } from 'redux-actions';
import { AppThunkAction } from '.';

export interface CodeProjectArticle {
    id: string;
    title: string;
    summary: string;
    rating: number;
    votes: string;
    link: string;
    views: string;
    downloads: string;
    bookmarked: string;
    createdDate: string;
    modifiedDate: string;
}

export interface CodeProjectBlogPost {
    id: string;
    title: string;
    summary: string;
    rating: number;
    votes: string;
    link: string;
    views: string;
    downloads: string;
    bookmarked: string;
    createdDate: string;
    modifiedDate: string;
}

export interface CodeProjectTip {
    id: string;
    title: string;
    summary: string;
    rating: number;
    votes: string;
    link: string;
    views: string;
    downloads: string;
    bookmarked: string;
    createdDate: string;
    modifiedDate: string;
}

export interface CodeProjectApiState {
    myArticles: MyArticlesState;
    myBlogPosts: MyBlogPostsState;
    myTips: MyTipsState;
}

export interface MyArticlesState {
    isLoading: boolean;
    result: CodeProjectArticle[];
}

export interface MyBlogPostsState {
    isLoading: boolean;
    result: CodeProjectBlogPost[];
}

export interface MyTipsState {
    isLoading: boolean;
    result: CodeProjectTip[];
}

const createRequestGetMyArticlesAction = createAction('[CodeProjectApi] Request Code Project Articles data.');
const createReceiveGetMyArticlesResultAction = createAction('[CodeProjectApi] Receive Code Project Articles data.', (data: CodeProjectArticle[]) => data);
const createRequestGetMyBlogPostsAction = createAction('[CodeProjectApi] Request Code Project Blog Posts data.');
const createReceiveGetMyBlogPostsResultAction = createAction('[CodeProjectApi] Receive Code Project Blog Posts data.', (data: CodeProjectBlogPost[]) => data);
const createRequestGetMyTipsAction = createAction('[CodeProjectApi] Request Code Project Tips data.');
const createReceiveGetMyTipsResultAction = createAction('[CodeProjectApi] Receive Code Project Tips data.', (data: CodeProjectTip[]) => data);

type ExtractAction<Type> = Type extends ActionFunction1<infer XMLDocument, infer Y> ? Y : never;

export type KnownAction
  = ExtractAction<typeof createRequestGetMyArticlesAction>
  | ExtractAction<typeof createReceiveGetMyArticlesResultAction>
  | ExtractAction<typeof createRequestGetMyBlogPostsAction>
  | ExtractAction<typeof createReceiveGetMyBlogPostsResultAction>
  | ExtractAction<typeof createRequestGetMyTipsAction>
  | ExtractAction<typeof createReceiveGetMyTipsResultAction>;

export const actionCreators = {
    requestGetMyArticles: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        var state = getState();
        fetch(`/api/CodeProjectApi/GetMyArticles`, {　method: 'GET' })
            .then(response => {
                response.json().then(data => {
                    let result = data as CodeProjectArticle[];
                    dispatch(createReceiveGetMyArticlesResultAction(result));
                })
            });
        dispatch(createRequestGetMyArticlesAction());
    },
    requestGetMyBlogPosts: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        var state = getState();
        fetch(`/api/CodeProjectApi/GetMyBlogPosts`, {　method: 'GET' })
            .then(response => {
                response.json().then(data => {
                    let result = data as CodeProjectBlogPost[];
                    dispatch(createReceiveGetMyBlogPostsResultAction(result));
                })
            });
        dispatch(createRequestGetMyBlogPostsAction());
    },
    requestGetMyTips: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        var state = getState();
        fetch(`/api/CodeProjectApi/GetMyTips`, {　method: 'GET' })
            .then(response => {
                response.json().then(data => {
                    let result = data as CodeProjectTip[];
                    dispatch(createReceiveGetMyTipsResultAction(result));
                })
            });
        dispatch(createRequestGetMyTipsAction());
    },
}

export const reducer = handleActions<CodeProjectApiState, CodeProjectArticle[]> (
    {
        '[CodeProjectApi] Request Code Project Articles data.': ((state, action) => ({
            ...state,
            myArticles: {
                isLoading: true,
            },
        })) as Reducer<CodeProjectApiState, any>,
        '[CodeProjectApi] Receive Code Project Articles data.': ((state, action) => ({
            ...state,
            myArticles: {
                isLoading: false,
                result: action.payload
            },
        })) as Reducer<CodeProjectApiState, any>,
        '[CodeProjectApi] Request Code Project Blog Posts data.': ((state, action) => ({
            ...state,
            myBlogPosts: {
                isLoading: true,
            },
        })) as Reducer<CodeProjectApiState, any>,
        '[CodeProjectApi] Receive Code Project Blog Posts data.': ((state, action) => ({
            ...state,
            myBlogPosts: {
                isLoading: false,
                result: action.payload
            },
        })) as Reducer<CodeProjectApiState, any>,
        '[CodeProjectApi] Request Code Project Tips data.': ((state, action) => ({
            ...state,
            myTips: {
                isLoading: true,
            },
        })) as Reducer<CodeProjectApiState, any>,
        '[CodeProjectApi] Receive Code Project Tips data.': ((state, action) => ({
            ...state,
            myTips: {
                isLoading: false,
                result: action.payload
            },
        })) as Reducer<CodeProjectApiState, any>,
    },
    {
        myArticles: {
            isLoading: false,
        },
        myBlogPosts: {
            isLoading: false,
        },
        myTips: {
            isLoading: false,
        },
    } as CodeProjectApiState
);
