import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import useNewsContext from '../contexts/NewsContext/useNewsContext';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  toolbar: theme.mixins.toolbar,
}));

const Sources = () => {
  const classes = useStyles();
  const [selected, setSelected] = useState({});

  const {
    state: {
      sources: { data, isFetching },
    },
  } = useNewsContext();

  const handleClickItem = (item) => {
    setSelected(item);
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
        {isFetching ? (
          <div>Loading</div>
        ) : (
          data.map((item) => (
            <ListItem
              selected={selected.id === item.id}
              onClick={() => handleClickItem(item)}
              key={item.id}
              button
            >
              <ListItemText primary={item.name} />
            </ListItem>
          ))
        )}
      </List>
    </Drawer>
  );
};

export default Sources;
