import React from 'react';
import styles from './style.module.scss';
import Icon from '~/shared/ui/Icon';
import { IconType } from 'react-icons';
import { SizeType } from '~/shared/types/size';

type OrderMetaItemProps = {
    icon: IconType;
    label: string;
    value: string;
    size?: SizeType;
};

const getMetaItemSize = (size: OrderMetaItemProps['size']) => {
    switch (size) {
        case 'small':
            return {
                iconSize: 12,
                titleFontSize: '11px',
                mainFontSize: '13px',
            };
        case 'middle':
            return {
                iconSize: 14,
                titleFontSize: '12px',
                mainFontSize: '15px',
            };
        default: // large
            return {
                iconSize: 16,
                titleFontSize: '13px',
                mainFontSize: '16px',
            };
    }
};

function OrderMetaItem({
    icon,
    label,
    value,
    size = 'large',
}: OrderMetaItemProps) {
    const sizeStyles = getMetaItemSize(size);

    return (
        <div className={styles.meta}>
            <div
                className={styles.metaTitle}
                style={{ fontSize: sizeStyles.titleFontSize }}>
                <Icon icon={icon} size={sizeStyles.iconSize} /> {label}
            </div>
            <span
                className={styles.metaMain}
                style={{ fontSize: sizeStyles.mainFontSize }}>
                {value}
            </span>
        </div>
    );
}

export default OrderMetaItem;
