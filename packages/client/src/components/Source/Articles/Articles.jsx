import React, { useEffect } from 'react';
import { Box, makeStyles, Divider, Toolbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import ArticleItem from './ArticleItem';
import Pagination from '../../Pagination';
import useNewsContext from '../../../contexts/NewsContext/useNewsContext';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  toolbar: {
    maxHeight: 0,
    minHeight: 0,
  },
});

const loadingArray = Array.from({ length: 10 }, (_, index) => index);

const Articles = () => {
  const classes = useStyles();

  const {
    state: {
      source: { error, data, isFetching, page, pageSize = 10, length = 25, id },
    },
    actions: { fetchSource },
  } = useNewsContext();

  const handleOnChangePage = (newPage) => {
    fetchSource(id, newPage);
  };

  useEffect(() => {
    const anchor = document.querySelector('#back-to-top');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isFetching]);

  const content = (() => {
    if (error) {
      return (
        <Alert severity="info">
          An error occurred. Please select another news source.
        </Alert>
      );
    }
    if (!id) {
      return <Alert severity="info">Please select a news source</Alert>;
    }
    if (id && !isFetching && !data.length) {
      return (
        <Alert severity="info">
          No article is available for this news source. Please select another
          news source.
        </Alert>
      );
    }
    if (isFetching) {
      return loadingArray.map((val) => <ArticleItem key={val} isSkeleton />);
    }

    return data.map(
      ({ id: itemId, urlToImage, title, publishedAt, description }) => (
        <ArticleItem
          key={itemId}
          image={urlToImage}
          title={title || ''}
          date={publishedAt}
          description={description || ''}
        />
      ),
    );
  })();

  return (
    <>
      <Toolbar id="back-to-top" className={classes.toolbar} />
      <Box
        className={classes.root}
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        p={1}
        m={1}
      >
        {content}
      </Box>
      {(!!data.length || isFetching) && (
        <>
          <Divider />
          <Pagination
            disabled={isFetching}
            page={page}
            size={pageSize}
            length={length}
            onChange={handleOnChangePage}
          />
        </>
      )}
    </>
  );
};

export default Articles;
