import React from 'react'
import MarketingProductChart from './MarketingProductChart'

export default function MarketingProductAllList() {

    return (
        <div className='d-flex flex-column mt-5 bg-white py-5'>
            <div>
                <h3 className='fw-medium mb-3 text-center'>Umumiy statistika</h3>
            </div>

            <MarketingProductChart />
        </div>
    )
}
