import { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SOURCES':
      return {
        ...state,
        sources: {
          ...state.sources,
          error: null,
          page: action.payload,
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
    default:
      return state;
  }
};

const useNewsReducer = (initialState) => {
  return useReducer(reducer, initialState);
};

export default useNewsReducer;
