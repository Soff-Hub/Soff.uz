import React, { useEffect, useState } from 'react';
import { DotChartOutlined } from '@ant-design/icons';
import { Skeleton } from 'antd';

export default function UserDashboardsChart({ data }) {
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
            labels: data?.map(el => el?.month),
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
        return <Skeleton.Node
            style={{ height: '260px' }}
            className='my-2 w-100 px-3'
            active={true}>
            <DotChartOutlined
                style={{
                    fontSize: 90,
                    color: '#bfbfbf',
                }}
            />
        </Skeleton.Node>
    }

    return (
        <div className='h-100 w-100'>
            <div id="chart-circle" className='h-100 w-100'>
                <ReactApexcharts options={props.options} series={[{
                    data: data?.map(el => el?.all_count),
                    name: "Yangi foydalanuvchilar"
                }, {
                    data: data?.map(el => el?.active_seller_count),
                    name: "Aktiv sotuvchilar"
                }, {
                    data: data?.map(el => el?.active_customer_count),
                    name: "Aktiv xaridorlar"
                }, {
                    data: data?.map(el => el?.deactive_seller_count),
                    name: "Aktivmas sotuvchilar"
                }, {
                    data: data?.map(el => el?.deactive_customer_count),
                    name: "Aktivmas xaridorlar"
                }]}
                    type="area"
                    width={'100%'}
                    height={320}
                />
            </div>
            <div id="html-dist"></div>
        </div>
    );
}