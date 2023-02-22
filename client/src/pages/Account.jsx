import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AccountContents from '../components/AccountContents';
import AccountNav from '../components/AccountNav';
import AccountSideBar from '../components/AccountSideBar';
import MyPage from './MyPage';

export default function Account() {
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
