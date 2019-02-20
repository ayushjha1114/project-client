import React from 'react';
import * as yup from 'yup';
import {
  TextField, SelectField, RadioGroup, Button,
} from '../../components';
import { cricket, football, options } from '../../configs/constants';

class InputDemo extends React.Component {
  schema = yup.object().shape({
    name: yup.string().required().min(3),
  });

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sport: '',
      error: '',
      radioValue: '',
    };
  }

  handleNameChange = (event) => {
    this.schema.validate({ name: event.target.value }).then((aa) => {
      console.log(aa);
      this.setState({
        name: event.target.value,
        error: '',
      });
    }).catch(err => console.log(err));
  }

  handleSportChange = (event) => {
    this.setState({ sport: event.target.value });
  }

  handleRadioChange = (event) => {
    this.setState({ radioValue: event.target.value });
  }

  render() {
    const {
      name, sport, error, radioValue,
    } = this.state;
    let result;
    if (sport === 'Cricket') {
      result = cricket;
    } else if (sport === 'Football') {
      result = football;
    }
    return (
      <>
        <h4>Name</h4>
        <TextField
          value={name}
          onChange={this.handleNameChange}
          onBlur={this.handleTouched}
          error={error}
        />
        <h4>Select the game you play?</h4>
        <SelectField options={options} onChange={this.handleSportChange} />
        {
          (sport) ? <RadioGroup value={radioValue} options={result} onChange={this.handleRadioChange} /> : ''
        }
        <div style={{ textAlign: 'right' }}>
          <Button value="Cancel" />
          <Button value="Submit" disabled />
        </div>

      </>
    );
  }
}

export default InputDemo;
