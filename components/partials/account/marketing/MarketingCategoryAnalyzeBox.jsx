import React from 'react'
import MarketingCategoryAnalyzeChart from './MarketingCategoryAnalitcsChart'
import MaketingTopProductsByCategory from './MaketingTopProductsByCategory'

export default function MarketingCategoryAnalyzeBox() {
    return (
        <div className='mt-5'>
            <div>
                <h3 className='fw-medium mb-3 text-center'>Sohaning daromad grafigi</h3>
            </div>

            <div className='d-flex gap-2'>
                <MarketingCategoryAnalyzeChart />
                <MaketingTopProductsByCategory />
            </div>
        </div>
    )
}
