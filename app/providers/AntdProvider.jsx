import React from 'react';
import { ConfigProvider, message } from 'antd';
import { useRouter } from 'next/router';
import uzUZ from '~/app/locales/uz_UZ';
import enUS from '~/app/locales/en_US';
import ruRU from '~/app/locales/ru_RU';

message.config({ duration: 6 });

// Map Next.js locale to Ant Design locale
const antdLocaleMap = {
    uz: uzUZ,
    en: enUS,
    ru: ruRU,
};

const AntdProvider = ({ children }) => {
    const router = useRouter();
    const { locale = 'uz' } = router;
    
    // Get the Ant Design locale based on Next.js locale
    const antdLocale = antdLocaleMap[locale] || uzUZ;

    return (
        <ConfigProvider
            locale={antdLocale}
            theme={{
                token: {
                    colorPrimary: '#00a44f',
                    borderRadius: 8,
                },
            }}>
            {children}
        </ConfigProvider>
    );
};

export default AntdProvider;
