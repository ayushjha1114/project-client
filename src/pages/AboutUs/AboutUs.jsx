import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Slider } from '../../components';
import PUBLIC_IMAGE_FOLDER from '../../configs/constants';


const styles = theme => ({
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 2,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  ui: {
    listStyleType: 'none',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});


function AboutUs(props) {
  const { classes } = props;
  const banner = [
    `${PUBLIC_IMAGE_FOLDER}trash-pickup.jpg`,
    `${PUBLIC_IMAGE_FOLDER}residentialtrash1.jpg`,
    `${PUBLIC_IMAGE_FOLDER}commercial-pickup.jpg`,
    `${PUBLIC_IMAGE_FOLDER}imagess.jpeg`,
    `${PUBLIC_IMAGE_FOLDER}blue-carts.jpg`,
  ];

  return (
    <React.Fragment>
      <main>
        {/* Hero unit */}
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              About Us
            </Typography>
            {/* <Card className={classes.card}>
              <Slider banners={banner} />
            </Card> */}
            <Slider banners={banner} />
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
            We are the provider of solid waste collection, transfer,
            recycling and disposal services in mostly exclusive and
            secondary markets across the Ghaziabad, India.
              <br />
              25% of all items in recycling bins are actually trash.
              That’s a big problem impacting recycling efforts around the world.
              You can help by following three simple rules:
              <ul className={classes.ui}>
                <li>Recycle empty plastic bottles, cans, paper and cardboard.</li>
                <li>Keep foods and liquids out of your recycling.</li>
                <li>Keep plastic bags out of your recycling.</li>
              </ul>
            </Typography>
          </div>
        </div>

      </main>
    </React.Fragment>
  );
}

AboutUs.propTypes = {
  classes: PropTypes.objectOf.isRequired,
};

export default withStyles(styles)(AboutUs);
