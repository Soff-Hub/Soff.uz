import React from 'react';
import { ConfigProvider } from 'antd';
import uz from 'antd/locale/uz_UZ';

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
