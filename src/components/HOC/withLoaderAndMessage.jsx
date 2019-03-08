import React from 'react';
import { callApi } from '../../lib/utils/api';


function EnhancedTable(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loader: false,
      };
    }

    getTrainee = async () => {
      // eslint-disable-next-line react/prop-types
      const { page } = this.props;
      const skipPage = page * 20;
      const limitpage = 20 * (page + 1);
      const result = await callApi('get', {}, 'trainee', localStorage.getItem('token'), { skip: skipPage, limit: limitpage });
      console.log('@@@##', result);
      return result;
    }

    render() {
      console.log('######', this.props);
      return <WrappedComponent dataOpen={this.getTrainee()} {...this.props} />;
    }
  };
}

export default EnhancedTable;
