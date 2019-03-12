import React from 'react';

function EnhancedSnackBar(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      console.log(this.props);
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default EnhancedSnackBar;
