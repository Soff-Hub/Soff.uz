import React, { useEffect, useState } from 'react';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { Chart } from 'chart.js';
import { useSelector } from 'react-redux';
function Example() {
    const { user } = useSelector((state) => state.auth);

    const [tableData, setTableData] = useState([]);

    function getMonthName(monthNumber) {
        let monthName;
        const date = monthNumber.split('-');
        switch (date?.[1]) {
            case '01':
                monthName = 'Yanvar';
                break;
            case '02':
                monthName = 'Fevral';
                break;
            case '03':
                monthName = 'Mart';
                break;
            case '04':
                monthName = 'Aprel';
                break;
            case '05':
                monthName = 'May';
                break;
            case '06':
                monthName = 'Iyun';
                break;
            case '07':
                monthName = 'Iyul';
                break;
            case '08':
                monthName = 'Avgust';
                break;
            case '09':
                monthName = 'Sentyabr';
                break;
            case '10':
                monthName = 'Oktyabr';
                break;
            case '11':
                monthName = 'Noyabr';
                break;
            case '12':
                monthName = 'Dekabr';
                break;
            default:
                monthName = 'bunaqa oy yuq'; // If an invalid month name is provided
                break;
        }
        return monthName;
    }
    async function getChartItems() {
        const ItemsChartData = await GetRepository.getChartLists(user?.access);
        if (ItemsChartData) {
            const objData = [];
            if (ItemsChartData) {
              ItemsChartData.length> 0 &&  ItemsChartData?.map((el) => {
                    return objData.push({
                        labels: getMonthName(el.month),
                        data: el.total_price,
                        document_count: el.document_count,
                    });
                });
            }
            setTableData(objData);
        }

    }

    useEffect(() => {
        getChartItems();
    }, []);
    const labels = [
        'Yanvar',
        'Fevral',
        'Mart',
        'Aprel',
        'May',
        'Iyun',
        'Iyul',
        'Avgust',
        'Sentyabr',
        'Oktyabr',
        'Noyabr',
        'Dekabr',
    ];

    const [data2, setData2] = useState([]);

    const convertLabel = () => {
        const arr = [];
        for (let i = 0; i < labels.length; i++) {
            for (let j = 0; j < tableData.length; j++) {
                if (labels[i] === tableData[j]?.labels) {
                    arr.push(tableData[j].data);
                } else {
                    arr.push(0);
                }
            }
        }
        setData2(arr);
    };

    useEffect(() => {
        convertLabel();
    }, [tableData]);

    useEffect(() => {
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {   label:"salom",
                        data: data2,
                        borderColor: '#3cba9f',
                        backgroundColor: '#71d1bd',
                        borderWidth: 2,
                        
                    },
                ],
                
            },
        });
    }, [data2]);

    return (
        <>
            <div className="w-[1100px] h-screen flex mx-auto my-auto">
                <div className="border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl">
                    <canvas id="myChart"></canvas>
                </div>
            </div>
        </>
    );
}

export default Example;
