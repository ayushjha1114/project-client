import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Card, List, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import {
  Call, Room, Email,
} from '@material-ui/icons';
import CardMedia from '@material-ui/core/CardMedia';
import PUBLIC_IMAGE_FOLDER from '../../configs/constants';

const styles = theme => ({
  card: {
    height: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  footer: {
    marginTop: theme.spacing.unit * 8,
    padding: `${theme.spacing.unit * 6}px 0`,
  },
});

class ContactUs extends React.Component {
  state = { };

  render() {
    const { classes } = this.props;

    return (
      <>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={`${PUBLIC_IMAGE_FOLDER}contact-us.jpg`}
            title="Contact Us"
          />
        </Card>
        <footer className={classes.footer}>
          <List component="nav">
            <ListItem button>
              <ListItemIcon>
                <Room />
              </ListItemIcon>
              <ListItemText primary="Rkgit, Ghaziabad" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Call />
              </ListItemIcon>
              <ListItemText primary="+91-8506802848" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Email />
              </ListItemIcon>
              <ListItemText primary="ayushjha1114@gmail.com" />
            </ListItem>
          </List>
        </footer>
      </>
    );
  }
}

ContactUs.propTypes = {
  classes: PropTypes.objectOf.isRequired,
};

export default withStyles(styles)(ContactUs);
