import { addMonths, subMonths } from 'date-fns';
import React, { useState } from 'react';
import RenderCells from './Calendar/RenderCells';
import RenderDays from './Calendar/RenderDays';
import RenderHeader from './Calendar/RenderHeader';

export default function Calendar() {
  // 오늘 날짜 가져오기
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
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
      {/* <div className="header">Header</div> */}

      {/* <div className="days">Days</div> */}
      {/* <div className="body">Cells</div> */}
    </div>
  );
}
