import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Table, TableSortLabel } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
});

class TraineeTable extends React.Component {
  handleSelect = ID => () => {
    const { onSelect } = this.props;
    onSelect(ID);
  }

  createSortHandler = property => (event) => {
    const { onSort } = this.props;
    onSort(property);
  };

  render() {
    const {
      id,
      classes,
      data,
      columns,
      order,
      orderBy,
    } = this.props;

    return (
      <>
        <Paper className={classes.root}>
          <Table className={classes.table} key={id}>
            <TableHead>
              <TableRow key="col">
                {columns.map(column => (
                  <>
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
                        {column.label}
                      </TableSortLabel>
                    </TableCell>
                  </>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(row => (
                <TableRow
                  className={classes.row}
                  key={row.id}
                  hover
                  onClick={this.handleSelect(row.id)}
                >
                  {columns.map(column => (
                    <TableCell align={column.align} key={column.field}>
                      {column.format
                        ? column.format(row[column.field])
                        : row[column.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </>
    );
  }
}

TraineeTable.propTypes = {
  classes: PropTypes.objectOf(PropTypes.objectOf).isRequired,
  id: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.objectOf),
  data: PropTypes.arrayOf(PropTypes.objectOf),
  onSort: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
};

TraineeTable.defaultProps = {
  data: [],
  columns: [],
  id: '',
};

export default withStyles(styles)(TraineeTable);
