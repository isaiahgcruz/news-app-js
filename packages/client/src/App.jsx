import React from 'react';
import { makeStyles } from '@material-ui/core';
import Navbar from './components/Navbar';
import Sources from './components/Sources';
import Articles from './components/Articles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar />
      <Sources />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Articles />
      </main>
    </div>
  );
}

export default App;
