import React from 'react';
import axios from '../utils/axios';

const Test = () => {
  //     const getUsers = async () => {
  //         const response = await axiosJWT.get('http://localhost:5000/users', {
  //             headers: {
  //                 Authorization: `Bearer ${token}`
  //             }
  //         });
  //         setUsers(response.data);
  //     }
  //   console.log(axios);
  //   console.log(axios.defaults.headers);

  function eventHandle() {
    axios.get('http://localhost:5000/api/users').then((response) => {
      console.log('---------------2222222-----------------');
      console.log(response);
    });
  }
  return (
    <div>
      <button type="button" onClick={eventHandle}>
        버튼
      </button>
    </div>
  );
};

export default Test;
