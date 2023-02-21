import React from 'react';
import MyAccountStatus from '../components/MyAccountStatus';
import Profile from '../components/Profile';

export default function MyPage() {
  return (
    <>
      <div className="p-4 sm:ml-40">
        <div className="p-4 mt-16 min-[1080px]:w-[1920px] text-gray-800 dark:text-gray-50">
          <div className="text-2xl font-bold tracking-tight ">마이페이지</div>
          <span>닉네임 님 안녕하세요!</span>
          <div className="grid grid-rows-1 grid-cols-1 min-[1080px]:grid-rows-2 min-[1080px]:grid-flow-col min-[1080px]:grid-cols-[600px_minmax(310px,_1fr)_0px] bg-gray-100 dark:bg-gray-800">
            <div className="w-full min-[1080px]:row-span-2 flex justify-items-center justify-center">
              <Profile />
            </div>
            <div className="w-full p-2">
              <MyAccountStatus />
            </div>
            <div className="w-full ">공유 초대 현황</div>
          </div>
        </div>
      </div>
      {/* <div className="sm:ml-40">
        <div className="p-4 mt-16 min-[1080px]:w-[1280px] ">
          <div className="text-2xl font-bold tracking-tight ">마이페이지</div>
          <span>닉네임 님 안녕하세요!</span>
          <div className="text-gray-800 dark:text-gray-50 bg-gray-100 dark:bg-gray-800">
            <div className="grid grid-rows-1 grid-cols-1 min-[1080px]:grid-rows-2 min-[1080px]:grid-flow-col min-[1080px]:grid-cols-[400px_minmax(310px,_1fr)_0px] gap-2">
              <div className="w-full min-[1080px]:row-span-2">프로필</div>

              <div className="w-full ">가계부 현황</div>
              <div className="w-full">공유 현황</div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
