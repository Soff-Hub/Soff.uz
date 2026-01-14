import React from 'react';
import { Spin } from 'antd';
import { motion } from 'motion/react';
import { cn } from '~/shared/utilities/cn';
import { useTranslation } from 'next-i18next';
import styles from './OffersWaitingLoader.module.scss';

const OffersWaitingLoader = ({ bufferedCount, remainingSeconds }) => {
    const { t } = useTranslation('my-orders');
    const hasCounters = bufferedCount > 0 || remainingSeconds !== null;

    return (
        <div
            className={cn(
                'flex',
                'flex-col',
                'justify-center',
                'items-center',
                'w-full',
                'h-[500px]',
                'flex-1',
                styles.container
            )}>
            <div className={styles.contentWrapper}>
                {/* Antd Loader */}
                <Spin size="large" />

                {/* Text Message */}
                <div className={styles.message}>
                    {hasCounters ? (
                        <p className={styles.messageText}>
                            {t('offers.waitingMessage')}
                            {bufferedCount > 0 && (
                                <>
                                    {' '}
                                    -{' '}
                                    <motion.span
                                        key={bufferedCount}
                                        className={styles.valueCard}
                                        initial={{ scale: 1.2 }}
                                        animate={{ scale: 1 }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 300,
                                            damping: 20,
                                        }}>
                                        {bufferedCount}
                                    </motion.span>
                                </>
                            )}
                            <br />
                            {remainingSeconds !== null &&
                                remainingSeconds > 0 && (
                                    <>
                                        <motion.span
                                            key={remainingSeconds}
                                            className={styles.valueCardGreen}
                                            initial={{ scale: 1.2 }}
                                            animate={{ scale: 1 }}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 300,
                                                damping: 20,
                                            }}>
                                            {remainingSeconds}
                                        </motion.span>{' '}
                                        {t('offers.waitingMessageSeconds')}{' '}
                                    </>
                                )}
                            {t('offers.waitingMessageWithCount')}
                        </p>
                    ) : (
                        <p className={styles.messageText}>
                            {t('offers.waitingForOffers')}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OffersWaitingLoader;
