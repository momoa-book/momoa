import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Graph from './Graph';
import { HiOutlinePencilAlt } from 'react-icons/hi';

export default function CurrentStatus() {
  const [num, setNum] = useState('');
  const [goal, setGoal] = useState('');
  const [none, setNone] = useState(true);
  const [percent, setPercent] = useState(0);

  const inputGoalFormat = (str) => {
    const comma = (str) => {
      str = String(str);
      return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    };
    const uncomma = (str) => {
      str = String(str);
      return str.replace(/[^\d]+/g, '');
    };
    return comma(uncomma(str));
  };

  function goalApi() {
    setGoal(Number(num.split(',').reduce((curr, acc) => curr + acc, '')));
    setNone(false);
    axios
      .post('http://localhost:5000/api/goal', {
        goal: goal,
      })
      .then((res) => {
        console.log(res.data);
      });
  }

  useEffect(() => {
    if (goal) {
      setPercent(((5000 / goal) * 100).toFixed(1));
      // 10000 부분 사용 금액 합계로 변경해야함
    }
  }, [goal]);

  return (
    <>
      <div className="w-full rounded-lg p-6 mb-2 bg-purple-700 text-white">
        <div className="flex justify-between">
          <div className="text-xl font-medium">이번 달의 예산</div>
          {!none && (
            <div className="flex">
              <div className="text-xl font-semibold mr-2">{num}원</div>
              <HiOutlinePencilAlt
                className="h-7 w-7 hover:cursor-pointer hover:translate-y-1"
                onClick={() => setNone(true)}
              />
            </div>
          )}
        </div>
        {none && (
          <>
            <div className="flex mt-3 justify-center">
              <input
                type="text"
                value={num}
                onChange={(e) => setNum(inputGoalFormat(e.target.value))}
                className="w-full min-[1080px]:w-72 mr-2 focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 focus:ring-2 focus:ring-purple-300"
                placeholder="ex.50,000"
              />
              <button
                onClick={() => {
                  goalApi();
                }}
                className=" w-28 focus:outline-none hover:bg-purple-300 hover:text-white text-purple-700 bg-gray-50 font-medium rounded-lg text-sm px-5 py-2.5 "
              >
                설정
              </button>
            </div>
          </>
        )}
      </div>

      <div className="flex justify-between p-1 mb-1">
        {!none && (
          <>
            {percent <= 100 ? (
              <span className="text-base font-bold text-gray-800 dark:text-gray-50">
                예산까지 {num}원 남았습니다.
                {/* 실제 연산이 된 금액이 보여지도록, num 에서 사용 금액 뺀? 콤마 붙여야함..*/}
              </span>
            ) : (
              <span className="text-base font-bold text-red-700">
                예산에서 {num}원 초과되었습니다.
                {/* 실제 연산이 된 금액이 보여지도록, num 에서 사용 금액 뺀? 콤마 붙여야함..*/}
              </span>
            )}
          </>
        )}
        <span className="text-sm font-medium ml-auto text-gray-800 dark:text-gray-50">
          {percent}%
        </span>
      </div>

      <div className="w-full rounded-full h-3.5 bg-gray-200 dark:bg-gray-700">
        {percent <= 100 && (
          <div
            className="bg-purple-600 text-xs font-medium text-purple-100 text-center p-0.5 leading-none  rounded-full"
            style={{ width: `${percent}%` }}
          >
            {percent}
          </div>
        )}

        {percent > 100 && (
          <div
            className="bg-red-600 text-xs font-medium text-red-100 text-center p-0.5 leading-none  rounded-full"
            style={{ width: '100%' }}
          >
            {percent}
          </div>
        )}
      </div>

      <div className="mt-4">
        <Graph />
      </div>
    </>
  );
}
