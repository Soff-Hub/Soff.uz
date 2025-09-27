import React, { useEffect, useState } from 'react';
import { Alert } from 'antd';
import TextSlicer from '~/shared/utilities/TextSlicer';
import useResponsive from '~/shared/utilities/useResponsive';

const SafetyAlert = () => {
    const [visible, setVisible] = useState(false);
    const { isMobile } = useResponsive()

    useEffect(() => {
        // LocalStorage tekshiramiz
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
            description={<TextSlicer bio={"Xavfsizlik uchun barcha to‘lovlarni faqat soff.uz platformasi orqali amalga oshiring. Shaxsiy ma’lumotlaringizni (telefon, karta raqami va hokazo) bermang."} len={isMobile ? 50 : 100000}/>}
            type="warning"
            showIcon
            closable
            onClose={handleClose}
        />
    );
};

export default SafetyAlert;
