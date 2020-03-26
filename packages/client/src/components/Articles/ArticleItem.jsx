import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from '@material-ui/core';

const propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const defaultProps = {
  image: null,
};

const useStyles = makeStyles(() => ({
  root: {
    flexBasis: 300,
    margin: '1em',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  description: {
    height: 125,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  descriptionText: {
    height: 125,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    // whiteSpace: 'nowrap',
  },
}));

const ArticleItem = ({ image, title, date, description }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={image || 'https://via.placeholder.com/300?text=No Image'}
      />
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="caption" component="p">
          {date}
        </Typography>
      </CardContent>
      <CardContent className={classes.description}>
        <Typography
          className={classes.descriptionText}
          variant="body2"
          component="p"
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

ArticleItem.propTypes = propTypes;
ArticleItem.defaultProps = defaultProps;

export default ArticleItem;
