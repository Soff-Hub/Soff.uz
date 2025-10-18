import React from 'react';
import { ConfigProvider } from 'antd';

const AntdProvider = ({ children }) => {
    return (
        <ConfigProvider
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
