import axios from 'axios';

export async function callApi(method, form, url, queryObj) {
  try {
    const token = localStorage.getItem('token');
    return await axios({
      method,
      baseURL: 'localhost:8000/api/',
      url,
      data: form,
      headers: {
        Authorization: token,
      },
      params: queryObj,
    });
  } catch (error) {
    return error;
  }
}
