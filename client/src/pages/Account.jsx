import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import AccountContents from '../components/AccountContents';
import AccountNav from '../components/AccountNav';
import AccountSideBar from '../components/AccountSideBar';
import MyPage from './MyPage';
import useUsers from '../hooks/useSheetId';
import NoData from '../components/NoData';
import Modal from '../components/Modal';

export default function Account() {
  const navigate = useNavigate();
  const { data, status } = useUsers();

  useEffect(() => {
    if (data.sheet) {
      navigate(`/account/${data.sheet[0].sheet_id}`);
    }
  }, []);

  return (
    <>
      <AccountNav />
      <AccountSideBar
        {...(status === 'success' && data.sheet && { sheetInfo: data.sheet })}
      />
      <Routes>
        <Route path="/" element={<NoData />} />
        {/* {data.sheet && <Route path="/" element={<Navigate to="/" />} />} */}
        <Route path="/:sheetId" element={<AccountContents />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
      <Modal />
    </>
  );
}
