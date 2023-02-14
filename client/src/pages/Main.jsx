import React from 'react';
import { Link } from 'react-router-dom';
import Toggle from '../components/Toggle';

export default function Main() {
  return (
    <>
      <Link to="/">메인 </Link>
      <Link to="/signup">회원가입 </Link>
      <Link to="/login">로그인 </Link>
      <Link to="/account">가계부 </Link>
      <Toggle /> 컴포넌트 페이지 이동용 테스트 버튼과 다크모드 토글버튼이에요
      ~~~
    </>
  );
}
