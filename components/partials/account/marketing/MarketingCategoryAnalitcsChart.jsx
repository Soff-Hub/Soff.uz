import React, { useContext, useEffect, useState } from 'react';
import { SidebarContext } from '~/hooks/SidebarContext';

export default function MarketingCategoryAnalyzeChart({ labels, series }) {
  const [isClient, setIsClient] = useState(false);
  const [ReactApexcharts, setReactApexcharts] = useState(null);
  const { collapse } = useContext(SidebarContext)

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
        width: 400,
        type: 'donut',
        toolbar: {
          tools: {
            zoomin: false,
            zoomout: false
          }
        }
      },
      labels,
      responsive: [{
        breakpoint: 576,
        options: {
          chart: {
            width: '100%'
          },
          legend: {
            position: 'bottom',
          },
        },
      }],
      tooltip: {
        y: {
          formatter: (value) => `${value} %`,
        }
      },
      dataLabels: {
        formatter: (value) => `${value} %`
      },
    },
  };

  if (!isClient || !ReactApexcharts) {
    return <div>Loading...</div>;
  }

  return (
    <div className='h-100 w-100'>
      <div id="chart-circle" className='h-100 w-100'>
        {series.some((el) => Number(el) > 0)
          ? <ReactApexcharts options={props.options} series={[{
            data: series,
            name: "Sotuv statistikasi"
          }]}
            type="area"
            width={collapse ? 340 : 470}
          />
          : <div style={{ position: 'relative' }} className='h-100'>
            <ReactApexcharts options={props.options} series={[{
              data: [4, 1, 6, 8, 2, 10, 4],
              name: "Sotuv statistikasi"
            }]}
              type="area"
              width={collapse ? 300 : 400}
            />
            <div className='chart-blur'>
              <p>Statistikani shakllantirish uchun ma'lumot yetarli emas</p>
            </div>
          </div>}
      </div>
      <div id="html-dist"></div>
    </div>
  );
} 0