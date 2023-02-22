import axios from 'axios';

const axiosJWT = axios.create();

// axiosJWT.defaults.headers.common[
//     'Authorization'
//   ] = `Bearer ${localStorage.getItem('accessToken')}`;
axiosJWT.defaults.headers.common['authorization'] = `Bearer {token}`;

axiosJWT.interceptors.request.use(
  async (config) => {
    await axios
      .get('http://localhost:5000/api/verify', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then(() => {
        return config;
      })
      .catch(async (err2) => {
        if (err2.response.data.message == 'TokenExpiredError') {
          const rep = await axios.get('http://localhost:5000/api/token');
          console.log('rep : ', rep.data);
          const newAccessToken = rep.data.accessToken;
          localStorage.setItem('accessToken', newAccessToken);
          return config;
        } else {
          alert('error!');
          return Promise.reject(false);
        }
      });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosJWT;
