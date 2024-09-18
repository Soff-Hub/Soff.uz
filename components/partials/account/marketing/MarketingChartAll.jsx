import React, { useEffect, useState } from 'react';

export default function MarketingChartProduct({ config }) {
  const [isClient, setIsClient] = useState(false);
  const [ReactApexcharts, setReactApexcharts] = useState(null);

  useEffect(() => {
    setIsClient(true);  // Brauzerda ekanligini belgilaydi
    // Dinamik ravishda yuklash
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
        type: 'pie',
      },
      labels: config?.labels,
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
      dataLabels: {
        formatter: (val, opts) => `${opts.w.config.series[opts.seriesIndex]}`,
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
        },
      },
      tooltip: {
        custom: ({ series, seriesIndex, w }) => {
          const value = series[seriesIndex];
          const label = w.globals.labels[seriesIndex];
          return `<div class="arrow_box">
                    <span>${label}: ${value} ta</span>
                  </div>`;
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
        {props?.series?.some((el) => Number(el) > 0)
          ? <ReactApexcharts options={props.options} series={props.series} type="pie" width={350} />
          : "Ma'lumot mavjud emas"}
      </div>
      <div id="html-dist"></div>
    </div>
  );
}