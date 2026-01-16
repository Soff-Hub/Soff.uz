import React from 'react';
import { Button } from 'antd';
import { useTranslation } from 'next-i18next';
import { DownloadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import Icon from '~/shared/ui/Icon';
import { formatFileSize } from '~/shared/utilities/utils';
import { downloadFile } from '~/shared/utilities/utils';
import { FiFileText } from 'react-icons/fi';
import styles from './order-files.module.scss';
import { extractName } from '~/entities/order/model/utils';
import { SizeType } from '~/shared/types/size';

type OrderFileProps = {
    file: any;
    size?: SizeType;
};

const getSizeStyles = (size: OrderFileProps['size']) => {
    switch (size) {
        case 'small':
            return {
                textFontSize: '11px',
                metaFontSize: '10px',
                buttonPadding: '4px 8px',
                buttonFontSize: '11px',
                iconSize: '14px',
                downloadIconSize: '12px',
            };
        case 'middle':
            return {
                textFontSize: '13px',
                metaFontSize: '12px',
                buttonPadding: '6px 12px',
                buttonFontSize: '13px',
                iconSize: '16px',
                downloadIconSize: '14px',
            };
        default: // large
            return {
                textFontSize: '14px',
                metaFontSize: '13px',
                buttonPadding: '8px 16px',
                buttonFontSize: '14px',
                iconSize: '18px',
                downloadIconSize: '16px',
            };
    }
};

function OrderFile({ file, size = 'large' }: OrderFileProps) {
    const sizeStyles = getSizeStyles(size);
    const { t } = useTranslation('card');

    // Get CSS class names based on size
    const getFileCardClassName = () => {
        return `${styles.orderConfirmFile} ${styles[size]}`;
    };

    const getIconWrapperClassName = () => {
        return `${styles.orderConfirmFileIconWrapper} ${styles[size]}`;
    };

    console.log({ file });

    return (
        <div key={file.url} className={getFileCardClassName()}>
            <div className={styles.orderConfirmFileInfo}>
                <div className={getIconWrapperClassName()}>
                    <Icon
                        icon={FiFileText}
                        className={styles.orderConfirmFileIcon}
                        style={{ fontSize: sizeStyles.iconSize }}
                    />
                </div>
                <div className={styles.orderConfirmFileText}>
                    <p style={{ fontSize: sizeStyles.textFontSize }}>
                        {extractName(file.url)}
                    </p>
                    <p style={{ fontSize: sizeStyles.metaFontSize }}>
                        {formatFileSize(file?.size)} •{' '}
                        {dayjs(file?.created_at).format('YYYY-MM-DD HH:mm')}
                    </p>
                </div>
            </div>
            <Button
                onClick={() => downloadFile(file.url)}
                className="ml-4 flex-shrink-0"
                size={size === 'large' ? 'middle' : size}
                style={{
                    padding: sizeStyles.buttonPadding,
                    fontSize: sizeStyles.buttonFontSize,
                }}>
                <DownloadOutlined
                    className="w-4 h-4 mr-2"
                    style={{ fontSize: sizeStyles.downloadIconSize }}
                />
                {t('orderCard.download')}
            </Button>
        </div>
    );
}

export default OrderFile;
