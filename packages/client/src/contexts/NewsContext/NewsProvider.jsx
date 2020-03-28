import React, { useEffect, useCallback, useRef } from 'react';
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

const NewsProvider = ({ children }) => {
  const [state, preDispatch] = useNewsReducer(initialState);
  const isMounted = useRef();

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    }

    return () => {
      isMounted.current = false;
    };
  }, []);

  const dispatch = useCallback(
    (...args) => {
      if (isMounted.current) {
        preDispatch(...args);
      }
    },
    [preDispatch],
  );

  const fetchSources = useCallback(async () => {
    dispatch({ type: 'FETCH_SOURCES' });

    try {
      const { data } = await api.get('/sources');

      dispatch({ type: 'FETCH_SOURCES_FULFILLED', payload: data.sources });
    } catch (e) {
      dispatch({
        type: 'FETCH_SOURCES_REJECTED',
        payload: { error: e.message },
      });
    }
  }, [dispatch]);

  const fetchSource = useCallback(
    async (id, page = 1) => {
      dispatch({ type: 'FETCH_SOURCE', payload: { page, id } });

      try {
        const params = {
          pageSize: 10,
          page,
        };
        const { data } = await api.get(`/sources/${id}`, { params });
        dispatch({
          type: 'FETCH_SOURCE_FULFILLED',
          payload: {
            data: data.articles,
            length: 20,
          },
        });
      } catch (e) {
        dispatch({
          type: 'FETCH_SOURCE_REJECTED',
          payload: { error: e.message },
        });
      }
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
