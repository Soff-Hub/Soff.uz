import React from 'react';
import Link from 'next/link';
import { soffiaIconSVG3 } from './HeaderAIIcon';
import styles from './header-actions.module.scss';

const HeaderAISoffia = () => {
    return (
        <Link href="/soffia" legacyBehavior>
            <a className={styles.headerAIButton}>
                <div className={styles.aiIconWrapper}>
                    {soffiaIconSVG3}
                    <div className={styles.aiPulse}></div>
                </div>
                <div className={styles.aiContent}>
                    <span className={styles.aiTitle}>Soffia AI</span>
                    <span className={styles.aiBadge}>NEW</span>
                </div>
            </a>
        </Link>
    );
};

export default HeaderAISoffia;
