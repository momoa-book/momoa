import React, { useEffect, useState } from 'react';
import iconList from '../../utils/AccountIcon';

export default function AccountsList({ filter, data }) {
  const [filtered, setFiltered] = useState([]);
  console.log('data.calendar', data.calendar);
  useEffect(() => {
    getFilteredItems(data.calendar, filter);
  }, [filter]);
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

  function getFilteredItems(accountFakeDB, filter, filtered) {
    console.log('getFiltereditems');
    if (filter === '전체') {
      setFiltered(accountFakeDB);
    } else if (filter === '수입') {
      const result = accountFakeDB.filter(
        (accountFakeDB) => accountFakeDB.type === 1
      );
      setFiltered(result);
    } else if (filter === '지출') {
      const result = accountFakeDB.filter(
        (accountFakeDB) => accountFakeDB.type === 2
      );
      setFiltered(result);
    }
  }
}
