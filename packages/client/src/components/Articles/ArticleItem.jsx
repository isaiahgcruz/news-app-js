import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  isSkeleton: PropTypes.bool,
};

const defaultProps = {
  image: null,
  title: null,
  date: null,
  description: null,
  isSkeleton: false,
};

const descriptionHeight = 125;

const useStyles = makeStyles(() => ({
  root: {
    flexBasis: 300,
    margin: '1em',
    minWidth: 300,
    height: 420,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  description: {
    height: descriptionHeight,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  descriptionText: {
    height: descriptionHeight,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

const ArticleItem = ({ isSkeleton, image, title, date, description }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      {isSkeleton ? (
        <>
          <Skeleton variant="rect" className={classes.media} />
          <CardContent>
            <Skeleton variant="rect" />
            <Skeleton variant="rect" />
          </CardContent>
          <CardContent className={classes.description}>
            <Skeleton variant="rect" className={classes.descriptionText} />
          </CardContent>
        </>
      ) : (
        <>
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
        </>
      )}
    </Card>
  );
};

ArticleItem.propTypes = propTypes;
ArticleItem.defaultProps = defaultProps;

export default ArticleItem;
