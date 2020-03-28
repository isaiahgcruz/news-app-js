import React from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles, Typography } from '@material-ui/core';

const propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
};

const defaultProps = {
  disabled: false,
};

const useStyles = makeStyles(() => ({
  root: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    display: 'flex',
    padding: 15,
  },
  summary: {
    margin: 10,
  },
}));

const Pagination = ({ disabled, onChange, page, size, length }) => {
  const classes = useStyles();
  const summary = `${(page - 1) * size + 1} - ${(() => {
    const last = (page - 1) * size + size;

    return last > length ? length : last;
  })()} of ${length}`;

  return (
    <div className={classes.root}>
      <Typography variant="body2" className={classes.summary}>
        {summary}
      </Typography>
      <Button
        data-testid="pagination-previous"
        variant="outlined"
        disabled={disabled || page === 1}
        aria-label="previous"
        onClick={() => onChange(page - 1)}
      >
        &#8249;
      </Button>
      <Button
        data-testid="pagination-next"
        variant="outlined"
        disabled={disabled || page * size >= length}
        aria-label="next"
        onClick={() => onChange(page + 1)}
      >
        &#8250;
      </Button>
    </div>
  );
};

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

export default Pagination;
