import React from 'react';
import { Button } from 'antd';
import { FaRegCommentDots } from 'react-icons/fa';
import { FaHeadset } from 'react-icons/fa';
import styles from '../style/select-order-drawer.module.scss';

const ModeratorChatCard = ({ onCreateChat, isMobile }) => {
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
                    Moderator bilan bog'lanish
                </h3>
                <p className={styles.moderatorDescription}>
                    Savol yoki muammo yuzasidan moderatorlarimizga murojaat
                    qilishingiz mumkin.
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
                Chat ochish
            </Button>
        </div>
    );
};

export default ModeratorChatCard;
