import React from 'react';
import { ConfigProvider, message } from 'antd';

message.config({ duration: 6 });

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
