import React from 'react'
import MarketingCategoryAnalyzeChart from './MarketingCategoryAnalitcsChart'
import MarketingSellingHistoryChart from './MarketingSellingHistoryChart'

export default function MarketingCategoryAnalyzeBox() {
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
        <div className='mt-5 bg-white py-5'>
            <div>
                <h3 className='fw-medium mb-3 text-center'>Sohaning daromad grafigi</h3>
            </div>

            <div className='d-flex gap-2 justify-content-evenly'>
                <MarketingCategoryAnalyzeChart />
                <MarketingSellingHistoryChart config={config} />
            </div>
        </div>
    )
}
