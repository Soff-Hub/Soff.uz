import React from 'react';
import { MdOutlineWorkspacePremium } from 'react-icons/md';
import styles from './SubscriptionBadge.module.scss';

const SubscriptionBadge = ({ product, className = '' }) => {
    if (!product?.in_platform_sub) return null;
    return (
        <span className={`${styles.badge} ${className}`}>
            <MdOutlineWorkspacePremium /> Obunada
        </span>
    );
};

export default SubscriptionBadge;
