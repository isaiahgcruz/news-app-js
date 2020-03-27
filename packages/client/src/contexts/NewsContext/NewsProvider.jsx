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
  source: {
    id: null,
    data: [],
    page: 1,
    isFetching: false,
    error: null,
  },
};

const NOW = new Date().toISOString().slice(0, -5).replace(/T/, ' ');

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

  const fetchSource = useCallback(
    (id, page = 1) => {
      dispatch({ type: 'FETCH_SOURCE', payload: { page, id } });

      setTimeout(() => {
        const data = Array.from({ length: 10 }, (_, index) => ({
          id: index,
          title: `Article ${index + 1}`,
          date: NOW,
          image:
            index % 2 === 0
              ? 'https://techcrunch.com/wp-content/uploads/2019/04/bitcoin-bitfinex.jpg?w=750'
              : null,
          description:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque odit a aut similique placeat perspiciatis adipisci ducimus distinctio, pariatur quos suscipit, numquam sed animi expedita in accusamus ad beatae dolor.',
        }));

        dispatch({ type: 'FETCH_SOURCE_FULFILLED', payload: data });
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
      fetchSource,
    },
  };

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
};

NewsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NewsProvider;
