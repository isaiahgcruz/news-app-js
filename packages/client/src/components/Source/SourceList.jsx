import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import useNewsContext from '../../contexts/NewsContext/useNewsContext';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  listItem: {
    height: 50,
  },
  toolbar: theme.mixins.toolbar,
}));

const loadingArray = Array.from({ length: 10 }, (_, index) => index);

const SourceList = () => {
  const classes = useStyles();
  const [selected, setSelected] = useState({});

  const {
    state: {
      sources: { data, isFetching },
      source: { isFetching: isFetchingSource },
    },
    actions: { fetchSource },
  } = useNewsContext();

  const handleClickItem = (item) => {
    if (item.id !== selected.id) {
      setSelected(item);
      fetchSource(item.id);
    }
  };

  return (
    <Drawer
      variant="permanent"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbar} />
      <List>
        {isFetching
          ? loadingArray.map((key) => (
              <ListItem key={key} className={classes.listItem}>
                <Skeleton variant="rect" width="100%" height="100%" />
              </ListItem>
            ))
          : data.map((item) => (
              <ListItem
                className={classes.listItem}
                disabled={isFetchingSource}
                selected={selected.id === item.id}
                onClick={() => handleClickItem(item)}
                key={item.id}
                button
              >
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
      </List>
    </Drawer>
  );
};

export default SourceList;
