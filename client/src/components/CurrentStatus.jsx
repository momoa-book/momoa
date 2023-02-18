import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Graph from './Graph.jsx';

// 숫자 input 컴포넌트로 빼서 위에서도 사용해야겠다..

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
      {none && (
        <>
          <h2> 이번 달 목표를 설정해 주세요! </h2>
          <div>
            <input
              type="text"
              value={num}
              onChange={(e) => setNum(inputGoalFormat(e.target.value))}
              className="w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="ex.50,000"
            />
            <button
              onClick={() => {
                goalApi();
              }}
              className=" w-28 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              설정
            </button>
          </div>
        </>
      )}

      {!none && (
        <>
          <h1> 이번 달 예산 금액은 {num}원 입니다! </h1>
          <button
            onClick={() => setNone(true)}
            className=" w-28 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            수정
          </button>
        </>
      )}

      <div className="flex justify-between mb-1">
        <span className="text-base font-bold text-purple-700 dark:text-white">
          예산까지 {num}원 남았습니다.
          {/* 실제 연산이 된 금액이 보여지도록, num 에서 사용 금액 뺀? 콤마 붙여야함..*/}
        </span>
        <span className="text-sm font-medium text-purple-700 dark:text-white">
          {percent}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-purple-600 text-xs font-medium text-purple-100 text-center p-0.5 leading-none  rounded-full"
          style={{ width: `${percent}%` }}
        >
          {percent}
        </div>
      </div>
      <Graph />
    </>
  );
}
