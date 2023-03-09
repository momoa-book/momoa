import React from 'react';
import Kakao from '../assets/kakao.svg';

export default function KakaoAuth({ btnText }) {
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=http://43.201.17.158:3001/auth/kakao&response_type=code`;

  const kakaoLogin = () => {
    console.log(REDIRECT_URI);
    window.location.href = KAKAO_AUTH_URL;
  };
  return (
    <>
      <button type="button" className=" user-primary-btn" onClick={kakaoLogin}>
        <div className="flex justify-center">
          <img src={Kakao} width="20px" alt="kakao" className="mr-4" />
          {btnText}
        </div>
      </button>
    </>
  );
}
