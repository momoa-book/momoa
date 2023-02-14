import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo2.svg';
import Toggle from './Toggle';

export default function Header() {
  const navigate = useNavigate();
  const goToMain = () => {
    navigate('/');
  };
  const goToLogin = () => {
    navigate('/login');
  };
  return (
    <div className="px-[24px] pt-[24px] lg:px-[80px] lg:pt-[78px] flex justify-between">
      <img
        className="h-[16px] w-[96px] lg:h-[38px] lg:w-[240px] cursor-pointer transition-all duration-300 hover:scale-110"
        src={logo}
        alt="momoa_logo"
        onClick={goToMain}
      />

      <div>
        <Toggle />
        <button
          className="text-purple-700 text-[10px] lg:text-[18px] border border-purple-700 rounded-full btn_shadow w-[80px] h-[24px] lg:w-[136px] lg:h-[40px] capitalize transition-all duration-300 hover:opacity-50"
          onClick={goToLogin}
        >
          로그인
        </button>
      </div>
    </div>
  );
}
