import React from 'react';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { AuthAtom } from '../atoms/AuthAtom';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(AuthAtom);

  function logout() {
    axios({
      url: 'http://localhost:5000/api/logout',
      method: 'DELETE',
      data: {},
    })
      .then((res) => {
        setAuth(false);
        navigate('/');
      })
      .catch((error) => {
        if (error.response.status === 400) {
          alert(error.response.data.msg);
        } else if (error.response.status === 404) {
          alert(error.response.data.msg);
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
