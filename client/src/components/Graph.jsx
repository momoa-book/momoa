import React from 'react';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

// data 서버에서 받아 오기
const data = {
  datasets: [
    {
      type: 'bar',
      label: '수입',
      backgroundColor: '#4ade80',
      data: [
        { x: '1월', y: 14 },
        { x: '2월', y: 20 },
        { x: '3월', y: 32 },
        { x: '4월', y: 41 },
        { x: '5월', y: 15 },
        { x: '6월', y: 26 },
        { x: '7월', y: 14 },
        { x: '8월', y: 20 },
        { x: '9월', y: 32 },
        { x: '10월', y: 41 },
        { x: '11월', y: 15 },
        { x: '12월', y: 26 },
      ],
    },
    {
      type: 'bar',
      label: '지출',
      backgroundColor: '#f87171',
      data: [
        { x: '1월', y: 14 },
        { x: '2월', y: 20 },
        { x: '3월', y: 32 },
        { x: '4월', y: 41 },
        { x: '5월', y: 15 },
        { x: '6월', y: 26 },
        { x: '7월', y: 14 },
        { x: '8월', y: 20 },
        { x: '9월', y: 32 },
        { x: '10월', y: 41 },
        { x: '11월', y: 15 },
        { x: '12월', y: 26 },
      ],
    },
  ],
};

const options = {
  spanGaps: true,
  maintainAspectRatio: false,
  maxBarThickness: 15,
  grouped: true,
  interaction: {
    mode: 'index',
  },
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
        padding: 10,
        color: '#999999',
        font: {
          family: "'Pretendard-Regular', sans-serif",
          lineHeight: 1,
        },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(192, 132, 252, 0.8)',
      padding: 10,
      bodySpacing: 5,
      bodyFont: {
        font: {
          family: "'Pretendard-Regular', sans-serif",
        },
      },
      usePointStyle: true,
      filter: (item) => item.parsed.y !== null,
      callbacks: {
        title: (context) => context[0].label,
        label: (context) => {
          let label = context.dataset.label + '' || '';
          return context.parsed.y !== null
            ? label + ': ' + context.parsed.y + '원'
            : null;
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawTicks: true,
        tickLength: 4,
        color: '#999999',
      },
      axis: 'x',
      position: 'bottom',
      ticks: {
        padding: 5,
        color: '#999999',
      },
    },
    y: {
      type: 'linear',
      border: { dash: [3, 3] },
      grid: {
        color: '#999999',
      },
      //max: 5,
      //min: 0,
      axis: 'y',
      display: true,
      position: 'left',
      ticks: {
        color: '#999999',
        stepSize: 15,
      },
    },
  },
};

const Graph = () => {
  return (
    <div className="relative flex flex-col p-3 bg-white  dark:bg-gray-700 w-full mb-6 shadow-lg rounded">
      <Bar type="bar" data={data} options={options} />
    </div>
  );
};

export default Graph;
