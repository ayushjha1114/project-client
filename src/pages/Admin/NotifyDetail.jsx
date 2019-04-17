import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Button, CircularProgress, Card, CardContent, CardMedia, Typography,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { getDateFormatted } from '../../lib/utils';
import { adminPath } from '../../configs/constants';
import { callApi } from '../../lib/utils/api';
import { SnackbarConsumer } from '../../contexts/SnackBarProvider/SnackBarProvider';

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

class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      snackCheck: false,
      approved: true,
      data: '',
    };
    const { match } = this.props;
    this.getData(match.params.id);
  }

  getData = (id) => {
    callApi('get', {}, 'trainee', {}).then((result) => {
      result.data.data.records.forEach((getID) => {
        // eslint-disable-next-line no-underscore-dangle
        if (id === getID._id) {
          this.setState({
            data: getID,
          });
        }
      });
    });
  }

  handleApproved = (e, values) => {
    e.preventDefault();
    const { approved } = this.state;
    const { match } = this.props;
    // history.push('/admin');
    values.openSnack('Successfully approved', 'success');
    this.setState({
      loader: true,
    });
    callApi(
      'PUT',
      {
        approved, id: match.params.id,
      },
      'approved',
      {},
    ).then((result) => {
      if (result.status) {
        this.setState({
          loader: false,
        });
        values.openSnack('Successfully approved', 'success');
      } else {
        values.openSnack(result.message, 'error');
        this.setState({
          snackCheck: true,
          loader: false,
        });
      }
    });
  }

  render() {
    const { classes } = this.props;
    const { data, loader, snackCheck } = this.state;
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
          <CardMedia
            className={classes.cover}
            image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                { data.name }
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {
                  getDateFormatted(data.createdAt)
                }
              </Typography>
              <Typography variant="subtitle2">
                {data.email}
              </Typography>
              <Typography variant="subtitle2">
                {data.address}
              </Typography>
              <Typography variant="subtitle2">
                {data.city}
              </Typography>
            </CardContent>
          </div>
        </Card>
        <Typography align="center">
          <Link underline="none" component={RouterLink} to={adminPath}>
            <Button variant="outlined" className={classes.button}>
              BACK
            </Button>
          </Link>
        </Typography>
        {
          <SnackbarConsumer>
            {value => (
              <Typography>
                <Link underline="none" component={RouterLink} to={adminPath}>
                  <Button
                    variant="outlined"
                    className={classes.button}
                    onClick={e => this.handleApproved(e, value)}
                  >
                    {
                      (!loader || snackCheck)
                        ? <b>APPROVED</b>
                        : <CircularProgress size={24} thickness={4} />
                    }
                  </Button>
                </Link>
              </Typography>
            )}
          </SnackbarConsumer>
        }

      </>
    );
  }
}

UserDetail.propTypes = {
  classes: PropTypes.objectOf(PropTypes.objectOf).isRequired,
  match: PropTypes.func.isRequired,
};

export default withStyles(styles)(UserDetail);
