import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { FaArrowLeft, FaBoxOpen } from 'react-icons/fa6';
import { Button, Spin } from 'antd';
import RedesignModulePaymentOrderSummary from './modules/RedesignModulePaymentOrderSummary';
import FormCheckoutInformation from './modules/FormCheckoutInformation';
import styles from './checkout.module.scss';
import { cn } from '~/shared/utilities/cn';

const Checkout = () => {
    const router = useRouter();
    const { cartDataItems, playlistCartDataItems, status } = useSelector(
        (state) => state.ecomerce
    );

    if (!router.isReady) return null;

    const allItems = [
        ...(cartDataItems || []),
        ...(playlistCartDataItems || []),
    ];

    const isCartEmpty = allItems.length === 0;
    const isLoading = status === 'loading';

    if (isLoading) {
        return (
            <div className={styles.pageContainer}>
                <div className="flex justify-center items-center py-24 min-h-[300px]">
                    <Spin size="large" />
                </div>
            </div>
        );
    }

    if (isCartEmpty) {
        return (
            <div className={styles.pageContainer}>
                <div className={styles.emptyCheckout}>
                    <div className={styles.emptyIcon}>
                        <FaBoxOpen />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Savat bo'sh</h3>
                    <p className="mb-6 text-gray-500">
                        To'lov qilish uchun biror mahsulot qo'shing.
                    </p>
                    <Button
                        type="primary"
                        size="large"
                        onClick={() => router.push('/')}
                        className="rounded-lg h-12 flex items-center gap-2"
                    >
                        <FaArrowLeft />
                        Xarid qilishni boshlash
                    </Button>
                </div>
            </div>
        );
    }

    const { type: queryType, id } = router.query;
    const inferredType = queryType ||
        (playlistCartDataItems?.length > 0 ? 'playlist' : 'document');

    return (
        <div className={styles.pageContainer}>
            <div className="flex flex-col gap-6">
                <div className={styles.mainLayout}>
                    <div className={styles.orderListColumn}>
                        <div className={cn(styles.checkoutColumn, "h-full")}>
                            <RedesignModulePaymentOrderSummary />
                        </div>
                    </div>

                    <div className={styles.paymentColumn}>
                        <div className={styles.checkoutColumn}>
                            <FormCheckoutInformation
                                items={allItems}
                                type={inferredType}
                                id={id}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
