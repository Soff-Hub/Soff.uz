import React, { useEffect, useState } from 'react';

const seriesData = [6, 4, 12, 6, 7, 3, 2, 9];


export default function MarketingCategoryAnalyzeChart({ config }) {
  const [isClient, setIsClient] = useState(false);
  const [ReactApexcharts, setReactApexcharts] = useState(null);

  useEffect(() => {
    setIsClient(true);
    const loadApexcharts = async () => {
      const module = await import('react-apexcharts');
      setReactApexcharts(() => module.default);
    };
    loadApexcharts();
  }, []);

  const props = {
    series: config?.series,
    options: {
      chart: {
        width: 300,
        type: 'donut',
      },
      labels: seriesData.map(el => `ser-${el}`),
      responsive: [{
        breakpoint: 576,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom',
          },
        },
      }],
      title: {
        text: config?.title,
        style: {
          fontSize: '20px',
          fontWeight: 500,
          opacity: 0.6,
        },
      },
    },
  };

  if (!isClient || !ReactApexcharts) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div id="chart-circle">
        {seriesData.some((el) => Number(el) > 0)
          ? <ReactApexcharts options={props.options} series={[{
            data: seriesData
          }]}
            type="area"
            width={'600px'}
          />
          : "Ma'lumot mavjud emas"}
      </div>
      <div id="html-dist"></div>
    </div>
  );
}0