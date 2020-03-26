import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import ArticleItem from './ArticleItem';

const NOW = new Date().toISOString().slice(0, -5).replace(/T/, ' ');

const mockData = Array.from({ length: 10 }, (_, index) => ({
  id: index,
  title: `Article ${index + 1}`,
  date: NOW,
  image:
    index % 2 === 0
      ? 'https://techcrunch.com/wp-content/uploads/2019/04/bitcoin-bitfinex.jpg?w=750'
      : null,
  description:
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque odit a aut similique placeat perspiciatis adipisci ducimus distinctio, pariatur quos suscipit, numquam sed animi expedita in accusamus ad beatae dolor.',
}));

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
});

const Articles = () => {
  const classes = useStyles();

  return (
    <Box
      className={classes.root}
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      p={1}
      m={1}
    >
      {mockData.map(({ id, image, title, date, description }) => (
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
