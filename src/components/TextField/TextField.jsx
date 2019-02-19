import React from 'react';
import style from './style';

const TextField = (props) => {
  // eslint-disable-next-line react/prop-types
  const { err, ...rest } = props;
  const error = (err) ? { ...style.err } : {};
  return (
    <>
      <input type="text" {...rest} style={{ ...style.base, ...error }} />
      { (err) ? <p style={{ color: 'red' }}>{err}</p> : '' }
    </>
  );
};

export default TextField;
