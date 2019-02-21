import React from 'react';
import * as yup from 'yup';
import {
  TextField, SelectField, RadioGroup, Button,
} from '../../components';
import { cricket, football, options } from '../../configs/constants';

class InputDemo extends React.Component {
  schema = yup.object().shape({
    name: yup
      .string()
      .min(3)
      .required(),
    sport: yup.string().required(),
    radioValue: yup.string().required(),
  });

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sport: '',
      Err: {
        name: '',
        sport: '',
        radioValue: '',
      },
      radioValue: '',
      isTouched: {
        name: false,
        sport: false,
        radioValue: false,
      },
      hasError: {
        name: false,
        sport: false,
        radioValue: false,
      },
    };
  }

  handleChange = field => (event) => {
    const { isTouched } = this.state;
    this.setState({
      [field]: event.target.value,
      isTouched: { ...isTouched, [field]: true },
    }, this.getError(field));
  };

  getError = field => () => {
    const {
      name, sport, Err, hasError,
    } = this.state;
    this.schema.validate({ name, sport }, { abortEarly: false }).then(() => {
      this.setState({
        Err: { ...Err, [field]: '' },
        hasError: { ...hasError, [field]: false },
      });
    }).catch((err) => {
      err.inner.forEach((error) => {
        if (error.path === field) {
          this.setState({
            Err: { ...Err, [field]: error.message },
            hasError: { ...hasError, [field]: true },
          });
        }
      });
      if (!err.inner.some(er => er.path === field) && hasError[field]) {
        this.setState({
          Err: { ...Err, [field]: '' },
          hasError: { ...hasError, [field]: false },
        });
      }
    });
  };

  render() {
    const {
      name, sport, Err, radioValue,
    } = this.state;
    console.log('states  ', this.state);
    let result;
    if (sport === 'Cricket') {
      result = cricket;
    } else if (sport === 'Football') {
      result = football;
    }
    return (
      <React.Fragment>
        <h4>Name</h4>
        <TextField
          value={name}
          onChange={this.handleChange('name')}
          onBlur={this.getError('name')}
          error={Err.name}
        />
        <h4>Select the game you play?</h4>
        <SelectField
          options={options}
          value={sport}
          onChange={this.handleChange('sport')}
          onBlur={this.getError('sport')}
          error={Err.sport}
        />
        {sport ? (
          <RadioGroup
            value={radioValue}
            options={result}
            onChange={this.handleChange('radioValue')}
            onBlur={this.getError('radioValue')}
            error={Err.radioValue}
          />
        ) : (
          ''
        )}
        <div style={{ textAlign: 'right' }}>
          <Button value="Cancel" />
          <Button value="Submit" disabled />
        </div>
      </React.Fragment>
    );
  }
}

export default InputDemo;
