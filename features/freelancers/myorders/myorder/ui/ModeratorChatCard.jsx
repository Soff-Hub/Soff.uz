import React from 'react';
import { Button } from 'antd';
import { FaRegCommentDots } from 'react-icons/fa';
import { FaHeadset } from 'react-icons/fa';
import { useTranslation } from 'next-i18next';
import styles from '../style/select-order-drawer.module.scss';

const ModeratorChatCard = ({ onCreateChat, isMobile }) => {
    const { t } = useTranslation('my-orders');
    return (
        <div
            className={styles.moderatorCard}
            style={{
                ...(isMobile && {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                }),
            }}>
            <div className={styles.moderatorIconWrapper}>
                <FaHeadset className={styles.moderatorIcon} />
            </div>
            <div
                className={styles.moderatorContent}
                style={{
                    ...(isMobile && {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }),
                }}>
                <h3 className={styles.moderatorTitle}>
                    {t('moderator.title')}
                </h3>
                <p className={styles.moderatorDescription}>
                    {t('moderator.description')}
                </p>
            </div>
            <Button
                type="primary"
                size={isMobile ? 'small' : 'middle'}
                icon={<FaRegCommentDots />}
                onClick={onCreateChat}
                className={styles.moderatorButton}
                style={{
                    ...(isMobile && {
                        width: '100%',
                    }),
                }}>
                {t('moderator.openChat')}
            </Button>
        </div>
    );
};

export default ModeratorChatCard;
