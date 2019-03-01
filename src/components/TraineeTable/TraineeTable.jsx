/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    margin: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function TraineeTable(props) {
  const {
    id, classes, data, columns,
  } = props;
  return (
    <>
      <Paper className={classes.root}>
        <Table className={classes.table} key={id}>
          <TableHead>
            <TableRow key="asdfg">
              {
                columns.map(column => (
                  <>
                    <TableCell align={column.align} key={column.field}>{column.label}</TableCell>
                  </>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => (
              <TableRow key={row.id}>
                {
                  columns.map(column => (
                    <TableCell align={column.align} key={column.field}>
                      {row[column.field]}
                    </TableCell>
                  ))
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}

TraineeTable.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string,
  columns: PropTypes.array,
  data: PropTypes.array,
};

TraineeTable.defaultProps = {
  data: [],
  columns: [],
  id: '',
};

export default withStyles(styles)(TraineeTable);
