import React, { useEffect, useState } from 'react';
import { Alert } from 'antd';
import TextSlicer from '~/shared/utilities/TextSlicer';
import useResponsive from '~/shared/utilities/useResponsive';

const SafetyAlert = () => {
    const [visible, setVisible] = useState(false);
    const { isMobile } = useResponsive()

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
            description={<TextSlicer bio={"Ogohlantirish! Sayt tashqarisida to‘lov yoki ma’lumot almashish xavfli. Platforma bunday holatlar uchun mas’ul emas. Har doim suhbat va to‘lovlarni platforma ichida bajaring."} len={isMobile ? 50 : 100000}/>}
            type="warning"
            showIcon
            closable
            onClose={handleClose}
        />
    );
};

export default SafetyAlert;
