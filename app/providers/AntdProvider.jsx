import React from 'react';
import { ConfigProvider, message } from 'antd';
// import uzUZ from '~/app/locales/uz_UZ';
// import dayjs from 'dayjs';
// import 'dayjs/locale/uz-latn';

message.config({ duration: 6 });

const AntdProvider = ({ children }) => {
    // useEffect(() => {
    //     // Ensure dayjs locale is set for DatePicker components
    //     dayjs.locale('uz-latn');
    // }, []);

    return (
        <ConfigProvider
            // locale={uzUZ}
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
