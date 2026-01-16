import React from 'react';
import { Alert } from 'antd';
import { useTranslation } from 'next-i18next';
import { GrStatusWarning } from 'react-icons/gr';
import { SizeType } from '~/shared/types/size';

type OrderRejectedProps = {
    order: any;
    size: SizeType;
};

function OrderRejected({ order, size = 'large' }: OrderRejectedProps) {
    const { t } = useTranslation('card');
    return (
        <Alert
            icon={<GrStatusWarning />}
            message={t('orderCard.revisionReturned')}
            description={order?.order_status_doing?.reason}
            type="error"
            showIcon
            className="mb-3"
        />
    );
}

export default OrderRejected;
