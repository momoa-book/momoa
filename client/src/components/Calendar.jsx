import React, { useState } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  parse,
} from 'date-fns';
import { HiArrowCircleLeft, HiArrowCircleRight } from 'react-icons/hi';
import AccountsHeader from './accountsAllList/AccountsHeader';
import AccountsList from './accountsAllList/AccountsList';

const filters = ['전체', '수입', '지출'];

export default function Calendar() {
  // 1. new Date() 날짜 가져오기
  // 2. 날짜 함수 라이브러리 date-fns 메소드 사용
  // 3. col-start에는 오늘이 속한월,년도 col-end에는 이동아이콘 2개
  // 4. 이동아이콘을 클릭했을 때, 이전월로 이동하는 함수 prevMonth & 다음월로 이동하는 함수 nextMonth
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filter, setFilter] = useState(filters[0]);

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const onDateClick = (day) => {
    setSelectedDate(day);
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
      />
      <div className="h-60">
        <AccountsHeader
          filters={filters}
          filter={filter}
          onFilterChange={setFilter}
        />
        <AccountsList filter={filter} />
      </div>
    </div>
  );
}

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
  return (
    <div className="header flex justify-between border-1">
      <div className="col flex justify-start text-lg font-semibold border-1">
        <span className="text">
          {format(currentMonth, 'yyyy')}년
          <span className="text month ml-2">{format(currentMonth, 'M')}월</span>
        </span>
      </div>
      <div className="col flex justify-items-center items-center border-1 text-gray-500">
        <HiArrowCircleLeft onClick={prevMonth} />
        <HiArrowCircleRight onClick={nextMonth} />
      </div>
    </div>
  );
};

const RenderDays = () => {
  const days = [];
  const date = ['일', '월', '화', '수', '목', '금', '토'];

  for (let i = 0; i < 7; i++) {
    days.push(
      <div
        className="w-full flex justify-start p-1 ml-2 font-semibold text-xs rounded-lg pl-2  border-1"
        key={i}
      >
        {date[i]}
      </div>
    );
  }

  return <div className="flex flex-row mt-2 border-b-2">{days}</div>;
};

const RenderCells = ({ currentMonth, selectedDate, onDateClick }) => {
  const monthStart = startOfMonth(currentMonth); // 오늘이 속한 달의 시작일
  const monthEnd = endOfMonth(monthStart); // 오늘이 속한 달의 마지막일
  const startDate = startOfWeek(monthStart); // monthStart 속한 주의 시작일
  const endDate = endOfWeek(monthEnd); // monthEnd가 속한 주의 마지막일

  const rows = []; // 한주 * 4또는 5주
  let days = []; // 한주
  let day = startDate;
  let formattedDate = '';

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, 'd');
      const cloneDay = day;
      days.push(
        <div
          className={`flex flex-row m-0 w-full h-24 ${
            !isSameMonth(day, monthStart)
              ? 'text-slate-300'
              : isSameDay(day, selectedDate)
              ? 'selected bg-violet-400'
              : format(currentMonth, 'M') !== format(day, 'M')
              ? 'not-valid'
              : 'first:text-red-600 last:text-blue-600'
          }`}
          key={day}
          onClick={() => onDateClick(parse(cloneDay))}
        >
          <span
            className={`mt-4 mr-0 mb-0 ml-4 ${
              !isSameDay(day, selectedDate)
                ? 'selected'
                : format(currentMonth, 'M') !== format(day, 'M')
                ? 'text not-valid'
                : ''
            }`}
          >
            {formattedDate}
          </span>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="flex space-between mt-1" key={day}>
        {days}
      </div>
    );
    days = [];
  }
  return <div className="body">{rows}</div>;
};
