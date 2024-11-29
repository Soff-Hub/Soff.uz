import React from 'react';
import { Modal } from 'antd';
import useResponsive from '~/utilities/useResponsive';

export default function ViewProductModal({
    isModalOpen,
    setIsModalOpen,
    type,
    url,
    title,
}) {
    const { isMobile } = useResponsive();
    return (
        <div>
            <Modal
                title={`${title} to'liq shakli`}
                open={isModalOpen}
                afterClose={() => {
                    const video = document.querySelector('video');
                    if (video) {
                        video.pause();
                        video.currentTime = 0;
                    }
                    const audio = document.querySelector('audio');
                    if (audio) {
                        audio.pause();
                        audio.currentTime = 0;
                    }
                }}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                width={isMobile ? '90%' : '60%'}
                style={{ top: 20 }}>
                {type === 'video' ? (
                    <video preload="none" controls style={{ width: '100%' }}>
                        <source src={url} type="video/mp4" />
                    </video>
                ) : (
                    <audio controls style={{ width: '100%' }}>
                        <source src={url} type="audio/mpeg" />
                    </audio>
                )}
            </Modal>
        </div>
    );
}
