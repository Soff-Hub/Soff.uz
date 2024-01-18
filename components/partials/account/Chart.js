import React, { useEffect, useState } from 'react';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { Chart } from 'chart.js';
import { useSelector } from 'react-redux';

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


function Example({ year }) {
    const { user } = useSelector((state) => state.auth);

    const [tableData, setTableData] = useState([]);


    async function getChartItems() {
        const ItemsChartData = await GetRepository.getChartLists(user?.access, year);
        if (ItemsChartData) {
            const objData = [];
            if (ItemsChartData) {
                ItemsChartData.length > 0 && ItemsChartData?.map((el) => {
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
    }, [year]);
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

    const [chartData, setChartData] = useState({
        data: [],
        count: []
    })

    const convertLabel = () => {
        const arr = [];
        const arr2 = [];
        if (tableData.length > 0) {
            for (let i = 0; i < labels.length; i++) {
                if (tableData.every(el => el.labels !== labels[i])) {
                    arr.push(0);
                    arr2.push(0);
                }
                else {
                    const findedItem = tableData.find(el => el.labels === labels[i])
                    arr.push(findedItem.data);
                    arr2.push(findedItem.document_count);
                }
            }
        }
        Array(12).forEach(e => {
            arr.push(0);
            arr2.push(0);
        })
        setChartData({
            data: arr,
            count: arr2
        })
    };


    useEffect(() => {
        convertLabel();
    }, [tableData]);

    useEffect(() => {
        var body = document.getElementById('canvas')
        body.innerHTML = ''
        var canvas = document.createElement('canvas')
        var ctx = canvas.getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Umumiy ko'rilgan daromad",
                        data: chartData.data,
                        borderColor: '#3cba9f',
                        backgroundColor: '#71d1bd',
                        borderWidth: 2,
                        cubicInterpolationMode: true
                    },
                    {
                        label: "Umumiy sotilgan mahsulotlar soni",
                        data: chartData.count,
                        borderColor: '#00b4d8',
                        backgroundColor: '#00b4d8',
                        borderWidth: 2,
                    },
                ],

            }
        });
        body.appendChild(canvas)

        if (window.innerWidth < 768) {
            var body = document.getElementById('canvas')
            body.innerHTML = ''
        }

    }, [chartData]);

    return (
        <>
            <div className="w-[1100px] h-screen flex mx-auto my-auto">
                <div className="border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl" id='canvas' style={{ backgroundColor: 'white' }}>
                    <canvas id="myChart"></canvas>
                </div>
            </div>
        </>
    );
}

export default Example;