import axios from 'axios';

export async function callApi(method, form, url, token, queryObj) {
  try {
    return await axios({
      method,
      baseURL: 'https://express-training.herokuapp.com/api/',
      url,
      data: form,
      headers: {
        Authorization: token,
      },
      query: queryObj,
    });
  } catch (error) {
    return error;
  }
}
