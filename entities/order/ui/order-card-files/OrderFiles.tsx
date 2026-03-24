import React, { ReactNode, useMemo } from 'react';
import { Button, Alert, Skeleton, Collapse } from 'antd';
import styles from './order-files.module.scss';
import OrderFile from './OrderFile';
import { FileInfo } from '~/store/petApi';
import { IoIosArrowForward } from 'react-icons/io';
import {
    CompletedFilesCase,
    OrderFilesProps,
    PendingFilesCase,
} from '../../model/type';
import {
    getOrderCompletedFilesSize,
    getOrderPendingFilesSize,
} from '../../model/file-size';
import { SizeType } from '~/shared/types/size';

const { Panel } = Collapse;

function OrderFiles(props: OrderFilesProps) {
    return props.isCompletedFiles ? (
        <OrderCompletedFiles {...props} />
    ) : props.isPendingFiles ? (
        <OrderPendingFiles {...props} />
    ) : null;
}

const OrderPendingFiles: React.FC<PendingFilesCase> = ({
    order,
    orderFiles,
    withCollapse,
    isOrderFilesFetching,
    setSelectedOrder,
    setRes,
    setFeedbackOpen,
    size = 'large',
}) => {
    const pendingFiles = useMemo(() => {
        if (!orderFiles || !orderFiles?.length) return [];
        return orderFiles?.filter((f: FileInfo) => f.status === 'pending');
    }, [orderFiles]);

    const hasPendingFiles =
        Array.isArray(pendingFiles) && pendingFiles.length > 0;

    const sizeStyles = getOrderPendingFilesSize(size);

    const getAlertClassName = () => {
        switch (size) {
            case 'small':
                return styles.alertSmall;
            case 'middle':
                return styles.alertMiddle;
            default:
                return styles.alertLarge;
        }
    };

    let filesContent = null;
    if (isOrderFilesFetching) {
        filesContent = (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: sizeStyles.spacing,
                }}>
                {Array(3)
                    .fill(null)
                    .map((_, index) => (
                        <Skeleton.Button
                            key={index}
                            style={{
                                height: sizeStyles.skeletonHeight,
                                width: '100%',
                            }}
                        />
                    ))}
            </div>
        );
    } else if (hasPendingFiles) {
        filesContent = pendingFiles.map((f) => (
            <OrderFile
                key={f.url}
                file={f}
                size={size}
                isRestricted={true}
            />
        ));
    } else {
        filesContent = (
            <p style={{ fontSize: sizeStyles.textFontSize }}>
                Hozircha yuklangan fayllar mavjud emas.
            </p>
        );
    }

    const orderContent = (
        <div className={styles.orderConfirmContent}>
            <p style={{ fontSize: sizeStyles.textFontSize }}>
                Mutaxassis buyurtmani yakunladi va natijani sizga jo'natdi.
                Natijani ko'rib chiqing va tasdiqlang yoki kamchilikni
                ko'rsatib rad eting.
            </p>
            <Alert
                message="Eslatma:"
                description="Agar siz 24 soat ichida ishni holatini o'zgartirmasangiz, buyurtma avtomatik ravishda qabul qilinadi va to'lov mutaxassisga o'tkaziladi."
                type="warning"
                showIcon
                className={getAlertClassName()}
                style={{
                    marginBottom: sizeStyles.marginBottom,
                }}
            />
            <h4
                className="mb-3"
                style={{
                    fontWeight: '400',
                    color: '#333',
                    fontSize: sizeStyles.subtitleFontSize,
                }}>
                Yuklangan fayllar
            </h4>
            {filesContent}
            <div className={styles.orderConfirmFileActions}>
                <Button
                    color="danger"
                    variant="outlined"
                    disabled={isOrderFilesFetching}
                    style={{
                        padding: sizeStyles.buttonPadding,
                        fontSize: sizeStyles.buttonFontSize,
                    }}
                    onClick={() => {
                        setRes('rejected');
                        setSelectedOrder && setSelectedOrder(order);
                        setFeedbackOpen(true);
                    }}>
                    Kamchilik aniqlandi
                </Button>
                <Button
                    type="primary"
                    disabled={isOrderFilesFetching}
                    style={{
                        padding: sizeStyles.buttonPadding,
                        fontSize: sizeStyles.buttonFontSize,
                    }}
                    onClick={() => {
                        setRes('completed');
                        setSelectedOrder && setSelectedOrder(order);
                        setFeedbackOpen(true);
                    }}>
                    Qabul qilish
                </Button>
            </div>
        </div>
    );

    return (
        <div className={styles.orderPayCardGrid}>
            {withCollapse ? (
                wrapWithCollapse(orderContent, {
                    text: 'Ishni qabul qilish',
                    size,
                    isDefaultOpen: true,
                })
            ) : (
                <>
                    <h3
                        className={styles.orderConfirmTitle}
                        style={{
                            fontSize: sizeStyles.titleFontSize,
                            marginBottom: '8px',
                        }}>
                        Ishni qabul qilish
                    </h3>
                    {orderContent}
                </>
            )}
        </div>
    );
};

