import React, { useEffect, useState } from 'react';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { Chart } from 'chart.js';
import { useSelector } from 'react-redux';

function getMonthName(monthNumber) {
    let monthName;
    switch (monthNumber) {
        case 'January':
            monthName = 'Yanvar';
            break;
        case 'February':
            monthName = 'Fevral';
            break;
        case 'March':
            monthName = 'Mart';
            break;
        case 'April':
            monthName = 'Aprel';
            break;
        case 'May':
            monthName = 'May';
            break;
        case 'June':
            monthName = 'Iyun';
            break;
        case 'July':
            monthName = 'Iyul';
            break;
        case 'August':
            monthName = 'Avgust';
            break;
        case 'September':
            monthName = 'Sentyabr';
            break;
        case 'October':
            monthName = 'Oktyabr';
            break;
        case 'November':
            monthName = 'Noyabr';
            break;
        case 'December':
            monthName = 'Dekabr';
            break;
        default:
            monthName = 'bunaqa oy yuq'; // If an invalid month name is provided
            break;
    }
    return monthName;
}


function Example({ year, month }) {
    const { user } = useSelector((state) => state.auth);

    const [tableData, setTableData] = useState({ data: [], count: [] });
    const [labels, setLabels] = useState([])

    async function getChartItems() {
        const arr = []
        const arr2 = []
        const arr3 = []
        const ItemsChartData = await GetRepository.getChartLists(user?.access, year, month);
        if (ItemsChartData) {
            for (let i = 0; i < ItemsChartData.length; i++) {
                arr.push(ItemsChartData[i].total_price);
                arr2.push(ItemsChartData[i].count);
                if (month) {
                    arr3.push(ItemsChartData[i].day.split('-')[2])
                }
                else {
                    arr3.push(getMonthName(ItemsChartData[i].month))
                }
            }
        }
        setLabels(arr3)
        setTableData({
            data: arr,
            count: arr2
        })
    }

    useEffect(() => {
        getChartItems();
    }, [year, month]);


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
                        data: tableData.data,
                        borderColor: '#3cba9f',
                        backgroundColor: '#71d1bd',
                        borderWidth: 2,
                    },
                    {
                        label: "Umumiy sotilgan mahsulotlar soni",
                        data: tableData.count,
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

    }, [tableData]);

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