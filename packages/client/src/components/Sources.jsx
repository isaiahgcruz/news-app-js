import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText } from '@material-ui/core';

const mockData = Array.from({ length: 100 }, (_, index) => ({
  id: index,
  name: `News Source ${index + 1}`,
}));

const Sources = () => {
  const [selected, setSelected] = useState({});

  const handleClickItem = (item) => {
    setSelected(item);
  };

  return (
    <Drawer variant="permanent">
      <List>
        {mockData.map((item) => (
          <ListItem
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

export default Sources;
