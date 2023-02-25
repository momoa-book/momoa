import React, { useState } from 'react';
import iconList from '../../utils/AccountIcon';

export default function AccountsList({ filter, accountFakeDB, data }) {
  // const [accounts, setAccounts] = useState([
  //   {
  //     id: '123',
  //     title: '급여',
  //     text: '2월 월급',
  //     total: '+3,000,000원',
  //     status: '수입',
  //     no: 11,
  //   },
  //   {
  //     id: '548',
  //     title: '용돈',
  //     text: '새뱃돈',
  //     total: '+50,000원',
  //     status: '수입',
  //   },
  //   {
  //     id: '887',
  //     title: '금융수입',
  //     text: '현대차 주식배당금',
  //     total: '+30,000원',
  //     status: '수입',
  //   },
  //   {
  //     id: '423',
  //     title: '식비',
  //     text: '점심밥',
  //     total: '-10,000원',
  //     status: '지출',
  //   },
  //   {
  //     id: '534',
  //     title: '통신',
  //     text: '핸드폰 요금',
  //     total: '-40,000원',
  //     status: '지출',
  //   },
  //   {
  //     id: '125',
  //     title: '생활',
  //     text: '생필품',
  //     total: '-10,000원',
  //     status: '지출',
  //   },
  //   {
  //     id: '890',
  //     title: '쇼핑',
  //     text: '봄자켓',
  //     total: '-200,000원',
  //     status: '지출',
  //   },
  //   {
  //     id: '999',
  //     title: '교통',
  //     text: '택시비',
  //     total: '-9,000원',
  //     status: '지출',
  //   },
  //   {
  //     id: '589',
  //     title: '주거',
  //     text: '관리비',
  //     total: '-120,000원',
  //     status: '지출',
  //   },
  //   {
  //     id: '897',
  //     title: '의료',
  //     text: '건강검진',
  //     total: '-230,000원',
  //     status: '지출',
  //   },
  //   {
  //     id: '253',
  //     title: '금융',
  //     text: '청년청약',
  //     total: '-500,000원',
  //     status: '지출',
  //   },
  //   {
  //     id: '538',
  //     title: '문화',
  //     text: '타이타닉 영화',
  //     total: '-12,000원',
  //     status: '지출',
  //   },

  const filtered = getFilteredItems(data.calendar, filter);
  return (
    <div className="h-52 scrollbar scrollbar-thumb-violet-600 scrollbar-track-violet-50 scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-aut ">
      <table className="w-full">
        <tbody>
          {filtered?.map((item, index) => (
            <tr key={index}>
              <td className="flex">
                <img
                  className="w-8 h-8 mr-4 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  alt="user_pic"
                />
                <span className="bg-gray-200 w-8 h-8 mr-3 mb-2 rounded-full flex justify-center items-center text-gray-800">
                  {iconList[item.category]}
                </span>
                <span className="flex items-center">{item.category}</span>
              </td>

              <td>{item.memo}</td>
              <td className="text-end pr-4">{item.money}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function getFilteredItems(accountFakeDB, filter) {
  if (filter === '전체') {
    return accountFakeDB;
  }
  return accountFakeDB.filter((accountFakeDB) => accountFakeDB.type === filter);
}
