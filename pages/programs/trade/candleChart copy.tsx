import React, { useState, useEffect } from 'react';
// import ReactApexChart from 'react-apexcharts';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';

const LineChart = () => {
  const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

  const chartData = {
    series: [
      {
        name: 'High - 2013',
        data: [28, 29, 33, 36, 32, 32, 33],
      },
      {
        name: 'Low - 2013',
        data: [12, 11, 14, 18, 17, 13, 13],
      },
    ],
    options: {
      // Your options here
    },
  };
  return (
    <div id="chart">
      {ReactApexChart ? (
        <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default LineChart;