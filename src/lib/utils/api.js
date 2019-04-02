import axios from 'axios';

export async function callApi(method, form, url) {
  try {
    return await axios({
      method,
      url: `https://express-training.herokuapp.com/api/${url}`,
      data: {
        email: form.email,
        password: form.password,
      },
    });
    // window.localStorage.setItem('token', JSON.stringify(res.data.data));
    // console.log('success!!!!', res.data.data, '#####', window.localStorage.getItem('token'));
  } catch (error) {
    return error;
  }
}
