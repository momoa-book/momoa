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
  accountFakeDB,
}) {
  const monthStart = startOfMonth(currentMonth); // 오늘이 속한 달의 시작일
  const monthEnd = endOfMonth(monthStart); // 오늘이 속한 달의 마지막일
  const startDate = startOfWeek(monthStart); // monthStart 속한 주의 시작일
  const endDate = endOfWeek(monthEnd); // monthEnd가 속한 주의 마지막일

  const rows = []; // 한주 * 4또는 5주
  let days = []; // 한주
  let day = startDate;
  let formattedDate = '';
  let add = '';
  let minus = '';
  let add1 = '';

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, 'd');
      // const cloneDay = day;
      const cloneDay = format(day, 'yyyy-MM-dd');
      console.log('cloneDay???', cloneDay);
      console.log('accountFakeDB??', accountFakeDB);

      // if (cloneDay == accountFakeDB[0].input_date) {
      //   console.log('같음!!');
      // }
      let result = accountFakeDB.filter(
        (account) => account.input_date == cloneDay
      );
      console.log('result????????????', result);
      if (result[0]) {
        // add = result[0].money;
        let type1 = result[0].type == 1;

        console.log('타입은??', result[0].type == 1);
        type1 ? (add = result[0].money) : (minus = result[0].money);
      } else {
        add = '';
        minus = '';
      }

      days.push(
        <div
          className={`flex flex-row m-0 w-full h-24  ${
            !isSameMonth(day, monthStart)
              ? 'text-slate-300'
              : isSameDay(day, selectedDate)
              ? 'selected bg-violet-400 rounded-lg'
              : format(currentMonth, 'M') !== format(day, 'M')
              ? 'not-valid'
              : 'first:text-red-600 last:text-blue-600'
          }`}
          key={day}
          // onClick={() => onDateClick(parse(cloneDay))}
          onClick={() => onDateClick(cloneDay)}
        >
          <div
            className={`mt-2 mr-0 mb-0 text-center w-full ${
              !isSameDay(day, selectedDate)
                ? 'selected'
                : format(currentMonth, 'M') !== format(day, 'M')
                ? 'text not-valid'
                : ''
            }`}
          >
            {formattedDate}

            <span
              className={` block h-1/3 text-xs ${
                result[0] ? 'selected text-zinc-500' : ''
              }`}
            >
              {add}
            </span>

            <span
              className={` block h-1/3 text-xs ${
                result[0] ? 'selected text-zinc-500' : ''
              }`}
            >
              {minus}
            </span>
          </div>
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
