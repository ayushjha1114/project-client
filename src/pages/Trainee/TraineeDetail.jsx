import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Button, Card, CardContent, CardMedia, Typography,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { getDateFormatted } from '../../lib/utils';
import trainee from './data/trainee';
import { traineePath } from '../../configs/constants';
import NoMatch from '../NoMatch';

const styles = theme => ({
  card: {
    display: 'flex',
    margin: 20,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  button: {
    margin: theme.spacing.unit,
    textAlign: 'center',
  },
});

function getData(id) {
  let data;
  trainee.forEach((element) => {
    if (element.id === id) {
      data = element;
    }
  });
  return data;
}

function TraineeDetail(props) {
  const { classes, match } = props;
  const { params } = match;
  const obj = getData(params.id);
  if (!(obj)) {
    return <NoMatch />;
  }
  return (
    <>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cover}
          image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              { obj.name }
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {
                getDateFormatted(obj.createdAt)
              }
            </Typography>
            <Typography variant="subtitle2">
              {obj.email}
            </Typography>
          </CardContent>
        </div>
      </Card>
      <Typography align="center">
        <Link underline="none" component={RouterLink} to={traineePath}>
          <Button variant="outlined" className={classes.button}>
            BACK
          </Button>
        </Link>
      </Typography>
    </>
  );
}

TraineeDetail.propTypes = {
  classes: PropTypes.objectOf(PropTypes.objectOf).isRequired,
  match: PropTypes.func.isRequired,
};

export default withStyles(styles)(TraineeDetail);
