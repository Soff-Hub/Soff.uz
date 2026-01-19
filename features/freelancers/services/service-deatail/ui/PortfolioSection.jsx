import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import styles from '../styles/detail.module.scss';
import PortfolioCard from '~/shared/components/portfolio-card';
import PortfolioModal from '~/shared/components/portfolio-modal';

const PortfolioSection = ({ portfolios }) => {
    const { t } = useTranslation('orders');
    const [selectedPortfolio, setSelectedPortfolio] = useState(null);

    const handleSelectPortfolio = (portfolio) => {
        setSelectedPortfolio(portfolio);
    };

    return (
        <div className={styles.portfolioSection}>
            <h2>
                {t('serviceDetail.portfolioSection.title')}{' '}
                <span>
                    ({portfolios.length}{' '}
                    {t('serviceDetail.portfolioSection.portfolios')})
                </span>
            </h2>
            <div className={styles.portfolioGrid}>
                {portfolios?.map((portfolio) => (
                    <PortfolioCard
                        key={portfolio?.id}
                        portfolio={portfolio}
                        setPortfolio={handleSelectPortfolio}
                    />
                ))}
            </div>

            <PortfolioModal
                open={!!selectedPortfolio}
                onClose={() => setSelectedPortfolio(null)}
                portfolio={selectedPortfolio}
            />
        </div>
    );
};

export default PortfolioSection;
