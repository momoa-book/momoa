import React from 'react';
import MyAccountStatus from '../components/MyAccountStatus';
import Profile from '../components/Profile';
import ShareAccountStatus from '../components/ShareAccountStatus';

export default function MyPage() {
  return (
    <>
      <div className="p-4 sm:ml-40">
        <div className="p-4 mt-16 min-[1080px]:w-[1920px] text-gray-800 dark:text-gray-50">
          <div className="mb-10">
            <div className="text-2xl font-bold tracking-tight mb-2">
              마이페이지
            </div>
            <span className="text-lg">닉네임 님 안녕하세요!</span>
          </div>
          <div className="grid grid-rows-1 grid-cols-1 min-[1080px]:grid-rows-2 min-[1080px]:grid-flow-col min-[1080px]:grid-cols-[600px_minmax(310px,_1fr)_0px] ">
            <div className="w-full min-[1080px]:row-span-2 flex justify-items-center justify-center">
              <Profile />
            </div>
            <div className="w-full p-2">
              <MyAccountStatus />
            </div>
            <div className="w-full p-2 ">
              <ShareAccountStatus />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
