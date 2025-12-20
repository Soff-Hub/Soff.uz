import React from 'react';
import { ConfigProvider, message } from 'antd';
import uzUZ from '~/app/locales/uz_UZ';

message.config({ duration: 6 });

const AntdProvider = ({ children }) => {
    return (
        <ConfigProvider
            locale={uzUZ}
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
