import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import ArticleItem from './ArticleItem';
import useNewsContext from '../../contexts/NewsContext/useNewsContext';

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
      source: { data, isFetching },
    },
  } = useNewsContext();

  return (
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
        : data.map(({ id, image, title, date, description }) => (
            <ArticleItem
              key={id}
              image={image}
              title={title}
              date={date}
              description={description}
            />
          ))}
    </Box>
  );
};

export default Articles;
