import React from 'react';
import Kakao from '../assets/kakao.svg';

export default function KakaoAuth({ btnText }) {
  return (
    <>
      <button type="button" className=" user-primary-btn">
        <div className="flex justify-center">
          <img src={Kakao} width="20px" alt="kakao" className="mr-4" />
          {btnText}
        </div>
      </button>
    </>
  );
}
