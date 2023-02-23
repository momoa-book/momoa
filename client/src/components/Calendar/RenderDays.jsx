import React from 'react';
export default function RenderDays() {
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
}
