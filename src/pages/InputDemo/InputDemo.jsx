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
      form: {
        name: '',
        sport: '',
        radioValue: '',
      },
      error: {
        name: '',
        sport: '',
        radioValue: '',
      },
      isTouched: {
        name: false,
        sport: false,
        radioValue: false,
      },
    };
  }

  handleChange = field => (event) => {
    const { isTouched, form } = this.state;

    this.setState({
      form: { ...form, [field]: event.target.value },
      isTouched: { ...isTouched, [field]: true },
    }, this.handleOnBlur(field));
  };

  handleOnBlur = field => () => {
    const {
      form, error, isTouched,
    } = this.state;
    const { name, sport, radioValue } = form;
    this.schema.validate({ name, sport, radioValue }, { abortEarly: false }).then(() => {
      this.setState({
        error: { ...error, [field]: '' },
        isTouched: { ...isTouched, [field]: true },
      });
    }).catch((err) => {
      err.inner.forEach((er) => {
        if (er.path === field) {
          this.setState({
            error: { ...error, [field]: er.message },
            isTouched: { ...isTouched, [field]: true },
          });
        }
      });
      if (!err.inner.some(er => er.path === field)) {
        this.setState({
          error: { ...error, [field]: '' },
        });
      }
    });
  };

  hasError = () => {
    const { error } = this.state;
    if (error.name === '' && error.sport === '' && error.radioValue === '') {
      return false;
    }
    return true;
  }

  getError = (field) => {
    const { isTouched, error } = this.state;
    let result = '';
    if (isTouched[field] === true) {
      result = error[field];
    }
    return result;
  }

  buttonChecked = () => {
    const { isTouched } = this.state;
    let touched = 0;
    let result = false;
    const checkError = this.hasError();
    Object.keys(isTouched).forEach((i) => {
      if (isTouched[i] === true) {
        touched += 1;
      }
    });
    if (!checkError && touched === 3) {
      result = true;
    } else if (checkError && touched !== 3) {
      result = false;
    }
    return result;
  }

  render() {
    const {
      form,
    } = this.state;
    let result;
    if (form.sport === 'Cricket') {
      result = cricket;
    } else if (form.sport === 'Football') {
      result = football;
    }
    return (
      <React.Fragment>
        <h4>Name</h4>
        <TextField
          value={form.name}
          onChange={this.handleChange('name')}
          onBlur={this.handleOnBlur('name')}
          error={this.getError('name')}
        />
        <h4>Select the game you play?</h4>
        <SelectField
          options={options}
          value={form.sport}
          onChange={this.handleChange('sport')}
          onBlur={this.handleOnBlur('sport')}
          error={this.getError('sport')}
        />
        {form.sport ? (
          <RadioGroup
            options={result}
            onChange={this.handleChange('radioValue')}
            onBlur={this.handleOnBlur('radioValue')}
            error={this.getError('radioValue')}
          />
        ) : (
          ''
        )}
        <div style={{ textAlign: 'right' }}>
          <Button value="Cancel" />
          {
            (this.buttonChecked()) ? <Button value="Submit" color={{ backgroundColor: 'green' }} /> : <Button value="Submit" disabled />
          }
        </div>
      </React.Fragment>
    );
  }
}

export default InputDemo;
