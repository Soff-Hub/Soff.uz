import { Card } from 'antd';
import React, { useEffect, useState } from 'react';

export default function MarketingChartProduct({ config, colors }) {
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
        heigt: 300,
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
        // text: config?.title,
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
          return `<div className="arrow_box px-2">
                    <span>${label}: ${value} %</span>
                  </div>`;
        },
      },
      colors,
      plotOptions: {
        pie: {
          expandOnClick: false
        }
      },
      legend: {
        show: false
      }
    },
  };

  if (!isClient || !ReactApexcharts) {
    return <div>Loading...</div>;
  }

  if (props) {

  }

  return (
    <div style={{ position: 'relative' }}>
      <div id="chart-circle">
        {props?.series?.some((el) => Number(el) > 0)
          ? <ReactApexcharts options={props.options} series={props.series} type="pie" width={'100%'} />
          : <div style={{ position: 'relative' }}>
            <ReactApexcharts options={props.options} series={[2, 4, 3, 5, 1]} type="pie" width={350} />
            <div className='chart-blur'>
              <p>Statistikani shakllantirish uchun ma'lumot yetarli emas</p>
            </div>
          </div>}
      </div>
      <div id="html-dist"></div>
    </div>
  );
}