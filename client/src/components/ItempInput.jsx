import React, { useState } from 'react';
import axios from 'axios';

export default function ItempInput() {
  const [isFilter, setisFilter] = useState();
  const [isOption, setisOption] = useState();
  const [isNum, setisNum] = useState('');
  const [isPrice, setisPrice] = useState('');
  const [isDate, setisDate] = useState();
  const [isMemo, setisMemo] = useState('');

  const selectFilter = (e) => {
    setisFilter(e.target.value);
  };

  const selectOption = (e) => {
    setisOption(e.target.value);
  };

  const selectDate = (e) => {
    setisDate(e.target.value);
  };

  const inputMemo = (e) => {
    setisMemo(e.target.value);
  };

  const inputPriceFormat = (str) => {
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

  function ItemSubmit() {
    setisPrice(Number(isNum.split(',').reduce((curr, acc) => curr + acc, '')));
    console.log(isPrice);
    axios({
      url: 'http://localhost:5000/api/', // 수정 필요
      method: 'POST',
      withCredentials: true,
      data: {
        type: isFilter,
        category: isOption,
        money: isPrice,
        input_date: isDate,
        memo: isMemo,
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          alert(error.response.data.msg);
        } else if (error.response.status === 404) {
          alert(error.response.data.msg);
        }
      });
  }

  return (
    <div className="w-full rounded p-4 bg-gray-100 dark:bg-gray-800">
      <div className="font-medium text-md text-gray-800 dark:text-gray-100 mb-4">
        사용 내역을 기록해보세요!
      </div>
      <div className="flex mb-3">
        <div className="flex items-center mr-2 pl-2 border border-gray-200 rounded dark:border-gray-700">
          <input
            type="radio"
            name="filter"
            id="filter-1"
            value="1"
            onChange={selectFilter}
            checked={isFilter === '1'}
            className="w-6 h-6 accent-purple-700"
          />
          <label
            htmlFor="filter-1"
            className="w-full p-1 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            수입
          </label>
        </div>
        <div className="flex items-center pl-2 border border-gray-200 rounded dark:border-gray-700">
          <input
            type="radio"
            name="filter"
            id="filter-2"
            value="2"
            onChange={selectFilter}
            checked={isFilter === '2'}
            className="w-6 h-6 accent-purple-700"
          />
          <label
            htmlFor="filter-2"
            className="w-full p-1 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            지출
          </label>
        </div>
      </div>

      <div className="w-full">
        <div className="flex justify-between mb-2">
          <div className="w-3/5 mr-2">
            <label className="text-sm font-medium text-gray-900 dark:text-gray-300">
              항목
            </label>

            <select
              id="item"
              onChange={selectOption}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
            >
              <option>항목을 선택하세요.</option>
              {isFilter === '1' && (
                <>
                  <option value="11">급여</option>
                  <option value="12">용돈</option>
                  <option value="13">금융수입</option>
                  <option value="14">사업수입</option>
                </>
              )}

              {isFilter === '2' && (
                <>
                  <option value="21">식비</option>
                  <option value="22">생활</option>
                  <option value="23">쇼핑</option>
                  <option value="24">교통</option>
                  <option value="25">주거</option>
                  <option value="26">통신</option>
                  <option value="27">의료</option>
                  <option value="28">금융</option>
                  <option value="29">문화</option>
                  <option value="30">교육</option>
                </>
              )}
            </select>
          </div>

          <div className="w-2/5">
            <label className="text-sm font-medium text-gray-900 dark:text-gray-300">
              금액
            </label>
            <input
              type="text"
              value={isNum}
              id="money"
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
              placeholder="ex.50,000"
              onChange={(e) => setisNum(inputPriceFormat(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="flex justify-between mb-4">
          <div className="w-2/5 mr-2">
            <label className="text-sm font-medium text-gray-900 dark:text-gray-300">
              날짜
            </label>
            <input
              type="date"
              onChange={selectDate}
              className='w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"'
            />
          </div>
          <div className="w-3/5">
            <label
              htmlFor="memo"
              className="text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              메모
            </label>
            <input
              type="text"
              id="memo"
              onChange={inputMemo}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={ItemSubmit}
          className=" w-28 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        >
          등록
        </button>
      </div>
    </div>
  );
}
