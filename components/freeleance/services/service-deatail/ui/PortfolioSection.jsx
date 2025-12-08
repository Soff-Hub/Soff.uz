import React from 'react'
import styles from "../styles/detail.module.scss";
import PortfolioCard from './PortfolioCard';

const PortfolioSection = ({portfolios}) => {
    return (
        <div className={styles.portfolioSection}>
            <h2>Portfolio <span>({portfolios.length} ta portfolio)</span></h2>
            <div className='row row-gap-5'>
                {portfolios?.map(portfolio => 
                    <div key={portfolio?.id} className='col-4'>
                        <PortfolioCard portfolio={portfolio} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default PortfolioSection