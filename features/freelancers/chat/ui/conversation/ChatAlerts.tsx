import React, { useEffect, useState } from 'react';
import { Alert } from 'antd';
import TextSlicer from '~/shared/utilities/TextSlicer';
import useResponsive from '~/shared/utilities/useResponsive';
import styles from '../../style/chat.module.scss';
import { safeLocalStorage } from '~/shared/utilities/safe-local-storage';

type ChatAlertsProps = {};

export function BlockedAlert({}: ChatAlertsProps) {
    return (
        <Alert
            className={styles.alertMiddle}
            message="Frilanser vaqtincha bloklangan"
            description="Afsuski, ushbu frilanserning xizmatlari vaqtincha bloklangan. Iltimos, keyinroq qayta urinib ko'ring yoki boshqa frilanserni tanlang."
            type="error"
            showIcon
        />
    );
}

export const SafetyAlert = () => {
    const [visible, setVisible] = useState(false);
    const { isMobile } = useResponsive();

    useEffect(() => {
        const dismissed = safeLocalStorage.getItem('safetyAlertDismissed');
        if (!dismissed) {
            setVisible(true);
        }
    }, []);

    const handleClose = () => {
        setVisible(false);
        safeLocalStorage.setItem('safetyAlertDismissed', 'true');
    };

    if (!visible) return null;

    return (
        <Alert
            className="mb-3 w-100"
            description={
                <TextSlicer
                    title={''}
                    bio={
                        'Ogohlantirish! Sayt tashqarisida to‘lov yoki ma’lumot almashish xavfli. Platforma bunday holatlar uchun mas’ul emas. Har doim suhbat va to‘lovlarni platforma ichida bajaring.'
                    }
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
