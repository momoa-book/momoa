import React from 'react';

export default function ItempInput() {
  return (
    <div className="w-72 sm:-w-full">
      <div className="flex">
        <div className="flex items-center pl-2 border border-gray-200 rounded dark:border-gray-700">
          <input
            id="bordered-radio-1"
            type="radio"
            defaultValue=""
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label className="w-full p-1 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            수입
          </label>
        </div>
        <div className="flex items-center pl-2 border border-gray-200 rounded dark:border-gray-700">
          <input
            defaultChecked=""
            id="bordered-radio-2"
            type="radio"
            defaultValue=""
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label className="w-full p-1 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            지출
          </label>
        </div>
      </div>
      <div className="flex items-center justify-around">
        <div>
          <label className=" mb-2 text-sm font-medium text-gray-900 dark:text-white">
            항목
          </label>
          <select
            id="item"
            className="w-36 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>항목을 선택하세요.</option>
            <option value="1">급여</option>
            <option value="2">용돈</option>
            <option value="3">금융수입</option>
            <option value="4">사업수입</option>
          </select>
        </div>
        <div>
          <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
            금액
          </label>
          <input
            type="number"
            id="money"
            className="w-32 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="ex.50000"
            required=""
          />
        </div>

        {/*배열 두개 만들어서 넣어주면 됨.. map으로 조건부렌더링도 걸어주고 무슨값일때 배열 뭐 렌더*/}
      </div>

      <div className="flex items-center justify-around">
        <div>
          <label className=" mb-2 text-sm font-medium text-gray-900 dark:text-white">
            메모
          </label>
          <input
            type="text"
            id="memo"
            className="w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex items-end justify-around">
        <div>
          <label className=" mb-2 text-sm font-medium text-gray-900 dark:text-white">
            날짜
          </label>
          <input
            type="text"
            className="w-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Select date"
          />
        </div>

        <button
          type="button"
          className=" w-28 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        >
          등록
        </button>
      </div>
    </div>
  );
}
