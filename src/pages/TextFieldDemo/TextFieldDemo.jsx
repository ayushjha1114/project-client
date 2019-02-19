
import React from 'react';
import { Slider, TextField } from '../../components';
// import Slider from '../../components/Slider';
import PUBLIC_IMAGE_FOLDER from '../../configs/constants';

const banner = [
  `${PUBLIC_IMAGE_FOLDER}default.png`,
  `${PUBLIC_IMAGE_FOLDER}cloud.jpg`,
  `${PUBLIC_IMAGE_FOLDER}dns-server.png`,
  `${PUBLIC_IMAGE_FOLDER}full-stack-web-development.jpg`,
  `${PUBLIC_IMAGE_FOLDER}js.jpg`,
  `${PUBLIC_IMAGE_FOLDER}load-balancer.png`,
];
const TextFieldDemo = () => (
  <>
    <Slider banners={banner} />
    <h4>This is Disabled Input</h4>
    <TextField disabled value="Disabled value" />
    <h4>A Valid Input</h4>
    <TextField value="Accessible" />
    <h4>An Input with errors</h4>
    <TextField value="101" err="Could not be greater than" />
  </>
);
export default TextFieldDemo;
