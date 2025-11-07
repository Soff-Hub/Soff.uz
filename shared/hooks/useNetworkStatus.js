import { useEffect } from 'react';
import { message } from 'antd';

export function useNetworkStatus() {
    const [messageApi, contextHolder] = message.useMessage();
    const handleOnline = () => {
        messageApi.success({
            key: 'network-status', // Prevents duplicate notifications
            content: 'Siz onlaynsiz',
            description: 'Internet aloqangiz tiklandi.',
            duration: 3,
        });
    };

    const handleOffline = () => {
        messageApi.error({
            key: 'network-status', // Prevents duplicate notifications
            content: 'Siz offlaynsiz',
            description: 'Internet aloqangiz uzildi.',
            duration: 3,
        });
    };

    useEffect(() => {
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return {
        contextHolder,
    };
}
