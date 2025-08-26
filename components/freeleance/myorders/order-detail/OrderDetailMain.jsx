import React, { useEffect } from 'react';
import OrderMain from './ui/OrderMain';
import OrderStatus from './ui/OrderStatus';
import useGetOrderById from './api/useGetOrderById';
import { useRouter } from 'next/router';
import CommentSection from '../../services/service-deatail/ui/CommentSection';
import Loader from '~/components/shared/loader';

const OrderDetailMain = () => {
    const router = useRouter();
    const { data: order, error, isLoading } = useGetOrderById(router.query?.id);

    if (isLoading) {
        return <Loader />;
    }
    if (order === undefined) {
        router.push('/404');
    }
    return (
        <div className="row navTabsPadding">
            {order && (
                <>
                    <OrderMain order={order} />
                    <OrderStatus order={order} />
                </>
            )}
            {order?.feedback && (
                <CommentSection id={router.query?.id} type={'order_id'} />
            )}
        </div>
    );
};

export default OrderDetailMain;
