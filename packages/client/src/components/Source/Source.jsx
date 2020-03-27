import React from 'react';
import { makeStyles } from '@material-ui/core';
import SourceList from './SourceList';
import Articles from './Articles';
import NewsProvider from '../../contexts/NewsContext/NewsProvider';

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}));

const Source = () => {
  const classes = useStyles();

  return (
    <NewsProvider>
      <SourceList />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Articles />
      </main>
    </NewsProvider>
  );
};

export default Source;
