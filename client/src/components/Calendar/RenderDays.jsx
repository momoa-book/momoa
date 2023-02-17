import React from 'react';

export default function RenderDays() {
  const days = [];
  const date = ['일', '월', '화', '수', '목', '금', '토'];
  for (let i = 0; i < 7; i++) {
    days.push(
      <div className="col p-2 text-base font-semibold" key={i}>
        {date[i]}
      </div>
    );
  }
  return <div className="days flex flex-row">{days}</div>;
}
