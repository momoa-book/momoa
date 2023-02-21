import React from 'react';
import { HiOutlinePencilAlt } from 'react-icons/hi';

export default function MyAccountStatus() {
  return (
    <>
      <div className="mt-10 mb-6 text-xl font-bold tracking-tight ">
        나의 가계부
      </div>

      <div className="flex flex-wrap w-full">
        {/* 이 항목이 추가 될 수 있도록 하면 됨 */}
        <div className="p-6 mb-6 shadow-md bg-white dark:bg-gray-700 rounded w-full min-[1080px]:w-[320px] min-[1080px]:mr-6">
          <div className="flex justify-between">
            <div className="text-lg font-bold mb-2">가계부 이름</div>
            <HiOutlinePencilAlt className="h-7 w-7 hover:cursor-pointer hover:translate-y-1" />
          </div>
          <div>생성일자</div>
          <div>참여인원</div>
        </div>

        <div className="p-6 mb-6 shadow-md bg-white dark:bg-gray-700 rounded w-full min-[1080px]:w-[320px] min-[1080px]:mr-6">
          <div className="flex justify-between">
            <div className="text-lg font-bold mb-2">가계부 이름</div>
            <HiOutlinePencilAlt className="h-7 w-7 hover:cursor-pointer hover:translate-y-1" />
          </div>
          <div>생성일자</div>
          <div>참여인원</div>
        </div>
      </div>
    </>
  );
}
