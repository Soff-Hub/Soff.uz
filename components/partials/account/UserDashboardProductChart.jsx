import React, { useEffect, useState } from 'react';

export default function UserDashboardProductChart({ data }) {
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
                width: 400,
                type: 'donut',
                toolbar: {
                    tools: {
                        zoomin: false,
                        zoomout: false
                    }
                }
            },
            stroke: {
                width: 1,
            },
            labels: data?.map(el => el.month),
            responsive: [{
                breakpoint: 576,
                options: {
                    chart: {
                        width: 300
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            }],
            tooltip: {
                y: {
                    formatter: (value) => `${value} ta`,
                }
            },
            dataLabels: {
                formatter: (value) => ``
            },
            legend: {
                position: 'top'
            }
        },
    };

    if (!isClient || !ReactApexcharts) {
        return <div>Loading...</div>;
    }

    return (
        <div className='h-100 w-100'>
            <div id="chart-circle" className='h-100 w-100'>
                <ReactApexcharts options={props.options} series={[
                    {
                        data: data?.map(el => el?.all_doc_count),
                        name: "Yuklangan mahsulotlar"
                    },
                    {
                        data: data?.map(el => el?.approved_doc_count),
                        name: "Aktiv"
                    },
                    {
                        data: data?.map(el => el?.moderation_doc_count),
                        name: "Moderatsiyada"
                    },
                    {
                        data: data?.map(el => el?.deleted_doc_count),
                        name: "O'chirilgan"
                    },
                    {
                        data: data?.map(el => el?.cancelled_doc_count),
                        name: "Bekor qilingan"
                    }
                ]}
                    type="area"
                    width={'100%'}
                    height={320}
                />
            </div>
            <div id="html-dist"></div>
        </div>
    );
}