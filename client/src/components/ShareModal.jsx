import React from 'react';

export default function ShareModal() {
  return (
    <>
      <div className="absolute right-0 z-10 mt-[160px] min-[1080px]:w-96 w-72 origin-top-right rounded-md bg-white dark:bg-gray-700 shadow-lg ">
        <div className="py-1">
          <div className="flex text-sm px-4 py-2 text-gray-900 dark:text-white ">
            <input
              type="text"
              //onChange={(e) => setNum(inputGoalFormat(e.target.value))}
              className="min-[1080px]:w-4/5 w-2/3 mr-2 focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 focus:ring-2 focus:ring-purple-300"
              placeholder="이메일로 초대해보세요."
            />
            <button
              // onClick={() => {}}
              className="min-[1080px]:w-1/5 w-1/3 focus:outline-none bg-purple-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 "
            >
              초대
            </button>
          </div>
          <div className="flex text-xs px-4 py-2 text-gray-900 dark:text-white ">
            현재 모모아 회원끼리 공유 및 편집 기능을 사용할 수 있습니다.
          </div>
        </div>
      </div>
    </>
  );
}
