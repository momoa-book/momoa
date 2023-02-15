import React from 'react';
import AccountContents from '../components/AccountContents';
import AccountNav from '../components/AccountNav';
import AccountSideBar from '../components/AccountSideBar';

export default function Account() {
  return (
    <>
      <AccountNav />
      <AccountSideBar />
      <AccountContents />
    </>
  );
}
