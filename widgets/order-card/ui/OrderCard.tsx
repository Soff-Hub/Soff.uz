import React from 'react';
import { Button, Avatar } from 'antd';
import OrderBase from '~/entities/order/ui/order-base';
import styles from './orderCard.module.scss';
import OrderFiles from '~/entities/order/ui/order-card-files';
import { SizeType } from '~/shared/types/size';

type OrderCardProps = {
    order: any;
    infoOnly?: boolean;
    onClick?: (order: OrderCardProps['order']) => void;
    onCancel?: (order: OrderCardProps['order']) => void;
    orderSize?: SizeType;
    withRejectedStatus?: boolean;
} & (
    | {
          withFiles?: undefined;
          fileSize?: undefined;
          withCollapse?: undefined;
      }
    | {
          withFiles: true;
          fileSize?: SizeType;
          withCollapse?: boolean;
          isOrderFilesFetching?: boolean;
          setRes: (res: string) => void;
          setSelectedOrder: (order: any) => void;
          setFeedbackOpen: (open: boolean) => void;
      }
);

function OrderCard(props: OrderCardProps) {
    const { order, infoOnly, orderSize = 'large', onClick, onCancel } = props;

    return (
        <OrderBase
            order={order}
            size={orderSize}
            onClick={onClick}
            withRejectedStatus={props.withRejectedStatus}
            actionsSlot={({
                isRejectable,
                isCancelled,
                hasSeller,
                isPartiallyPaid,
                isFullyPaid,
                handlePrimaryClick,
            }) => {
                return (
                    <div className={styles.actionButtons}>
                        {isRejectable && onCancel ? (
                            <Button
                                variant="outlined"
                                color="danger"
                                className={`${styles.actionButtonReject} ${styles[orderSize]}`}
                                onClick={() => onCancel(order)}>
                                Bekor qilish
                            </Button>
                        ) : null}
                        {!isCancelled && !infoOnly && (
                            <button
                                className={`${styles.primary} ${styles[orderSize]}`}
                                onClick={handlePrimaryClick}>
                                {!isPartiallyPaid && !isFullyPaid ? (
                                    "To'lovni amalga oshirish"
                                ) : hasSeller ? (
                                    'Batafsil'
                                ) : (
                                    <OrderCardDefaultButtonContent
                                        order={order}
                                    />
                                )}
                            </button>
                        )}
                    </div>
                );
            }}
            filesSlot={
                props.withFiles &&
                (({ order, isCompleted, isCancelled }) => {
                    const hasOrderFiles =
                        Array.isArray(order?.files) && order.files.length > 0;
                    if (!hasOrderFiles || isCancelled) {
                        return null;
                    }

                    let filesContent = null;
                    if (isCompleted) {
                        filesContent = (
                            <OrderFiles
                                order={order}
                                isCompletedFiles={true}
                                orderFiles={order?.files}
                                isOrderFilesFetching={
                                    props.isOrderFilesFetching
                                }
                                size={props.fileSize}
                                withCollapse={props.withCollapse}
                            />
                        );
                    } else {
                        filesContent = (
                            <OrderFiles
                                order={order}
                                isPendingFiles={true}
                                withCollapse={props.withCollapse}
                                orderFiles={order?.files}
                                isOrderFilesFetching={
                                    props.isOrderFilesFetching
                                }
                                setRes={props.setRes}
                                setFeedbackOpen={props.setFeedbackOpen}
                                setSelectedOrder={props.setSelectedOrder}
                                size={props.fileSize}
                            />
                        );
                    }

                    return filesContent;
                })
            }
        />
    );
}

const OrderCardDefaultButtonContent: React.FC<OrderCardProps> = ({ order }) => {
    const firstThreeOffers = order?.offers?.slice(0, 3) || [];
    const isThereExtraOffers = order?.offers?.length! > 3;
    const totalExtraOffers = isThereExtraOffers
        ? order?.offers?.length! - 3
        : 0;

    return (
        <div className={styles.viewOffersButtonContent}>
            <span className={styles.viewOffersTitle}>Takliflarni ko'rish</span>
            <Avatar.Group>
                {firstThreeOffers.map((item: any, i: number) => (
                    <Avatar
                        size={28}
                        key={i}
                        src={item?.photo_url || '/static/img/ozodbek.png'}
                    />
                ))}
                {isThereExtraOffers && (
                    <Avatar className={styles.extraAvatar}>
                        +{totalExtraOffers}
                    </Avatar>
                )}
            </Avatar.Group>
        </div>
    );
};

export default OrderCard;
