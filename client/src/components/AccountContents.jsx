import React from 'react';
import CurrentStatus from './CurrentStatus';
import ItempInput from './ItempInput';
import Calendar from './Calendar';

export default function AccountContents() {
  return (
    <>
      <div className="p-4 sm:ml-40">
        <div className="p-4 mt-16 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 ">
          <p className="mb-2">문서 이름</p>
          <p className="mb-4">오늘은 2023년 2월 입니다.</p>
          <div className="grid grid-rows-1 grid-cols-1 min-[1080px]:grid-rows-2 min-[1080px]:grid-flow-col min-[1080px]:grid-cols-[450px_minmax(400px,_1fr)_0px] gap-2">
            <div className="p-2 rounded w-full min-[1080px]:max-w-md bg-gray-100 dark:bg-gray-800">
              <ItempInput />
            </div>
            <div className="p-2 rounded w-full min-[1080px]:max-w-md bg-gray-100 dark:bg-gray-800 ">
              <CurrentStatus />
            </div>
            <div className="p-2 -order-1 min-[1080px]:order-last min-[1080px]:row-span-2 bg-gray-100 dark:bg-gray-800">
              <Calendar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
