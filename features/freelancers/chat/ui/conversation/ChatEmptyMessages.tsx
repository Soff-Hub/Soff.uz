import React from 'react';
import { Avatar, Empty } from 'antd';
import { FaHeadset } from 'react-icons/fa';
import styles from '../../style/chat-empty-messages.module.scss';
import { useTranslation } from 'next-i18next';

type DirectorEmptyStateProps = {
    name: string;
    photoUrl: string;
};

export const DirectorEmptyState: React.FC<DirectorEmptyStateProps> = ({
    name,
    photoUrl,
}) => {
    const { t } = useTranslation('chat');
    return (
        <div className={styles.directorEmptyState}>
            <Avatar
                size={120}
                className={styles.directorAvatar}
                src={photoUrl}
                alt={name}
            />

            <h3 className={styles.directorName}>{name}</h3>

            <div className={styles.welcomeMessage}>
                <p className={styles.greeting}>{t('window.greeting')}</p>
                <p className={styles.instruction}>
                    {t('window.directorMessage')}
                </p>
            </div>
        </div>
    );
};

export const ModeratorEmptyState: React.FC = () => {
    const { t } = useTranslation('chat');
    return (
        <div className={styles.moderatorEmptyState}>
            <div className={styles.headsetIconContainer}>
                <FaHeadset className={styles.headsetIcon} />
            </div>
            <h3 className={styles.moderatorTitle}>{t('window.moderatorTitle')}</h3>
            <p className={styles.moderatorMessage}>
                {t('window.moderatorMessage')}
            </p>
        </div>
    );
};

export const EmptyMessages: React.FC = () => {
    const { t } = useTranslation('chat');
    return (
        <Empty
            description={t('window.empty')}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
    );
};
