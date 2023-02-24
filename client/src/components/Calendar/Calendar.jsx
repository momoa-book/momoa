import React, { useEffect, useState } from 'react';
import { addMonths, subMonths } from 'date-fns';

import AccountsHeader from '../accountsAllList/AccountsHeader';
import AccountsList from '../accountsAllList/AccountsList';
import RenderHeader from './RenderHeader';
import RenderDays from './RenderDays';
import RenderCells from './RenderCells';

const filters = ['전체', '수입', '지출'];

export default function Calendar() {
  // 1. new Date() 날짜 가져오기
  // 2. 날짜 함수 라이브러리 date-fns 메소드 사용
  // 3. col-start에는 오늘이 속한월,년도 col-end에는 이동아이콘 2개
  // 4. 이동아이콘을 클릭했을 때, 이전월로 이동하는 함수 prevMonth & 다음월로 이동하는 함수 nextMonth
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filter, setFilter] = useState(filters[0]);

  const [accountFakeDB, setAccountFakeDB] = useState([]);

  useEffect(() => {
    fetch('data/account.json')
      .then((res) => res.json())
      .then((data) => {
        console.log('데이터 도착:', data);
        setAccountFakeDB(data);
      });
  }, []);

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const onDateClick = (day) => {
    // setSelectedDate(day);
    // const dateFormat =
    //   day.getFullYear() +
    //   '-' +
    //   (day.getMonth() + 1 < 9
    //     ? '0' + (day.getMonth() + 1)
    //     : day.getMonth() + 1) +
    //   '-' +
    //   (day.getDate() < 9 ? '0' + day.getDate() : day.getDate());
    // console.log('날짜클릭: ', dateFormat);
    // console.log('타입확인: ', typeof dateFormat);
  };

  return (
    <div className="calendar">
      <RenderHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <RenderDays />
      <RenderCells
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateClick={onDateClick}
        accountFakeDB={accountFakeDB}
      />
      <div className="h-60">
        <AccountsHeader
          filters={filters}
          filter={filter}
          onFilterChange={setFilter}
        />
        <AccountsList filter={filter} accountFakeDB={accountFakeDB} />
      </div>
    </div>
  );
}
