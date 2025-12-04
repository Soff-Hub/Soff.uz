import React, { useState } from 'react';
import styles from './styles/style.module.scss';
import { truncateTitle } from '~/shared/utilities/TruncateTitle';
import PortfolioDetailModal from './PortfolioDetailModal';
import Image from 'next/image';

const PortfolioCard = ({ portfolio, disableClick = false }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div
                onClick={!disableClick ? () => setOpen(true) : undefined}
                className={styles.card}>
                <Image
                    src={
                        portfolio?.portfolio_images[0]?.image ||
                        '/static/img/orqafon1.avif'
                    }
                    alt="Project"
                    className={styles.image}
                    width={400}
                    height={300}
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 400px"
                    style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                    }}
                    loading="lazy"
                />
                <div className={styles.overlay}>
                    <div className={styles.content}>
                        <h3 className={styles.title}>
                            {truncateTitle(portfolio?.title, 12)}
                        </h3>
                        <p className={styles.description}>
                            {truncateTitle(portfolio?.description, 16)}
                        </p>
                    </div>
                </div>
            </div>
            <PortfolioDetailModal
                open={open}
                onClose={() => setOpen(false)}
                portfolio={portfolio}
            />
        </>
    );
};

export default PortfolioCard;
