import React from 'react'
import MarketingDashboardHeader from './MarketingDashboardHeader'
import MarketingProductAllList from './MarketingProductAllList'
import MarketingCategoryAnalyzeBox from './MarketingCategoryAnalyzeBox'
import MarketingMyTopProducts from './MarketingMyTopProducts'
export default function MarketingDashboard() {

    return (
        <div>
            <MarketingDashboardHeader />
            <MarketingProductAllList />
            <MarketingCategoryAnalyzeBox />
            <MarketingMyTopProducts />
        </div>
    )
}
