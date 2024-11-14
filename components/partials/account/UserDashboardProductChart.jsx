import { Skeleton } from 'antd';
import React, { useEffect, useState, useMemo } from 'react';
import { DotChartOutlined } from '@ant-design/icons';

export default function UserDashboardProductChart({ data }) {
    const [isClient, setIsClient] = useState(false);
    const [ReactApexcharts, setReactApexcharts] = useState(null);

    useEffect(() => {
        let isMounted = true;
        setIsClient(true);

        const loadApexcharts = async () => {
            const module = await import('react-apexcharts');
            if (isMounted) {
                setReactApexcharts(() => module.default);
            }
        };

        loadApexcharts();

        return () => {
            isMounted = false;
        };
    }, []);

    const props = useMemo(() => ({
        options: {
            chart: {
                width: 400,
                type: 'donut',
                toolbar: {
                    tools: {
                        zoomin: false,
                        zoomout: false
                    },
                    show: false
                }
            },
            stroke: {
                width: 1,
            },
            labels: data?.map(el => el.month) || [], // labels uchun fallback qiymat
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
    }), [data]);

    if (!isClient || !ReactApexcharts || !data?.length) {
        return (
            <Skeleton.Node
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
        );
    }

    return (
        <div className='h-100 w-100 py-2'>
            <div id="chart-circle" className='h-100 w-100' style={{borderRadius: '12px'}}>
                <ReactApexcharts
                    key={JSON.stringify(data)} // key prop qo'shildi
                    options={props.options}
                    series={[
                        { data: data?.map(el => el?.all_doc_count), name: "Yuklangan mahsulotlar" },
                        { data: data?.map(el => el?.approved_doc_count), name: "Aktiv" },
                        { data: data?.map(el => el?.moderation_doc_count), name: "Moderatsiyada" },
                        { data: data?.map(el => el?.deleted_doc_count), name: "O'chirilgan" },
                        { data: data?.map(el => el?.cancelled_doc_count), name: "Bekor qilingan" }
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
