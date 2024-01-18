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
                arr2.push(ItemsChartData[i].document_count);
                arr3.push(ItemsChartData[i].label)
            }
        }
        await setLabels(arr3)
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