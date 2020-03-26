import React from 'react';
import { makeStyles } from '@material-ui/core';
import Navbar from './components/Navbar';
import Sources from './components/Sources';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}));

function App() {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Navbar />
      <Sources />
    </div>
  );
}

export default App;
