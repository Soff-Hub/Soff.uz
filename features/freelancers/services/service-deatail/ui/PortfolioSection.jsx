import React from 'react'
import { useTranslation } from 'next-i18next';
import styles from "../styles/detail.module.scss";
import PortfolioCard from './PortfolioCard';

const PortfolioSection = ({portfolios}) => {
    const { t } = useTranslation('orders');
    return (
        <div className={styles.portfolioSection}>
            <h2>{t('serviceDetail.portfolioSection.title')} <span>({portfolios.length} {t('serviceDetail.portfolioSection.portfolios')})</span></h2>
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