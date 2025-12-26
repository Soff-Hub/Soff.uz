import React from 'react';
import { Alert } from 'antd';
import { GrStatusWarning } from 'react-icons/gr';
import { SizeType } from '~/shared/types/size';

type OrderRejectedProps = {
    order: any;
    size: SizeType;
};

function OrderRejected({ order, size = 'large' }: OrderRejectedProps) {
    return (
        <Alert
            icon={<GrStatusWarning />}
            message="Fayl qayta ishlov uchun qaytarildi"
            description={order?.order_status_doing?.reason}
            type="error"
            showIcon
            className="mb-3"
        />
    );
}

export default OrderRejected;
