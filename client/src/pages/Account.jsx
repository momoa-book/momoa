import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import AccountContents from '../components/AccountContents';
import AccountNav from '../components/AccountNav';
import AccountSideBar from '../components/AccountSideBar';
import MyPage from './MyPage';
import useUsers from '../hooks/useUsers';
import NoData from '../components/NoData';
import Modal from '../components/Modal';

export default function Account() {
  const navigate = useNavigate();
  const { data, status } = useUsers();
  console.log(data);
  // console.log(status); console.log(data);

  useEffect(() => {
    if (data.length > 0) {
      navigate(`/account/${data[0].id}`);
    }
  }, []);

  return (
    <>
      <AccountNav />
      <AccountSideBar {...(data.length > 0 && { sheetInfo: data })} />
      <Routes>
        {data.length < 0 && <Route path="/" element={<NoData />} />}
        {data.length > 0 && <Route path="/" element={<Navigate to="/" />} />}
        <Route path="/:sheetId" element={<AccountContents />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
      <Modal />
    </>
  );
}
