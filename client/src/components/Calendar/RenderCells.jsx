import React from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  parse,
} from 'date-fns';

export default function RenderCells({
  currentMonth,
  selectedDate,
  onDateClick,
}) {
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
          // onClick={() => onDateClick(parse(cloneDay))}
          onClick={() => onDateClick(cloneDay)}
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
}