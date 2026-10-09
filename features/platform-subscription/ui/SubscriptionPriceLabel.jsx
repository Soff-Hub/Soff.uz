import React from 'react';
import { MdWorkspacePremium } from 'react-icons/md';
import styles from './SubscriptionPriceLabel.module.scss';

// Shown on cards in place of the price when the user's subscription covers the product.
const SubscriptionPriceLabel = ({ className = '' }) => (
    <span className={`${styles.label} ${className}`}>
        <span className={styles.icon}>
            <MdWorkspacePremium />
        </span>
        Obunangizga kiradi
    </span>
);

export default SubscriptionPriceLabel;
