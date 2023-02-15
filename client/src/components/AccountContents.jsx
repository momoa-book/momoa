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
          {/* 
          <div className="grid sm:grid-rows-2 sm:grid-flow-col gap-2">
            <div className="p-2 rounded sm:col-span-2 md:bg-gray-50 bg-gray-100  dark:bg-gray-800">
              input
            </div>
            <div className="p-2 rounded sm:col-span-2 bg-gray-100  dark:bg-gray-800">
              goal
            </div>
            <div className="p-2 -order-1 sm:order-last sm:col-span-3 sm:row-span-2 bg-gray-100 dark:bg-gray-800">
              calendar
            </div>
          </div> */}

          {/* <div className="grid grid-rows-1 grid-cols-1 min-[820px]:grid-rows-2 min-[820px]:grid-flow-col gap-2">
            <div className="p-2 rounded bg-gray-100 min-[820px]:col-span-2 sm:w-fit dark:bg-gray-800">
              <ItempInput />
            </div>
            <div className="p-2 rounded bg-gray-100 min-[820px]:col-span-2 sm:w-fit dark:bg-gray-800 ">
              <CurrentStatus />
            </div>
            <div className="p-2 -order-1 min-[820px]:order-last min-[820px]:col-span-3 min-[820px]:row-span-2  bg-gray-100  dark:bg-gray-800">
              <Calendar />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
