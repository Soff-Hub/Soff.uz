import { Breadcrumb, Button, Table } from 'antd'
import React from 'react'
import styles from '../style/style.module.scss'
import Link from 'next/link'
import dayjs from 'dayjs'
import 'dayjs/locale/uz-latn'; // lotincha o‘zbekcha locale

dayjs.locale('uz-latn');

const OrderMain = ({ order }) => {
    const items = [
        { title: <Link href={"/order/my-orders"}>Mening buyurtmalarim</Link> },
        { title: `#${order?.id}` }
    ]

    const columns = [
        {
            title: 'Xizmat',
            dataIndex: 'service',
            key: 'service',
            render: (text, record) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <img
                        src={record.poster}
                        alt={record.service}
                        style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }}
                    />
                    <span>{text}</span>
                </div>
            ),
        },
        {
            title: 'Yetkazish',
            dataIndex: 'delivery',
            key: 'delivery',
        },
        {
            title: 'Narx',
            dataIndex: 'price',
            key: 'price',
            render: (price) => `${price.toLocaleString('uz-UZ')} so'm`,
        }
    ]

    // Table ma'lumotlari — API'dan to‘g‘ridan-to‘g‘ri keladi
    const data = [
        {
            key: order?.id,
            service: order?.service?.title || '-',
            poster: order?.service?.poster || '/static/img/default-service.png',
            delivery: `${order?.service?.delivery_days || 0} kun`,
            price: order?.service?.price || 0,
        },
    ]

    return (
        <div className='col-lg-9 col-12 mb-5'>
            <div className={styles.orderDetailMain}>
                {order?.transaction_status === "pending" &&
                    <div className={styles.orderPayCard}>
                        <div>
                            <h3 className={styles.orderNameLink}>To'lov kutilmoqda</h3>
                            <p>
                                Buyurtma yaratildi, lekin hozirda sotuvchidan yashirilgan.
                                Buyurtmani moliyalashtiring va sotuvchi ishga kirishishi uchun
                                buyurtma talablarini yuboring.
                            </p>
                        </div>
                        <Button
                            type="primary"
                            style={{
                                backgroundColor: '#00a44f',
                                borderColor: '#00a44f',
                                padding: '16px 28px',
                            }}
                        >
                            To'lash
                        </Button>
                    </div>
                }

                <div className={styles.order}>
                    <div className={styles.order_info}>
                        <img
                            src={order?.service?.poster || '/static/img/default-service.png'}
                            alt="service"
                            style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }}
                        />
                        <h2>{order?.service?.title || 'Noma’lum xizmat'}</h2>
                    </div>

                    <div className={styles.order_date}>
                        <Breadcrumb items={items} />

                        <span>
                            {dayjs(order?.created_at).format('D MMMM YYYY')}
                        </span>
                    </div>

                    <Table columns={columns} dataSource={data} pagination={false} />
                </div>
            </div>
        </div>
    )
}

export default OrderMain
