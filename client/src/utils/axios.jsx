import axios from 'axios';

const axiosJWT = axios.create();
const accessToken = localStorage.getItem('accessToken');
axiosJWT.defaults.headers.common['authorization'] = `Bearer ${accessToken}`;

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
        if (
          err2.response.data.message === 'TokenExpiredError' ||
          err2.response.data.message === 'TokenNull' ||
          err2.response.data.message === 'JsonWebTokenError'
        ) {
          const rep = await axios.get('http://localhost:5000/api/token');
          const newAccessToken = rep.data.accessToken;
          localStorage.setItem('accessToken', newAccessToken);
          axiosJWT.defaults.headers.common[
            'authorization'
          ] = `Bearer ${newAccessToken}`;
          console.log(newAccessToken);
          config.headers.authorization = `Bearer ${newAccessToken}`;
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
