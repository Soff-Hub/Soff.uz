import React, { useState } from 'react';
import { Button, Tooltip } from 'antd';
import { DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import Icon from '~/shared/ui/Icon';
import { formatFileSize } from '~/shared/utilities/utils';
import { downloadFile } from '~/shared/utilities/utils';
import { FiFileText } from 'react-icons/fi';
import styles from './order-files.module.scss';
import { extractName } from '~/entities/order/model/utils';
import { SizeType } from '~/shared/types/size';
import FilePreviewModal from '~/shared/ui/file-preview-modal/FilePreviewModal';

type OrderFileProps = {
    file: any;
    size?: SizeType;
    isRestricted?: boolean;
};

const getSizeStyles = (size: OrderFileProps['size']) => {
    switch (size) {
        case 'small':
            return {
                textFontSize: '11px',
                metaFontSize: '10px',
                buttonPadding: '2px 8px',
                buttonFontSize: '11px',
                iconSize: '14px',
                downloadIconSize: '12px',
            };
        case 'middle':
            return {
                textFontSize: '13px',
                metaFontSize: '12px',
                buttonPadding: '4px 12px',
                buttonFontSize: '13px',
                iconSize: '16px',
                downloadIconSize: '14px',
            };
        default: // large
            return {
                textFontSize: '14px',
                metaFontSize: '13px',
                buttonPadding: '6px 16px',
                buttonFontSize: '14px',
                iconSize: '18px',
                downloadIconSize: '16px',
            };
    }
};

const ARCHIVE_EXTENSIONS = ['zip', 'rar', '7z', 'tar', 'gz', 'bz2'];

function OrderFile({ file, size = 'large', isRestricted = false }: OrderFileProps) {
    const [previewVisible, setPreviewVisible] = useState(false);
    const sizeStyles = getSizeStyles(size);

    const extension = file?.url?.split('.').pop()?.split('?')[0].toLowerCase() || '';
    const isArchiveFile = ARCHIVE_EXTENSIONS.includes(extension);
    
    // User can download if order is completed (NOT restricted) OR if it's an archive file
    const canDownload = !isRestricted || isArchiveFile;
    const canPreview = !isArchiveFile;

    // Get CSS class names based on size
    const getFileCardClassName = () => {
        return `${styles.orderConfirmFile} ${styles[size]}`;
    };

    const getIconWrapperClassName = () => {
        return `${styles.orderConfirmFileIconWrapper} ${styles[size]}`;
    };

    const fileName = extractName(file?.url || '');

    return (
        <>
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
                            {fileName || 'Noma\'lum fayl'}
                        </p>
                        <p style={{ fontSize: sizeStyles.metaFontSize }}>
                            {formatFileSize(file?.size)} •{' '}
                            {dayjs(file?.created_at).format('YYYY-MM-DD HH:mm')}
                        </p>
                    </div>
                </div>
                <div className="d-flex gap-2">
                    {canPreview && (
                        <Button
                            onClick={() => setPreviewVisible(true)}
                            className="ml-2 flex-shrink-0"
                            size={size === 'large' ? 'middle' : size}
                            icon={<EyeOutlined />}
                            style={{
                                padding: sizeStyles.buttonPadding,
                                fontSize: sizeStyles.buttonFontSize,
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: isRestricted ? '#e6f7ff' : 'transparent',
                                borderColor: isRestricted ? '#91d5ff' : '#d9d9d9',
                                color: isRestricted ? '#1890ff' : 'rgba(0, 0, 0, 0.85)',
                            }}>
                            Ko'rib chiqish
                        </Button>
                    )}
                    
                    {canDownload ? (
                        <Button
                            onClick={() => downloadFile(file?.url || '')}
                            className="ml-2 flex-shrink-0"
                            type="primary"
                            size={size === 'large' ? 'middle' : size}
                            icon={<DownloadOutlined />}
                            style={{
                                padding: sizeStyles.buttonPadding,
                                fontSize: sizeStyles.buttonFontSize,
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: '#00a44f',
                                borderColor: '#00a44f',
                            }}>
                            Yuklab olish
                        </Button>
                    ) : (
                        <Tooltip title="Buyurtma tasdiqlangach yuklab olish mumkin">
                             <Button
                                disabled
                                className="ml-2 flex-shrink-0"
                                size={size === 'large' ? 'middle' : size}
                                icon={<DownloadOutlined />}
                                style={{
                                    padding: sizeStyles.buttonPadding,
                                    fontSize: sizeStyles.buttonFontSize,
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}>
                                Yuklab olish
                            </Button>
                        </Tooltip>
                    )}
                </div>
            </div>

            <FilePreviewModal
                visible={previewVisible}
                onClose={() => setPreviewVisible(false)}
                fileUrl={file?.url || ''}
                fileName={fileName || 'Fayl'}
                canDownload={canDownload}
            />
        </>
    );
}

export default OrderFile;


