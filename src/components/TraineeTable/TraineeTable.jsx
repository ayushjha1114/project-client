import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Table, TableSortLabel, TablePagination, Button,
} from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EnhancedTable from '../HOC';


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

class TraineeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  /*   async componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { result } = this.props;
    console.log('SSSSSSS', result);
    const res = await result;
    this.setState({
      serverData: res.data.records,
    });
  } */

  handleSelect = ID => () => {
    const { onSelect } = this.props;
    onSelect(ID);
  }

  createSortHandler = property => () => {
    const { onSort } = this.props;
    onSort(property);
  };


  render() {
    const {
      id,
      // eslint-disable-next-line react/prop-types
      result,
      classes,
      columns,
      order,
      orderBy,
      page,
      count,
      rowsPerPage,
      onChangePage,
      actions,
    } = this.props;
    console.log('222', this.props);

    return (
      <>
        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table className={classes.table} key={id}>
              <TableHead>
                <TableRow key="col">
                  {columns.map(column => (
                    <React.Fragment key={column.field}>
                      <TableCell
                        align={column.align}
                        key={column.field}
                        sortDirection={orderBy === column.label ? order : false}
                      >
                        <TableSortLabel
                          active={orderBy === column.label}
                          direction={order}
                          onClick={this.createSortHandler(column.label)}
                        >
                          {column.label || column.field}
                        </TableSortLabel>
                      </TableCell>
                    </React.Fragment>
                  ))}
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {(result.data.documents).map(row => (
                  <TableRow
                    className={classes.row}
                    key={row.id}
                    hover
                  >
                    {columns.map(column => (
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
                    <TableCell>
                      {
                        actions.map(action => (
                          <Button
                            onClick={() => action.handler(row)}
                            className={classes.iconButton}
                          >
                            {action.icon}
                          </Button>
                        ))
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={onChangePage}
          />
        </Paper>
      </>
    );
  }
}

TraineeTable.propTypes = {
  classes: PropTypes.objectOf(PropTypes.objectOf).isRequired,
  id: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.objectOf),
  onSort: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number,
  onChangePage: PropTypes.func.isRequired,
  actions: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};

TraineeTable.defaultProps = {
  columns: [],
  id: '',
  rowsPerPage: 20,
};

export default EnhancedTable(withStyles(styles)(TraineeTable));
