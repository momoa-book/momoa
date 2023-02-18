import React, { useState } from 'react';
import axios from 'axios';

// 숫자 input 컴포넌트로 빼서 위에서도 사용해야겠다..

export default function CurrentStatus() {
  const [num, setNum] = useState('');
  const [goal, setGoal] = useState('');
  // goal 값 전달하면 됨.. 숫자로 다 바꿔놈

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

  return (
    <>
      {!goal && (
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
                setGoal(
                  Number(num.split(',').reduce((curr, acc) => curr + acc, ''))
                );
                axios
                  .post('http://localhost:5000/api/goal', {
                    goal: goal,
                  })
                  .then((res) => {
                    console.log(res.data);
                  });
              }}
              className=" w-28 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              설정
            </button>
          </div>
        </>
      )}

      {goal && (
        <>
          <h1> 이번 달 목표 금액은 {num}원 입니다! </h1>
          <button
            onClick={() => setGoal('')}
            className=" w-28 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            수정
          </button>
        </>
      )}

      <h3> 아직 입력 된 데이터가 없습니다! </h3>
    </>
  );
}
