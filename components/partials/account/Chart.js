import React, { useEffect } from 'react';
import { Chart } from 'chart.js';
import { useSelector } from 'react-redux';
import { useFetchDashboardIncomeQuery } from '~/rtk-store/dashboard/api';

function renderLabels(arr, month) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (month) {
            result.push(arr[i].date.split('-')[2]);
        } else {
            result.push(arr[i].date);
        }
    }

    return result;
}

function renderCount(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        result.push(arr[i].count);
    }

    return result;
}

function renderPrice(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        result.push(arr[i].total_price);
    }

    return result;
}

function Example() {
    const { profile } = useSelector((state) => state?.ecomerce);
    const { graphParams } = useSelector((state) => state.dashboard);
    const { year, month } = graphParams;
    const { data } = useFetchDashboardIncomeQuery(
        profile?.role === 'seller'
            ? `/seller/chart/?year=${year}&month=${month}`
            : `/seller/admin/chart/?year=${year}&month=${month}`
    );

    const labels = data ? renderLabels(data, !!month) : [];
    const count = data ? renderCount(data) : [];
    const prices = data ? renderPrice(data) : [];

    useEffect(() => {
        if (data) {
            var body = document.getElementById('canvas');
            body.innerHTML = '';
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: "Umumiy ko'rilgan daromad",
                            data: prices,
                            borderColor: '#3cba9f',
                            backgroundColor: '#71d1bd',
                            borderWidth: 2,
                        },
                        {
                            label: 'Umumiy sotilgan mahsulotlar soni',
                            data: count,
                            borderColor: '#00b4d8',
                            backgroundColor: '#00b4d8',
                            borderWidth: 2,
                        },
                    ],
                },
            });
            body.appendChild(canvas);

            if (window.innerWidth < 768) {
                var body = document.getElementById('canvas');
                body.innerHTML = '';
            }
        }
    }, [labels, count, prices]);

    return (
        <>
            <div className="w-[1100px] h-screen flex mx-auto my-auto">
                <div
                    className="border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl"
                    id="canvas"
                    style={{ backgroundColor: 'white' }}>
                    <canvas id="myChart"></canvas>
                </div>
            </div>
        </>
    );
}

export default Example;
