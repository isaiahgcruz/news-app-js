import { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SOURCES':
      return {
        ...state,
        sources: {
          ...state.sources,
          error: null,
          isFetching: true,
        },
      };
    case 'FETCH_SOURCES_FULFILLED':
      return {
        ...state,
        sources: {
          ...state.sources,
          error: null,
          data: action.payload,
          isFetching: false,
        },
      };
    case 'FETCH_SOURCES_REJECTED':
      return {
        ...state,
        sources: {
          ...state.sources,
          error: action.payload.error,
          data: [],
          isFetching: false,
        },
      };
    case 'FETCH_SOURCE':
      return {
        ...state,
        source: {
          ...state.source,
          error: null,
          id: action.payload.id,
          page: action.payload.page,
          isFetching: true,
        },
      };
    case 'FETCH_SOURCE_FULFILLED':
      return {
        ...state,
        source: {
          ...state.source,
          error: null,
          data: action.payload,
          isFetching: false,
        },
      };
    case 'FETCH_SOURCE_REJECTED':
      return {
        ...state,
        source: {
          ...state.source,
          error: action.payload.error,
          data: [],
          isFetching: false,
        },
      };
    default:
      return state;
  }
};

const useNewsReducer = (initialState) => {
  return useReducer(reducer, initialState);
};

export default useNewsReducer;
