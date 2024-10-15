import React, { useEffect, useState } from 'react';

export default function MarketingSellingHistoryChart({ config }) {
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
                width: '500px',
                type: 'polarArea',
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
            // title: {
            //     text: config?.title,
            //     style: {
            //         fontSize: '20px',
            //         fontWeight: 500,
            //         opacity: 0.6,
            //     },
            // },
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
            legend: {
                position: 'bottom'
            }
        },
    };

    if (!isClient || !ReactApexcharts) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ position: 'relative', flex: 1, maxWidth: '100%' }} className='d-flex justify-content-center'>
            <div id="chart-circle">
                {props?.series?.some((el) => Number(el) > 0)
                    ? <ReactApexcharts options={props.options} series={props.series} type="polarArea" width={'400px'} />
                    : <div className='chart-blur'>
                        <p>Statistikani shakllantirish uchun ma'lumot yetarli emas</p>
                    </div>}
            </div>
            <div id="html-dist"></div>
        </div>
    );
}