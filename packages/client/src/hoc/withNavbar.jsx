import React from 'react';
import { makeStyles } from '@material-ui/core';
import Navbar from '../components/Navbar';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}));

const withNavbar = (WrappedComponent) => () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar />
      <WrappedComponent />
    </div>
  );
};

export default withNavbar;
