import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { connect, useDispatch } from 'react-redux';
import { calculateAmount } from '~/shared/utilities/ecomerce-helpers';
import ProductRepository from '~/repositories/ProductRepository';
import { addPeriodToThousands } from '../price-formatter';
import { Skeleton } from 'antd';
import useCart from '~/shared/hooks/useCart';
import { setShowSearch } from '~/store/fast-dowload/slice';
import { cn, useRcn } from '~/shared/utilities/cn';
import { fileColors } from '~/components/details-components/details-actions/file-actions';

const RedesignModulePaymentOrderSummary = ({ ecomerce }) => {
    const [percentage, setPercentage] = useState(0);
    const { removeCartOneItem } = useCart();
    const dispatch = useDispatch();

    const fontSizeClass = useRcn({
        mobile: 'text-sm',
        tablet: 'text-lg',
        desktop: 'text-xl',
    });

    const produtsHeightClass = useRcn({
        mobile: 'max-h-[200px]',
        tablet: 'max-h-[300px]',
        desktop: 'h-auto',
    });
    let amount = calculateAmount(ecomerce.cartDataItems);

    async function getPercentage() {
        const responseData = await ProductRepository.getOrderPercentage();
        if (responseData) {
            setPercentage(Number(responseData?.data?.percentage));
        }
    }

    const hisob = addPeriodToThousands(
        amount + Math.floor(amount * percentage)
    );
    const hisobb = addPeriodToThousands(Math.floor(amount * percentage));

    const handleRemoveItem = async (e, item) => {
        e.preventDefault();
        removeCartOneItem(item.id);
    };

    useEffect(() => {
        getPercentage();
    }, []);

    useEffect(() => {
        dispatch(setShowSearch(false));
        return () => {
            dispatch(setShowSearch(true));
        };
    }, [dispatch]);

    return (
        <div
            className={cn(
                'bg-white',
                'rounded-xl',
                'shadow-sm',
                'flex',
                'flex-col'
            )}>
            <p
                className={cn(
                    'text-dark',
                    'font-semibold',
                    'm-0',
                    'px-4',
                    'py-2'
                )}>
                {ecomerce.cartDataItems.length} ta mahsulot
            </p>
            <div
                className={cn(
                    'flex-1',
                    'overflow-y-auto',
                    'px-4',
                    'space-y-3',
                    'py-2',
                    produtsHeightClass
                )}>
                {ecomerce.cartDataItems && ecomerce.cartDataItems.length > 0 ? (
                    ecomerce.cartDataItems.map(item => (
                        <div
                            key={item.id}
                            className={cn(
                                'flex',
                                'items-start',
                                'justify-between',
                                'p-3',
                                'border',
                                'rounded-lg',
                                'hover:shadow-md',
                                'transition'
                            )}>
                            <div className={cn('flex-1')}>
                                <Link href={`/product/${item.slug}`}>
                                    <a>
                                        <p
                                            className={cn(
                                                'font-semibold',
                                                'text-sm',
                                                'md:text-base',
                                                'mb-2',
                                                'line-clamp-2'
                                            )}>
                                            {item.title}
                                        </p>
                                    </a>
                                </Link>
                                <span
                                    className={cn(
                                        'text-white',
                                        'px-2',
                                        'py-1',
                                        'rounded'
                                    )}
                                    style={{
                                        background:
                                            fileColors[item?.file_type] ||
                                            '#007DFF',
                                    }}>
                                    {item?.file_type}
                                </span>
                            </div>

                            <div
                                className={cn(
                                    'flex',
                                    'flex-col',
                                    'items-end',
                                    'gap-2',
                                    'min-w-[90px]'
                                )}>
                                <button
                                    onClick={e => handleRemoveItem(e, item)}
                                    className={cn(
                                        'transition',
                                        'border',
                                        'rounded-full',
                                        'p-1',
                                        'hover:bg-gray-100'
                                    )}>
                                    <img
                                        src="/static/img/xicon.svg"
                                        alt="delete"
                                        className="w-4 h-4"
                                    />
                                </button>

                                {item.discount === 0 ? (
                                    <p
                                        className={cn(
                                            'font-medium',
                                            'text-sm',
                                            'md:text-base',
                                            'text-gray-800',
                                            'm-0'
                                        )}>
                                        {addPeriodToThousands(item.price)} so'm
                                    </p>
                                ) : (
                                    <div
                                        className={cn(
                                            'flex',
                                            'flex-col',
                                            'items-end'
                                        )}>
                                        <del
                                            className={cn(
                                                'text-gray-400',
                                                'text-xs',
                                                'md:text-sm'
                                            )}>
                                            {addPeriodToThousands(item.price)}{' '}
                                            so'm
                                        </del>
                                        <p
                                            className={cn(
                                                'font-semibold',
                                                'text-sm',
                                                'md:text-base',
                                                'text-red-500',
                                                'm-0'
                                            )}>
                                            {addPeriodToThousands(
                                                item.discount_price
                                            )}{' '}
                                            so'm
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <>
                        <Skeleton active paragraph={{ rows: 7 }} />
                    </>
                )}
            </div>

            {/* Footer */}
            {ecomerce.cartDataItems && ecomerce.cartDataItems.length > 0 && (
                <div className={cn('border-t', 'p-4', 'bg-gray-50')}>
                    {percentage > 0 && (
                        <div
                            className={cn(
                                'flex',
                                'justify-between',
                                'items-center',
                                'mb-2'
                            )}>
                            <p className={cn('mb-0', 'text-sm')}>
                                Sayt xizmat haqi uchun:
                            </p>
                            <p className={cn('mb-0', 'text-sm', 'font-medium')}>
                                {hisobb} so'm ({percentage * 100}%)
                            </p>
                        </div>
                    )}
                    <div
                        className={cn(
                            'flex',
                            'justify-between',
                            'items-center'
                        )}>
                        <p className={cn('font-bold', 'mb-0', fontSizeClass)}>
                            Jami narx:
                        </p>
                        <p className={cn('font-bold', 'mb-0', fontSizeClass)}>
                            {hisob} so'm
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default connect(state => state)(RedesignModulePaymentOrderSummary);
