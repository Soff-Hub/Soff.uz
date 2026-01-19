import React from 'react';
import styles from './portfolio-card.module.scss';
import Image from 'next/image';
import { truncateText } from '~/shared/utilities/utils';

type PorfolioCardProps = {
    portfolio: any;
    setPortfolio: (portfolio: any) => void;
};

function PorfolioCard({ portfolio, setPortfolio }: PorfolioCardProps) {
    const baseImageUrl =
        portfolio?.portfolio_images?.[0]?.image || '/static/img/orqafon1.avif';

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
                    <h3 className={styles.title}>{portfolio?.title}</h3>
                    <p className={styles.descr}>{portfolio?.description}</p>
                </div>
            </div>
        </div>
    );
}

export default PorfolioCard;
