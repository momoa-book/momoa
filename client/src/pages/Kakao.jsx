import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { ReactComponent as Logo2 } from '../assets/logo2.svg';
import { AuthAtom } from '../atoms/AuthAtom';

export default function Kakao(props) {
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(AuthAtom);

  // 인가 코드
  let params = new URL(document.URL).searchParams;
  let code = params.get('code');

  // 새로고침 혹은 주소창에 주소 입력 시 액세스 토큰 만료 되어짐..
  const getAccessToken = () => {
    axios
      .post('http://localhost:5000/api/getkakao', { authcode: code })
      .then((res) => {
        if (res.status === 200) {
          const { accessToken } = res.data;
          setAuth(true);
          axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${accessToken}`;
          setTimeout(() => {
            navigate('/account');
          }, 2000);
        } else {
          alert('로그인에 실패하였습니다.');
          navigate('/login');
        }
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
