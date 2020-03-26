import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { NewsContext } from './useNewsContext';
import useNewsReducer from './useNewsReducer';

const initialState = {
  sources: {
    data: [],
    page: 1,
    isFetching: false,
    error: null,
  },
};

const NewsProvider = ({ children }) => {
  const [state, dispatch] = useNewsReducer(initialState);

  const fetchSources = useCallback(
    (page = 1) => {
      dispatch({ type: 'FETCH_SOURCES', payload: page });

      setTimeout(() => {
        const sources = Array.from({ length: 100 }, (_, index) => ({
          id: index,
          name: `News Source ${index + 1}`,
        }));
        dispatch({ type: 'FETCH_SOURCES_FULFILLED', payload: sources });
      }, 1000);
    },
    [dispatch],
  );

  useEffect(() => {
    fetchSources();
  }, [fetchSources]);

  const value = {
    state,
    actions: {
      fetchSources,
    },
  };

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
};

NewsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NewsProvider;
