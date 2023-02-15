import React from 'react';

export default function CurrentStatus() {
  return (
    <>
      <h2> 이번 달 목표를 설정해 주세요! </h2>
      <div>
        <input
          type="number"
          id="money"
          className="w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="ex.50,000"
          required=""
        />
      </div>
    </>
  );
}
