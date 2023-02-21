import React from 'react';

export default function MyAccountStatus() {
  return (
    <>
      <div className="mt-10 mb-5 ">나의 가계부</div>
      <div className="flex flex-wrap w-full">
        {/* 이 항목이 추가 될 수 있도록 하면 됨 */}
        <div className=" p-6 mr-6 mb-6 border-2 border-gray-100 rounded w-full min-[1080px]:w-[320px]">
          <div className="flex justify-between">
            <div>가계부 이름</div>
            <div>수정</div>
          </div>
          <div>생성일자</div>
          <div>참여인원</div>
        </div>
        <div className=" p-6 mr-6 mb-6 border-2 border-gray-100 rounded w-full min-[1080px]:w-[320px]">
          <div className="flex justify-between">
            <div>가계부 이름</div>
            <div>수정</div>
          </div>
          <div>생성일자</div>
          <div>참여인원</div>
        </div>
        <div className=" p-6 mr-4 mb-6 border-2 border-gray-100 rounded w-full min-[1080px]:w-[320px]">
          <div className="flex justify-between">
            <div>가계부 이름</div>
            <div>수정</div>
          </div>
          <div>생성일자</div>
          <div>참여인원</div>
        </div>
      </div>
    </>
  );
}
