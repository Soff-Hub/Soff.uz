import React from 'react'
import styles from '../style/style.module.scss'
import { Button, Steps } from 'antd'
import { MessageOutlined } from "@ant-design/icons";
import useCreateChat from '~/components/freeleance/chat/api/useCreateChat';
import Link from 'next/link';
import Image from 'next/image';


const OrderStatus = ({ order }) => {
    const priceFormatted = new Intl.NumberFormat('uz-UZ').format(order?.service?.price) + " so'm"
    const { mutate: createChat } = useCreateChat()

    const orderStatus = {
        "pending": 1,
        "approved": 2,
        "requirement_file": 3,
        "requirement_file_rejected": 2,
        "order_accepted": 4,
        "rejected": 4,
        "order_file_sent": 5,
        "completed": 6,
    }


    const orderStatusName = {
        "pending": "Buyurtma yaratildi",
        "approved": "To'lov amalga oshirildi",
        "requirement_file": "Buyurtma talablari jo'natildi",
        "requirement_file_rejected": "Buyurma talablari to'liq emas",
        "order_accepted": "Buyurtma qabul qilindi",
        "order_file_sent": "Tasdiqlash uchun topshirildi",
        "completed": "Buyurtma tugallandi",
        "rejected": "Fayl to'liq emas"
    }

    return (
        <div className='col-12 col-lg-3'>
            {/* Order info */}
            <div className={styles.status}>
                <div className={styles.status_info}>
                    <span>Buyurtma holati</span>
                    <p>
                        {orderStatusName[order?.order_status_doing?.status]}
                    </p>
                </div>
                <div className={styles.status_price}>
                    <span>Buyurtma narxi</span>
                    <p>{priceFormatted}</p>
                </div>
            </div>

            {/* Seller info */}
            <div className={styles.seller}>
                <span>Sotuvchi</span>
                <div className={styles.seller_box}>
                    <div>
                        <Link href={`/user/${order?.user?.id}`}>{order?.user?.full_name || ''}</Link>
                    </div>
                    <Image
                        src={order?.user?.photo_url || '/static/img/default-user.png'}
                        alt={'USER PHOTO'}
                        width={60}
                        height={60}
                        style={{ objectFit: 'cover' }}
                    />
                </div>
            </div>
            {order?.user?.soff_seller_id &&
                <div className="mb-0">
                    <Button
                        onClick={() => createChat(order?.user?.soff_seller_id)}
                        icon={<MessageOutlined />}
                        size="large"
                        className="w-100 rounded-0"
                    >
                        Chat
                    </Button>
                </div>
            }


            {/* Steps */}
            <div className={styles.status_steps}>
                <Steps
                    direction="vertical"
                    className={styles.greenSteps}
                    current={orderStatus[order?.order_status_doing?.status]}
                    status={
                        order?.order_status_doing?.status === "requirement_file_rejected" || order?.order_status_doing?.status === "rejected"
                            ? "error"
                            : "process"
                    }
                    items={[
                        { title: `Buyurtma yaratildi` },
                        { title: "To'lov qilindi" },
                        { title: "Buyurtma talablari jo'natildi" },
                        { title: "Buyurtma qabul qilindi" },
                        { title: "Tasdiqlash uchun topshirildi" },
                        { title: "Buyurtma tugallandi" },
                    ]}
                />
            </div>
        </div>
    )
}

export default OrderStatus
