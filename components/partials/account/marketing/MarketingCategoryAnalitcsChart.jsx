import React, { useEffect, useState } from 'react';

export default function MarketingCategoryAnalyzeChart({ labels, series }) {
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
    options: {
      chart: {
        width: 300,
        type: 'donut',
      },
      labels,
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
      tooltip: {
        y: {
          formatter: (value) => `${value} %`,  // Example: you can add any format here
        }
      }
    },
  };

  if (!isClient || !ReactApexcharts) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div id="chart-circle">
        {series.some((el) => Number(el) > 0)
          ? <ReactApexcharts options={props.options} series={[{
            data: series,
            name: "Sotuv statistikasi"
          }]}
            type="area"
            width={'600px'}
          />
          : "Ma'lumot mavjud emas"}
      </div>
      <div id="html-dist"></div>
    </div>
  );
} 0