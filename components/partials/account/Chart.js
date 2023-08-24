import React, { useEffect, useState } from 'react';
// import { Column } from '@ant-design/plots';
import GetRepository from '~/reositoriy-admin/GetRepository';

const Chart = () => {
    const [tableData, setTableData] = useState([]);

    
    function getMonthName(monthNumber) {
        let monthName;
        const date = monthNumber.split('-');
        switch (date?.[1]) {
            case '01':
                monthName = 'Jan';
                break;
            case '02':
                monthName = 'Feb';
                break;
            case '03':
                monthName = 'Mar';
                break;
            case '04':
                monthName = 'Apr';
                break;
            case '05':
                monthName = 'May';
                break;
            case '06':
                monthName = 'Jun';
                break;
            case '07':
                monthName = 'Jul';
                break;
            case '08':
                monthName = 'Aug';
                break;
            case '09':
                monthName = 'Sep';
                break;
            case '10':
                monthName = 'Oct';
                break;
            case '11':
                monthName = 'Nov';
                break;
            case '12':
                monthName = 'Dec';
                break;
            default:
                monthName = 'bunaqa oy yuq'; // If an invalid month name is provided
                break;
        }
        return monthName;
    }
    function getDayName(monthNumber) {
        const date = monthNumber.split('-');
        const day = date[2].split('T')
        return day[0];
    }
    async function getChartItems() {
        const ItemsChartData = await GetRepository.getChartLists();
        const objData = []
        if (ItemsChartData ) {
            if (ItemsChartData.length>1) {
                ItemsChartData.map((el) => {
                    return objData.push({
                        type: getMonthName(el.month),
                        sales: el.total,
                    });
                });
            }
            else{
                ItemsChartData.map((el) => {
                    return objData.push({
                        type: getDayName(el.month),
                        sales: el.total,
                    });
                });
            }
        }

        setTableData(objData);
    }
    const DemoColumn = () => {
        const config = {
            data: tableData || [],
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
    useEffect(() => {
        getChartItems();
    }, []);
    return <div>
        {
            <></>
        }
    </div>;
};

export default Chart;
