import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  footer: {

position: 'fixed',
bottom: 0,
width: '100%',
    backgroundColor: '#35e8a6',
    // marginTop: theme.spacing.unit * 8,
    padding: `${theme.spacing.unit * 2}px 0`,
  },
});

function Footer(props) {
  const { classes } = props;
  return (
    <>
      <footer className={classes.footer}>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        &#169; 2019 CSE-C
        </Typography>
      </footer>
    </>
  );
}

Footer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
