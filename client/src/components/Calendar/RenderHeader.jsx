import React from 'react';
import { format } from 'date-fns';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';

export default function RenderHeader({ currentMonth, prevMonth, nextMonth }) {
  return (
    <div className="header flex flex-row justify-between">
      <div className="col col-start-auto">
        <span className="text">{format(currentMonth, 'M')}월</span>
        {format(currentMonth, 'yyyy')}
      </div>
      <div className="col col-end-auto">
        <FaArrowCircleLeft className="inline" onClick={prevMonth} />
        <FaArrowCircleRight className="inline" onClick={nextMonth} />
      </div>
    </div>
  );
}
