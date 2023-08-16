import React from 'react';
import { Column } from '@ant-design/plots';

const Chart = () => {
    const DemoColumn = () => {
        const data = [
            {
                type: 'Yanvar',
                sales: 20,
            },
            {
                type: 'Fevral',
                sales: 32,
            },
            {
                type: 'Mart',
                sales: 41,
            },
            {
                type: 'Aprel',
                sales: 51,
            },
            {
                type: 'May',
                sales: 61,
            },
            {
                type: 'Iyun',
                sales: 71,
            },
            {
                type: 'Iyul',
                sales: 80,
            },
            {
                type: 'Avgust',
                sales: 71,
            },
            {
                type: 'Sentabr',
                sales: 61,
            },
            {
                type: 'Okatbr',
                sales: 51,
            },
            {
                type: 'Noyabr',
                sales: 41,
            },
            {
                type: 'Dekabr',
                sales: 32,
            },
        ];
        const config = {
            data,
            xField: 'type',
            yField: 'sales',
            label: {
                position: 'middle',
                // 'top', 'bottom', 'middle',
                style: {
                    fill: '#FFFFFF',
                    opacity: 0.6,
                },
            },
            xAxis: {
                label: {
                    autoHide: true,
                    autoRotate: false,
                },
            },
            meta: {
                type: {
                    alias: 'Foyda',
                },
                sales: {
                    alias: 'Foyda',
                },
            },
        };
        return <Column {...config} />;
    };
    return (
        <div>
            <DemoColumn />
        </div>
    );
};

export default Chart;
