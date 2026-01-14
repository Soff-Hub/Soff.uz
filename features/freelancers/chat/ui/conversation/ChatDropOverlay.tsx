import React from 'react';
import { useConversation } from './Conversation';
import { Card } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import { useTranslation } from 'next-i18next';

type ChatDropOverlayProps = {};

function ChatDropOverlay({}: ChatDropOverlayProps) {
    const { t } = useTranslation('chat');
    const { isDragging } = useConversation();

    if (!isDragging) return null;

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
            }}>
            <Card
                style={{
                    backgroundColor: 'white',
                    padding: '40px 60px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                    textAlign: 'center',
                }}>
                <CloudUploadOutlined
                    style={{
                        fontSize: '64px',
                        color: '#1890ff',
                        marginBottom: '16px',
                    }}
                />
                <h3 style={{ margin: 0, color: '#1890ff' }}>
                    {t('dropOverlay.title')}
                </h3>
                <p style={{ margin: '8px 0 0 0', color: '#666' }}>
                    {t('dropOverlay.description')}
                </p>
            </Card>
        </div>
    );
}

export default ChatDropOverlay;
