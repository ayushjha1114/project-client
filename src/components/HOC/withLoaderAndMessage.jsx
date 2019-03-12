import React from 'react';
import { CircularProgress } from '@material-ui/core';

function EnhancedTable(WrappedComponent) {
  const progess = {
    textAlign: 'center',
  };
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    /*     static getDerivedStateFromProps(nextProps, prevState) {
      console.log('43-----------', nextProps, 'QQQ', prevState);
      if (nextProps.page !== 0) {
        return {
          loader: true,
        };
      }
    } */

    render() {
      // eslint-disable-next-line react/prop-types
      const { loader, dataLength } = this.props;
      console.log('51---------', this.props);
      // return <WrappedComponent {...this.props} />;
      if (loader) {
        return (
          <div style={progess}>
            <CircularProgress size={50} />
          </div>
        );
      }
      if (!loader && dataLength !== 0) {
        return <WrappedComponent {...this.props} />;
      }
      /*       if (!loader && dataLength === 0) {
        return <h2><center>OOPS! No More Trainees</center></h2>;
      } */
      return <h2><center>OOPS! No More Trainees</center></h2>;
      // return (
      //   <>
      //     {
      //       (loader)
      //         ? <CircularProgress size={50} />
      //         : (
      //           <SnackbarConsumer>
      //             {openSnack => (
      //               (errorAlert)
      //                 ? openSnack('ERROR', 'error')
      //                 : <WrappedComponent {...this.props} />
      //             )}
      //           </SnackbarConsumer>
      //         )
      //     }
      //   </>
      // );
    }
  };
}

export default EnhancedTable;
