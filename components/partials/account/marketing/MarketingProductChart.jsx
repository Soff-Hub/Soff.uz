import React from 'react'
import MarketingChartProduct from './MarketingChartAll'

export default function MarketingProductChart() {

    const config = [
        {
            title: 'Mahsulotlar',
            series: [
                23,
                7,
                17,
                1,
                11,
                36
            ],
            labels: [
                'Soha 1',
                'Soha 2',
                'Soha 3',
                'Soha 4',
                'Soha 5',
                'Soha 6'
            ]
        },
        {
            title: "Ko'rishlar",
            series: [
                23,
                7,
                17,
                1,
                11,
                36
            ],
            labels: [
                'Soha 1',
                'Soha 2',
                'Soha 3',
                'Soha 4',
                'Soha 5',
                'Soha 6'
            ]
        },
        {
            title: 'Sotuvlar',
            series: [
                23,
                7,
                17,
                1,
                11,
                36
            ],
            labels: [
                'Soha 1',
                'Soha 2',
                'Soha 3',
                'Soha 4',
                'Soha 5',
                'Soha 6'
            ]
        }
    ]

    return (
        <div className='d-flex'>
            {
                config.map((el, i) => <MarketingChartProduct key={i} config={el} />)
            }
        </div>
    )
}
