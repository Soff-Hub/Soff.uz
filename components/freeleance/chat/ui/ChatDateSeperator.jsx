import { Badge, Tag } from 'antd';
import React from 'react';

function ChatDateSeperator({ chatDate }) {
    return (
        <div
            style={{
                position: 'sticky',
                top: '10px',
                zIndex: 20,
                left: 0,
                right: 0,
                margin: '10px auto',
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px',
            }}>
            <Tag
                style={{
                    backgroundColor: '#f0f0f0',
                    fontSize: '14px',
                }}>
                {chatDate.date}
            </Tag>
        </div>
    );
}

export default ChatDateSeperator;
