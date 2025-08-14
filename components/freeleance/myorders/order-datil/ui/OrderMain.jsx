import { Breadcrumb, Button, Table } from 'antd'
import React from 'react'
import styles from '../style/style.module.scss'

const OrderMain = () => {
    const items = [
        { title: "Mening buyurtmalarim" },
        { title: "#32333223" }
    ]

    // Table ustunlari
    const columns = [
        {
            title: 'Xizmat',
            dataIndex: 'service',
            key: 'service',
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
        }
    ]

    // Table ma'lumotlari
    const data = [
        {
            key: '1',
            service: 'Veb-sayt yaratish',
            delivery: '5 kun',
            price: '$150',
        },
    ]

    return (
        <div className='col-md-9 col-12'>
            <div className={styles.orderDetailMain}>
                <div className={styles.orderPayCard}>
                    <div>
                        <h3 className={styles.orderNameLink}>To'lov kutilmoqda</h3>
                        <p>
                            Buyurtma yaratildi, lekin hozirda sotuvchidan yashirilgan.
                            Buyurtmani moliyalashtiring va sotuvchi ishga kirishishi uchun
                            buyurtma talablarini yuboring
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

                <div className={styles.order}>
                    <div className={styles.order_info}>
                        <img src="/static/img/ozodbek.png" alt="user" />
                        <h2>this is the long title for this service</h2>
                    </div>

                    <div className={styles.order_date}>
                        <Breadcrumb items={items} />
                        <span>July 21, 2025</span>
                    </div>

                    <Table columns={columns} dataSource={data} pagination={false} />
                </div>
            </div>
        </div>
    )
}

export default OrderMain
