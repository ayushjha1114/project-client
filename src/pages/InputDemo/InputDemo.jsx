
import React from 'react';
import { TextField, SelectField, RadioGroup } from '../../components';
import { cricket, football, options } from '../../configs/constants';

class InputDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sport: '',
    };
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  }

  handleSportChange = (event) => {
    this.setState({ sport: event.target.value });
  }

  render() {
    const { name, sport } = this.state;
    let result;
    if (sport === 'Cricket') {
      result = cricket;
    } else if (sport === 'Football') {
      result = football;
    }
    return (
      <>
        <h4>Name</h4>
        <TextField value={name} onChange={this.handleNameChange} />
        <h4>Select the game you play?</h4>
        <SelectField options={options} onChange={this.handleSportChange} />
        {
          (sport) ? <RadioGroup options={result} /> : ''
        }
      </>
    );
  }
}

export default InputDemo;
