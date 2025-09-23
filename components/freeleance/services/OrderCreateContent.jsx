import { Button } from 'antd';
import React from 'react'
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import { ArrowRightOutlined } from '@ant-design/icons';

const OrderCreateContent = ({ pkg, serviceName }) => {
    return (
        <div className='order_create_content'>
            <h3>Buyurtma uchun to‘lovni amalga oshiring</h3>
            <div className='security_info'>
                <img src="/static/img/services_images/Icon.png" alt="pay icon" />
                <p>Sizning to‘lovingiz Soff tizimi tomonidan xavfsiz saqlanadi. Mutaxassisga to‘lov faqat siz ishni ko‘rib chiqib, tasdiqlaganingizdan so‘ng amalga oshiriladi.</p>
            </div>
            <div className='order_package'>
                <div className='order_package_info'>
                    <div className='order_type'>
                        <img src="/static/img/services_images/order_icon.png" alt="order_icon" />
                        <h3>{pkg?.package_type}</h3>
                    </div>
                    <h3>{formatCurrencyWithSpace(pkg.price)} so'm</h3>
                </div>
                <h3>{serviceName}</h3>
            </div>
            <div className='order_create_btn'>
                <button >
                    Buyurtma berish <ArrowRightOutlined />
                </button>
            </div>
        </div>
    )
}

export default OrderCreateContent