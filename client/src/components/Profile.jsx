import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();

  function logout() {
    axios({
      url: 'http://localhost:5000/api/logout',
      method: 'get',
    })
      .catch((error) => {
        console.log(error.response.status);
        alert('로그아웃 실패');
      })
      .then((res) => {
        console.log(res.data.msg);
        if (res.data.msg === 'kakao') {
          window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${process.env.REACT_APP_REST_API_KEY}&logout_redirect_uri=${process.env.REACT_APP_KAKAO_LOGOUT_REDIRECT_URI}`;
          localStorage.removeItem('accessToken');
          navigate('/');
        } else {
          alert(res.data.msg);
          localStorage.removeItem('accessToken');
          navigate('/');
        }
      });
  }
  return (
    <div className="mt-4 p-10">
      <img
        className="w-36 h-36 rounded-full mb-10"
        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
        alt="user_pic"
      />
      <div>
        <div className="mb-2">이메일</div>
        <div className="mb-2">닉네임</div>
        <div className="mb-2">가입 유형</div>
        <button className="user-submit-btn" onClick={logout}>
          로그아웃
        </button>
      </div>
    </div>
  );
}
