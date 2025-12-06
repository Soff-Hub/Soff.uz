import React, { memo } from 'react';
import styles from './style.module.scss';
import Image from 'next/image';
import { truncateText } from '~/shared/utilities/utils';

const PortfolioCard = ({ portfolio, setPortfolio }) => {
    const baseImageUrl =
        portfolio?.portfolio_images?.[0]?.image || '/static/img/orqafon1.avif';

    // Check if the image URL already has a base URL (starts with http/https)
    const imageUrl = baseImageUrl.startsWith('http')
        ? baseImageUrl
        : `https://freelance.soff.uz/media${baseImageUrl}`;

    return (
        <div onClick={() => setPortfolio(portfolio)} className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image
                    src={imageUrl || '/static/img/no-document.png'}
                    alt={portfolio?.title || 'Portfolio image'}
                    layout="fill"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={false}
                    className={styles.image}
                />
            </div>

            <div className={styles.overlay}>
                <div className={styles.content}>
                    <h3 className={styles.title}>
                        {truncateText(portfolio?.title, 20)}
                    </h3>
                    <p className={styles.descr}>
                        {truncateText(portfolio?.description, 40)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default memo(PortfolioCard);
