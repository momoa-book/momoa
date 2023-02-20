import React from 'react';
import CurrentStatus from './CurrentStatus';
import ItempInput from './ItempInput';
import Calendar from './Calendar';

export default function AccountContents() {
  return (
    <>
      <div className="p-4 sm:ml-40">
        <div className="p-4 mt-16">
          <div className="grid grid-rows-1 grid-cols-1 min-[1080px]:grid-rows-3 min-[1080px]:grid-flow-col min-[1080px]:grid-cols-[550px_minmax(310px,_1fr)_0px] gap-2">
            <div className="w-full mb-2 min-[1080px]:max-w-[550px] min-[1080px]:row-span-1 ">
              <ItempInput />
            </div>
            <div className="w-full min-[1080px]:max-w-[550px] min-[1080px]:row-span-2  ">
              <CurrentStatus />
            </div>
            <div className="p-2 -order-1 min-[1080px]:order-last min-[1080px]:row-span-3 bg-gray-100 dark:bg-gray-800">
              <Calendar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
