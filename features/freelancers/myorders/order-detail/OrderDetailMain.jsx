import React, { useState } from 'react';
import OrderMain from './ui/OrderMain';
import OrderStatus from './ui/OrderStatus';
import useGetOrderById from './api/useGetOrderById';
import { useRouter } from 'next/router';
import Loader from '~/shared/components/loader';
import CommentSection from '../../services/service-deatail/ui/CommentSection';
import styles from './style/style.module.scss';
import { FaRegCommentDots } from 'react-icons/fa';
import { useCreateChat } from '~/features/freelancers/chat/api/useCreateChat';
import Link from 'next/link';
import { Button, Badge } from 'antd';
// import OrderDrawer from './ui/OrderDrawer';

const OrderDetailMain = ({ orderData }) => {
    const router = useRouter();
    const [showStickySeller, setShowStickySeller] = useState(false);
    // const [openDrawer, setOpenDrawer] = useState(false);
    const {
        data: order,
        isError,
        isLoading,
    } = useGetOrderById(+router.query?.id, orderData, true);

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        router.push('/404');
        return null;
    }

    const handleShowStickySeller = (value) => {
        setShowStickySeller(value);
    };

    return (
        <>
            <div className="row navTabsPadding position-relative">
                <OrderMain order={order} />
                <OrderStatus
                    order={order}
                    handleShowStickySeller={handleShowStickySeller}
                />
                {/* <OrderDrawer
                    open={openDrawer}
                    onClose={() => setOpenDrawer(false)}
                    onOpen={() => setOpenDrawer(true)}
                    order={order}
                /> */}
                <StickySeller order={order} isOpen={showStickySeller} />
            </div>
            {order?.feedback && (
                <CommentSection id={router.query?.id} type={'order_id'} />
            )}
        </>
    );
};

const StickySeller = ({ order, isOpen }) => {
    const { mutate: createChat } = useCreateChat();
    return (
        <div
            className={`${styles.sellerSticky} ${
                isOpen ? styles.sellerStickyOpen : styles.sellerStickyClosed
            }`}>
            <div className="d-flex justify-content-between align-items-center w-100">
                <div className={styles.seller_box}>
                    <img
                        src={
                            order?.user?.photo_url || '/static/img/ozodbek.png'
                        }
                        alt={'USER PHOTO'}
                        width={60}
                        height={60}
                        style={{ objectFit: 'cover' }}
                    />
                    <div className="d-flex flex-column">
                        <Link
                            href={`/seller/${order?.user?.soff_seller_id}#about_author`}>
                            {order?.user?.full_name || ''}
                        </Link>
                        <span className="text-muted fs-5">Frilanser</span>
                    </div>
                </div>
                {order?.user?.soff_seller_id && (
                    <Badge
                        offset={[-10, 3]}
                        size="small"
                        count={order?.unread_messages_count}
                        onClick={() => createChat(order?.user?.soff_seller_id)}
                        color="#00a44f">
                        <Button
                            type="text"
                            icon={
                                <FaRegCommentDots
                                    style={{ fontSize: '30px' }}
                                />
                            }
                        />
                    </Badge>
                )}
            </div>
        </div>
    );
};

export default OrderDetailMain;
