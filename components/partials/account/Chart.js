import React, { useEffect, useState } from 'react';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { Chart } from "chart.js";
function Example() {
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
    console.log(tableData);
    async function getChartItems() {
        const ItemsChartData = await GetRepository.getChartLists();
        const objData = []
        if (ItemsChartData ) {
            if (ItemsChartData.length>1) {
                ItemsChartData.map((el) => {
                    return objData.push({
                        labels: getMonthName(el.month),
                        data: el.document_count,
                    });
                });
            }
            else{
                ItemsChartData.map((el) => {
                    return objData.push({
                        labels: getMonthName(el.month),
                        data: el.document_count,
                    });
                });
            }
        }

        setTableData(objData);
    }
    useEffect(() => {
        getChartItems();
    }, []);

    useEffect(() => {
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                datasets: [{
                    data: [66, 144, 146, 116, 107, 131, 43],
                    label: "Applied",
                    borderColor: "rgb(109, 253, 181)",
                    backgroundColor: "rgb(109, 253, 181,0.5)",
                    borderWidth: 2
                },
                ]
            },
        });
    }, [])


    return (
        <>
            <div className="w-[1100px] h-screen flex mx-auto my-auto">
                <div className='border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl'>
                    <canvas id='myChart'></canvas>
                </div>
            </div>
        </>
    )
}

export default Example;
