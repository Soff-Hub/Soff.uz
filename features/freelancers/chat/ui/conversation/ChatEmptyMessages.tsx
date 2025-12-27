import React from 'react';
import { Avatar, Empty } from 'antd';
import { FaHeadset } from 'react-icons/fa';
import styles from '../../style/chat-empty-messages.module.scss';

type DirectorEmptyStateProps = {
    name: string;
    photoUrl: string;
};

export const DirectorEmptyState: React.FC<DirectorEmptyStateProps> = ({
    name,
    photoUrl,
}) => {
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
                <p className={styles.greeting}>Assalomu alaykum</p>
                <p className={styles.instruction}>
                    Takliflar va so'rovlar uchun xabar yuboring
                </p>
            </div>
        </div>
    );
};

export const ModeratorEmptyState: React.FC = () => {
    return (
        <div className={styles.moderatorEmptyState}>
            <div className={styles.headsetIconContainer}>
                <FaHeadset className={styles.headsetIcon} />
            </div>
            <h3 className={styles.moderatorTitle}>Support bilan suhbat</h3>
            <p className={styles.moderatorMessage}>
                Savol yoki muammolaringiz bo'yicha support xodimi sizga yordam
                berishga tayyor. Birinchi xabaringizni yuboring!
            </p>
        </div>
    );
};

export const EmptyMessages: React.FC = () => {
    return (
        <Empty
            description="Hozircha xabarlar yo'q"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
    );
};
