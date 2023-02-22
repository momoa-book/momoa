import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AccountContents from '../components/AccountContents';
import AccountNav from '../components/AccountNav';
import AccountSideBar from '../components/AccountSideBar';
import MyPage from './MyPage';
import useUsers from '../components/useUsers';

export default function Account() {
  const navigate = useNavigate();
  const { data, status } = useUsers();

  // 서버에서 받아온 데이터가 성공 상태이고 배열 값이 있으면 제일 첫번째 문서 값의 링크로 이동
  useEffect(() => {
    if (status === 'success' && data.length > 0) {
      navigate(`/account/${data[0].id}`);
    }
  }, []);

  return (
    <>
      <AccountNav />
      <AccountSideBar />
      <Routes>
        <Route path="/:sheetId" element={<AccountContents />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </>
  );
}
