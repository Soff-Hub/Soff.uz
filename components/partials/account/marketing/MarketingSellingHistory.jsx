import React from 'react'
import MarketingSellingHistoryChart from './MarketingSellingHistoryChart'
import MarketingSelledProducts from './MarketingSelledProducts'

export default function MarketingSellingHistory() {

    const config = {
        title: 'Mahsulotlar',
        series: [56, 78, 103],
        labels: [
            '0 - 10,000 UZS',
            '10,000 - 15,000 UZS',
            '15,000 - 20,000 UZS',
        ]
    }

    return (
        <div className='mt-4'>
            <div>
                <h3 className='fw-medium mb-3 text-center'>Sotilgan mahsulotlar narx bo'yicha</h3>
            </div>

            <div className='d-flex gap-2'>
                <MarketingSellingHistoryChart config={config} />
                <MarketingSelledProducts />
            </div>
        </div>
    )
}
