import React from 'react';
import { MdOutlineWorkspacePremium } from 'react-icons/md';
import { useSubscriptionStatus, useUpgradeTierTitle } from '../model';
import styles from './SubscriptionBadge.module.scss';

const SubscriptionBadge = ({ product, className = '' }) => {
    const status = useSubscriptionStatus(product);
    const upgradeTitle = useUpgradeTierTitle(product);

    if (status === 'none') return null;

    const label =
        status === 'mine'
            ? 'Obunangizda'
            : status === 'higher' && upgradeTitle
              ? `${upgradeTitle} obunada`
              : 'Obunada';

    return (
        <span className={`${styles.badge} ${status === 'higher' ? styles.higher : ''} ${className}`}>
            <MdOutlineWorkspacePremium /> {label}
        </span>
    );
};

export default SubscriptionBadge;
