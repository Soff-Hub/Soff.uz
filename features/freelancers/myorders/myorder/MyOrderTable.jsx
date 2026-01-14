import React, { useEffect, useMemo, useRef, useState } from 'react';
import useGetOrders from './api/useGetOrders';
import SelectOrderDrawer from './ui/SelectOrderDrawer';
import Loader from '~/shared/components/loader';
import { useRouter } from 'next/router';
import { EmptyTab } from './MyOrderTabs';
import { ClipLoader } from 'react-spinners';
import OrderCancelModal from '~/features/order-cancel';
import OrderCard from '~/widgets/order-card';
import OrderApproveFiles from '~/features/order-approve-files';
import { useQueryClient } from '@tanstack/react-query';
import useResponsive from '~/shared/utilities/useResponsive';
import { useTranslation } from 'next-i18next';

export const AllOrdersTable = ({ type }) => {
    const { t } = useTranslation('my-orders');
    const { isMobile } = useResponsive();
    const queryClient = useQueryClient();
    const router = useRouter();
    const {
        data: ordersData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading: ordersLoading,
    } = useGetOrders({ status: type });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [res, setRes] = useState('');
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const loadMoreRef = useRef(null);

    const { orderId } = router.query;

    const handleOpenDrawer = (order) => {
        setSelectedOrder(order);
        setOpenDrawer(true);
    };

    const handleCancelClick = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const orders = useMemo(() => {
        if (!ordersData || !ordersData?.pages?.length) return [];
        const mergedOrders = ordersData.pages.flatMap((page) => page.results);
        return mergedOrders;
    }, [ordersData, type]);

    useEffect(() => {
        if (!loadMoreRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (
                    entries[0].isIntersecting &&
                    hasNextPage &&
                    !isFetchingNextPage
                ) {
                    fetchNextPage();
                }
            },
            { threshold: 1 }
        );
        observer.observe(loadMoreRef.current);

        return () => {
            if (loadMoreRef.current) {
                observer.unobserve(loadMoreRef.current);
            }
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    let ordersContent = null;
    if (ordersLoading) {
        ordersContent = (
            <div
                style={{
                    minHeight: '60vh',
                }}>
                <Loader />
            </div>
        );
    } else if (orders.length) {
        ordersContent = (
            <>
                {orders.map((order) => (
                    <OrderCard
                        key={order.id}
                        withFiles
                        withCollapse
                        withRejectedStatus
                        order={order}
                        onClick={handleOpenDrawer}
                        onCancel={handleCancelClick}
                        setSelectedOrder={setSelectedOrder}
                        fileSize={isMobile ? 'small' : 'middle'}
                        setRes={setRes}
                        setFeedbackOpen={setFeedbackOpen}
                    />
                ))}
                <div ref={loadMoreRef} style={{ height: 1 }} />

                {hasNextPage && (
                    <div style={{ margin: '10px auto' }}>
                        <ClipLoader color="green" />
                    </div>
                )}
            </>
        );
    } else {
        ordersContent = <EmptyTab description={t('emptyStates.noOrders')} />;
    }

    useEffect(() => {
        if (orderId && orders.length) {
            const found = orders.find((o) => o.id === Number(orderId));
            if (found) {
                setSelectedOrder(found);
                setOpenDrawer(true);

                const { orderId, ...rest } = router.query;
                router.replace(
                    {
                        pathname: router.pathname,
                        query: rest,
                    },
                    undefined,
                    { shallow: true } // sahifani qayta yuklamasdan
                );
            }
        }
    }, [orderId, orders]);

    useEffect(() => {
        if (orders.length) {
            setSelectedOrder((prev) => {
                if (!prev) return null;
                return orders.find((o) => o.id === prev.id) || null;
            });
        }
    }, [orders]);

    return (
        <>
            <div className="d-flex flex-column gap-3">{ordersContent}</div>
            <OrderCancelModal
                isOpen={isModalOpen}
                selectedOrder={selectedOrder}
                onClose={() => setIsModalOpen(false)}
            />
            <SelectOrderDrawer
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                onOpen={() => setOpenDrawer(true)}
                order={selectedOrder}
            />
            <OrderApproveFiles
                order={selectedOrder}
                res={res}
                setRes={setRes}
                feedbackOpen={feedbackOpen}
                setFeedbackOpen={setFeedbackOpen}
                onSuccess={() => {
                    queryClient.invalidateQueries({ queryKey: ['orders'] });
                }}
            />
        </>
    );
};
