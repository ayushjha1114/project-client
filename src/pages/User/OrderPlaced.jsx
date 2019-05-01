/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Button, CircularProgress, Card, CardContent, Typography,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { userPath } from '../../configs/constants';
import { callApi } from '../../lib/utils/api';


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
  progress: {
    textAlign: 'center',
    margin: theme.spacing.unit * 6,
  },
});

class OrderPlaced extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    };
    this.getData();
  }

  getData = () => {
    const mailId = localStorage.getItem('email');
    callApi('get', {}, 'order', {}).then((result) => {
      result.data.data.documents.forEach((getID) => {
        // eslint-disable-next-line no-underscore-dangle
        if (mailId === getID.email) {
          this.setState({
            data: getID,
          });
        }
      });
    });
  }


  render() {
    const { classes } = this.props;
    const { data } = this.state;
    if (!(data)) {
      return (
        <div className={classes.progress}>
          <CircularProgress size={50} />
        </div>
      );
    }
    return (
      <>
        <Card className={classes.card}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" align="center" variant="h5">
                { data.email }
              </Typography>
              <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                Your Recycle Product is successfully comfirmed for pick up.
                For more updates, We'll notify you soon.
              </Typography>
            </CardContent>
          </div>
        </Card>
        <Typography align="center">
          <Link underline="none" component={RouterLink} to={userPath}>
            <Button variant="outlined" className={classes.button}>
              BACK
            </Button>
          </Link>
        </Typography>
      </>
    );
  }
}

OrderPlaced.propTypes = {
  classes: PropTypes.objectOf(PropTypes.objectOf).isRequired,
  match: PropTypes.func.isRequired,
};

export default withStyles(styles)(OrderPlaced);
