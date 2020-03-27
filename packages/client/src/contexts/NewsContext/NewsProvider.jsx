import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { NewsContext } from './useNewsContext';
import useNewsReducer from './useNewsReducer';
import api from '../../utils/api';

const initialState = {
  sources: {
    data: [],
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

  const fetchSources = useCallback(async () => {
    dispatch({ type: 'FETCH_SOURCES' });

    try {
      const { data } = await api.get('/sources');

      dispatch({ type: 'FETCH_SOURCES_FULFILLED', payload: data.sources });
    } catch (e) {
      dispatch({ type: 'FETCH_SOURCES_REJECTED', payload: e.message });
    }
  }, [dispatch]);

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
