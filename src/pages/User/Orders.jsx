import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Table, CircularProgress, TablePagination,
} from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { callApi } from '../../lib/utils/api';
import { columnArr } from '../../configs/constants';

const styles = theme => ({
  root: {
    width: '96%',
    margin: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
    cursor: 'pointer',
  },
  iconButton: {
    display: 'flex',
  },
});

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      item: {},
      loader: true,
      dataLength: 0,
      rowsPerPage: 10,
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { page } = this.state;
    const skipPage = page * 10;
    const limitpage = 10;
    callApi('get', {}, 'notify', { skip: skipPage, limit: limitpage }).then((result) => {
      if (result.status) {
        this.setState({
          item: result.data,
          loader: false,
          dataLength: result.data.data.NumberOfOrders,
        });
      } else {
        this.setState({
          loader: false,
        });
      }
    });
  }

  handleChangePage = (event, page) => {
    this.setState({
      page,
      loader: true,
    });
    const skipPage = page * 10;
    const limitpage = 10;
    callApi('get', {}, 'notify', { skip: skipPage, limit: limitpage }).then((result) => {
      if (result.status) {
        this.setState({
          item: result.data,
          loader: false,
          dataLength: result.data.data.NumberOfOrders,
        });
      } else {
        this.setState({
          loader: false,
        });
      }
    });
  }


  handleSelect = (id) => {
    // eslint-disable-next-line react/prop-types
    const { history } = this.props;
    history.push(`/order/${id}`);
  };


  render() {
    const {
      id,
      // eslint-disable-next-line react/prop-types
      classes,
    } = this.props;
    const {
      page, dataLength, rowsPerPage, item, loader,
    } = this.state;

    if (loader) {
      return (
        <div style={{ textAlign: 'center' }}>
          <CircularProgress size={50} />
        </div>
      );
    }
    if (!loader && dataLength !== 0) {
      return (
        <>
          <Paper className={classes.root}>
            <div className={classes.tableWrapper}>
              <Table className={classes.table} key={id}>
                <TableHead>
                  <TableRow key="col">
                    {columnArr.map(column => (
                      <React.Fragment key={column.field}>
                        <TableCell
                          align={column.align}
                          key={column.field}
                        >
                          {column.label || column.field}
                        </TableCell>
                      </React.Fragment>
                    ))}
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(item.data.records).map(row => (
                    <TableRow
                      className={classes.row}
                      key={row.id}
                      hover
                    >
                      {columnArr.map(column => (
                        <TableCell
                          align={column.align}
                          key={column.field}
                          // eslint-disable-next-line no-underscore-dangle
                          onClick={this.handleSelect(row._id)}
                        >
                          {column.format
                            ? column.format(row[column.field])
                            : row[column.field]
                          }
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <TablePagination
              rowsPerPageOptions={[]}
              component="div"
              count={dataLength}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={event => this.handleChangePage(event, page)}
            />
          </Paper>
        </>
      );
    }
    return <h2><center>OOPS! No More Users</center></h2>;
  }
}

Order.propTypes = {
  classes: PropTypes.objectOf(PropTypes.objectOf).isRequired,
  id: PropTypes.string,
};

Order.defaultProps = {
  id: '',
};

export default withStyles(styles)(Order);
