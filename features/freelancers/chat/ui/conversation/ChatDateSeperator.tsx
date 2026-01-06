import { Tag } from 'antd';
import React from 'react';

type ChatDateSeperatorProps = {
    chatDate: { date: string };
    isFirst: boolean;
};

function ChatDateSeperator({
    chatDate,
    isFirst = false,
}: ChatDateSeperatorProps) {
    return (
        <div
            style={{
                position: 'sticky',
                top: '10px',
                zIndex: 20,
                width: '100%',
                margin: isFirst ? '0 auto 10px' : '20px auto 10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'transparent',
                padding: '4px 0',
                // Ensure it doesn't overlap with previous sticky elements
                transform: 'translateZ(0)', // Force hardware acceleration
            }}>
            <Tag
                style={{
                    backgroundColor: '#f0f0f0',
                    fontSize: '12px',
                    margin: 0,
                    padding: '2px 8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Add shadow to make it stand out when sticky
                    textTransform: 'capitalize', // Capitalize first letter of each word
                }}>
                {chatDate.date}
            </Tag>
        </div>
    );
}

export default ChatDateSeperator;
