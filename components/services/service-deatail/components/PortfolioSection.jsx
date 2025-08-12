import React from 'react'
import PortfolioCard from '~/components/shared/seller-profile/portfolioCard'
import styles from "../styles/detail.module.scss";

const PortfolioSection = ({portfolios}) => {
    return (
        <div className={styles.portfolioSection}>
            <h2>Portfolio <span>(5 ta portfolio)</span></h2>
            <div className='row row-gap-5'>
                {portfolios?.map(portfolio => 
                    <div className='col-4'>
                        <PortfolioCard item={portfolio} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default PortfolioSection