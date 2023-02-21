import React, { useState } from 'react';
import { GrMoney } from 'react-icons/gr';
import { CiForkAndKnife } from 'react-icons/ci';
import { AiFillEdit } from 'react-icons/ai';

export default function AccountsList({ filter }) {
  const [accounts, setAccounts] = useState([
    {
      id: '123',
      title: '급여',
      text: '2월 월급',
      total: '+3,000,000원',
      status: '수입',
    },
    {
      id: '423',
      title: '식비',
      text: '점심밥',
      total: '-10,000원',
      status: '지출',
    },
    {
      id: '534',
      title: '통신',
      text: '핸드폰 요금',
      total: '-40,000원',
      status: '지출',
    },
  ]);

  const filtered = getFilteredItems(accounts, filter);
  return (
    <table className="w-full">
      <tbody>
        {filtered.map((item) => (
          <tr>
            <td className="flex">
              <img
                className="w-8 h-8 mr-4 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="user_pic"
              />
              <span className="bg-gray-200 w-8 h-8 mr-3 rounded-full flex justify-center items-center">
                <GrMoney />
              </span>
              <span className="flex items-center">{item.title}</span>
            </td>

            <td>{item.text}</td>
            <td className="text-end">{item.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function getFilteredItems(accounts, filter) {
  if (filter === '전체') {
    return accounts;
  }
  return accounts.filter((account) => account.status === filter);
}
