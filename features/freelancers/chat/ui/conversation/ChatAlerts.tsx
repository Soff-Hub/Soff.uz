import React, { useEffect, useState } from 'react';
import { Alert } from 'antd';
import TextSlicer from '~/shared/utilities/TextSlicer';
import useResponsive from '~/shared/utilities/useResponsive';
import styles from '../../style/chat.module.scss';
import { useTranslation } from 'next-i18next';

type ChatAlertsProps = {};

export function BlockedAlert({}: ChatAlertsProps) {
    const { t } = useTranslation('chat');
    return (
        <Alert
            className={styles.alertMiddle}
            message={t('alerts.blockedTitle')}
            description={t('alerts.blockedDescription')}
            type="error"
            showIcon
        />
    );
}

export const SafetyAlert = () => {
    const { t } = useTranslation('chat');
    const [visible, setVisible] = useState(false);
    const { isMobile } = useResponsive();

    useEffect(() => {
        const dismissed = localStorage.getItem('safetyAlertDismissed');
        if (!dismissed) {
            setVisible(true);
        }
    }, []);

    const handleClose = () => {
        setVisible(false);
        localStorage.setItem('safetyAlertDismissed', 'true');
    };

    if (!visible) return null;

    return (
        <Alert
            className="mb-3 w-100"
            description={
                <TextSlicer
                    title={''}
                    bio={t('alerts.safetyWarning')}
                    len={isMobile ? 50 : 100000}
                />
            }
            type="warning"
            showIcon
            closable
            onClose={handleClose}
        />
    );
};
