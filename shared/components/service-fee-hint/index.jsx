import React from 'react';
import { Tooltip } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { FaRegCircleQuestion } from 'react-icons/fa6';
import ProductRepository from '~/repositories/ProductRepository';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import styles from './style.module.scss';

// Same fee the checkout adds on top of the item price (e.g. 0.1 = 10%).
export const useServiceFeePercentage = () => {
    const { data } = useQuery({
        queryKey: ['customer-percentage'],
        queryFn: async () => {
            const response = await ProductRepository.getOrderPercentage();
            return Number(response?.data?.percentage) || 0;
        },
        staleTime: Infinity,
        cacheTime: Infinity,
        refetchOnMount: false,
    });
    return data || 0;
};

// Rounds the fee the same way the checkout does.
export const getServiceFee = (price, percentage) => Math.floor((price || 0) * percentage);

export const withServiceFee = (price, percentage) => (price || 0) + getServiceFee(price, percentage);

// "?" icon explaining that the shown price already includes the Soff.uz fee.
const ServiceFeeHint = ({ price, className }) => {
    const percentage = useServiceFeePercentage();
    if (!percentage || !price) return null;

    const percent = Math.round(percentage * 100);

    return (
        <Tooltip
            trigger={['hover', 'click']}
            title={
                <span>
                    Narx Soff.uz xizmat haqi ({percent}%) bilan ko‘rsatilgan.
                    <br />
                    Mahsulot narxi: {formatCurrencyWithSpace(price)} so’m
                    <br />
                    Xizmat haqi: {formatCurrencyWithSpace(getServiceFee(price, percentage))} so’m
                </span>
            }>
            <span
                className={`${styles.hint} ${className || ''}`}
                role="button"
                tabIndex={0}
                aria-label={`Narx Soff.uz xizmat haqi ${percent}% bilan ko‘rsatilgan`}>
                <FaRegCircleQuestion />
            </span>
        </Tooltip>
    );
};

export default ServiceFeeHint;
