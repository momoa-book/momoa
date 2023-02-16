import React, { useEffect } from 'react';
import axios from 'axios';
import { ReactComponent as Logo2 } from '../assets/logo2.svg';

export default function Kakao(props) {
  // let code = new URL(window.location.href).searchParams.get('code');

  let params = new URL(document.URL).searchParams;
  let code = params.get('code');

  const getAccessToken = () => {
    axios
      .post('http://localhost:5000/api/getkakao', { authcode: code })
      .then((res) => {
        console.log(res.data);
        // let accessToken = res.data.accessToken;
        // let refreshToken = res.headers['refresh-token'];
        // localStorage.setItem('CC_Token', accessToken);
        // localStorage.setItem('RF_Token', refreshToken);
      });
  };

  useEffect(() => {
    getAccessToken();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <Logo2 className="animate-bounce mb-6" width="100px" height="100px" />
        <h4 className="text-xl font-bold md:text-2xl text-center text-gray-900 dark:text-white">
          카카오 로그인 중입니다. <br />
          잠시만 기다려주세요!
        </h4>
      </div>
    </>
  );
}
