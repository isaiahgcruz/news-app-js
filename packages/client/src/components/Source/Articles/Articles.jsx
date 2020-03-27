import React from 'react';
import { Box, makeStyles, Divider } from '@material-ui/core';
import ArticleItem from './ArticleItem';
import Pagination from '../../Pagination';
import useNewsContext from '../../../contexts/NewsContext/useNewsContext';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
});

const loadingArray = Array.from({ length: 10 }, (_, index) => index);

const Articles = () => {
  const classes = useStyles();

  const {
    state: {
      source: { data, isFetching, page, size = 10, length = 25, id },
    },
    actions: { fetchSource },
  } = useNewsContext();

  const handleOnChangePage = (newPage) => {
    fetchSource(id, newPage);
  };

  return (
    <>
      <Box
        className={classes.root}
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        p={1}
        m={1}
      >
        {isFetching
          ? loadingArray.map((val) => <ArticleItem key={val} isSkeleton />)
          : data.map(({ id: itemId, image, title, date, description }) => (
              <ArticleItem
                key={itemId}
                image={image}
                title={title}
                date={date}
                description={description}
              />
            ))}
      </Box>
      {(!!data.length || isFetching) && (
        <>
          <Divider />
          <Pagination
            disabled={isFetching}
            page={page}
            size={size}
            length={length}
            onChange={handleOnChangePage}
          />
        </>
      )}
    </>
  );
};

export default Articles;
