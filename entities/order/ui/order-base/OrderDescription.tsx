import React, { useRef, useState, useEffect } from 'react';
import { FaRegPenToSquare } from 'react-icons/fa6';
import { useTranslation } from 'next-i18next';
import styles from './style.module.scss';
import Icon from '~/shared/ui/Icon';
import { SizeType } from '~/shared/types/size';

type OrderDescriptionProps = {
    order: any;
    onClick?: (order: any) => void;
    size?: SizeType;
};

const getDescriptionSize = (size: OrderDescriptionProps['size']) => {
    switch (size) {
        case 'small':
            return {
                fontSize: '11px',
                lineHeight: '1.4',
                lineClamp: 2,
                marginTop: '2px',
            };
        case 'middle':
            return {
                fontSize: '13px',
                lineHeight: '1.5',
                lineClamp: 3,
                marginTop: '3px',
            };
        default: // large
            return {
                fontSize: '14px',
                lineHeight: '1.6',
                lineClamp: 3,
                marginTop: '4px',
            };
    }
};

function OrderDescription({ order, size = 'large' }: OrderDescriptionProps) {
    const descRef = useRef<HTMLParagraphElement>(null);
    const { t } = useTranslation('card');
    const [showMore, setShowMore] = useState(false);
    const [showMoreBtn, setShowMoreBtn] = useState(false);
    const sizeStyles = getDescriptionSize(size);

    useEffect(() => {
        if (descRef.current) {
            const isOverflowing =
                descRef.current.scrollHeight > descRef.current.clientHeight + 5;
            setShowMoreBtn(isOverflowing);
        }
    }, [order.description]);

    if (order.order_type == 'custom_order') {
        return (
            <div className={styles.meta}>
                <div className={styles.metaTitle}>
                    <Icon icon={FaRegPenToSquare} />
                    {t('orderCard.description')}
                </div>

                <p
                    ref={descRef}
                    style={{
                        whiteSpace: 'pre-wrap',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: showMore
                            ? 'unset'
                            : sizeStyles.lineClamp,
                        lineHeight: sizeStyles.lineHeight,
                        fontSize: sizeStyles.fontSize,
                        marginBottom: 0,
                    }}>
                    {order.description}
                </p>

                {showMoreBtn && (
                    <span
                        onClick={() => setShowMore((prev) => !prev)}
                        style={{
                            color: '#1677ff',
                            fontWeight: 500,
                            cursor: 'pointer',
                            marginTop: sizeStyles.marginTop,
                            display: 'inline-block',
                            fontSize: sizeStyles.fontSize,
                        }}>
                        {showMore ? t('orderCard.less') : t('orderCard.more')}
                    </span>
                )}
            </div>
        );
    } else if (order.order_type == 'ready_service') {
        return (
            <div className={styles.meta}>
                <div className={styles.metaTitle}>
                    <Icon icon={FaRegPenToSquare} />{' '}
                    {t('orderCard.description')}
                </div>
                <div
                    style={{
                        fontSize: sizeStyles.fontSize,
                        lineHeight: sizeStyles.lineHeight,
                    }}
                    dangerouslySetInnerHTML={{
                        __html: order.description,
                    }}
                />
            </div>
        );
    } else {
        return null;
    }
}

export default OrderDescription;
