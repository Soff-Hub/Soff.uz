import React from 'react'
import PortfolioCard from '~/components/shared/seller-profile/portfolioCard'

const ServicePortfolio = ({portfolios}) => {
  return (
    <div className='bg-white rounded-4 p-5'>
        <h2 className='detail_h2'>Portfolio</h2>
        <div className='row'>
            {portfolios?.map(item => (
              <div className='col-12 col-sm-6 col-lg-4 mb-3 justify-content-center d-flex'>
                <PortfolioCard portfolioData={portfolios} item={item}/>
              </div>

            ))}
        </div>
    </div>
  )
}

export default ServicePortfolio