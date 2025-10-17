import React from 'react';
import { ConfigProvider } from 'antd';
import uz from 'antd/locale/uz_UZ';
import dayjs from 'dayjs';
import 'dayjs/locale/uz-latn';
import localeData from 'dayjs/plugin/localeData';

// Configure dayjs
dayjs.extend(localeData);
dayjs.locale('uz-latn');

const AntdProvider = ({ children }) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#00a44f',
                    borderRadius: 8,
                },
            }}
            locale={uz}>
            {children}
        </ConfigProvider>
    );
};

export default AntdProvider;