const OrderCompletedFiles: React.FC<CompletedFilesCase> = ({
    orderFiles,
    withCollapse,
    isOrderFilesFetching,
    size = 'large',
}) => {
    const completedFiles = useMemo(() => {
        if (!orderFiles || !orderFiles?.length) return [];
        return orderFiles?.filter((f: FileInfo) => f.status === 'completed');
    }, [orderFiles]);

    const hasCompletedFiles =
        Array.isArray(completedFiles) && completedFiles.length > 0;

    const sizeStyles = getOrderCompletedFilesSize(size);

    let completedFilesContent = null;
    if (isOrderFilesFetching) {
        completedFilesContent = (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: sizeStyles.spacing,
                    marginTop: '10px',
                }}>
                {Array(3)
                    .fill(null)
                    .map((_, index) => (
                        <Skeleton.Button
                            key={index}
                            style={{
                                height: sizeStyles.skeletonHeight,
                                width: '100%',
                            }}
                        />
                    ))}
            </div>
        );
    } else if (hasCompletedFiles) {
        completedFilesContent = (
            <div style={{ marginTop: '10px' }}>
                {completedFiles.map((f) => (
                    <OrderFile key={f.url} file={f} size={size} />
                ))}
            </div>
        );
    }

    return (
        <div className={styles.orderPayCardGrid}>
            {hasCompletedFiles && withCollapse ? (
                wrapWithCollapse(completedFilesContent, {
                    text: 'Buyurtma fayllari',
                    size,
                    isDefaultOpen: true,
                })
            ) : (
                <>
                    <h3
                        className={styles.orderConfirmTitle}
                        style={{
                            fontSize: sizeStyles.titleFontSize,
                        }}>
                        Buyurtma fayllari
                    </h3>
                    {completedFilesContent}
                </>
            )}
        </div>
    );
};

const wrapWithCollapse = (
    children: ReactNode,
    {
        text,
        size,
        isDefaultOpen,
    }: { text: string; size: SizeType; isDefaultOpen?: boolean }
) => {
    const sizeStyles = getOrderPendingFilesSize(size);
    return (
        <Collapse
            ghost
            defaultActiveKey={isDefaultOpen ? '1' : undefined}
            expandIconPosition="end"
            className={styles.filesCollapse}
            expandIcon={({ isActive }) => (
                <span
                    style={{
                        display: 'inline-block',
                        transform: isActive ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                        fontSize: sizeStyles.titleFontSize,
                    }}>
                    <IoIosArrowForward />
                </span>
            )}>
            <Panel
                header={
                    <h3
                        className={styles.orderConfirmTitle}
                        style={{
                            fontSize: sizeStyles.titleFontSize,
                        }}>
                        {text}
                    </h3>
                }
                key="1">
                {children}
            </Panel>
        </Collapse>
    );
};

export default OrderFiles;
