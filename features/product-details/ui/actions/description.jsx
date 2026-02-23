import React, { useState } from 'react';
import { sanitizeHtml } from '~/shared/utilities/sanitize-html';
import { Modal, Button } from 'antd';
import useResponsive from '~/shared/utilities/useResponsive';

function Description({ description }) {
    const { isMobile } = useResponsive();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const hasDescription = description?.length > 0;

    const content = hasDescription ? (
        <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(description) }} />
    ) : (
        <div className="text-center">
            <img
                src='/static/img/noinfo.svg'
                alt="Batafsil ma'lumot yo'q"
                width="35%"
            />
            <p>Hozircha muallif ushbu mahsuloti uchun tavsif qo‘shmagan.</p>
        </div>
    );

    return (
        <div className='ps-product__thumbnail_seller_secound product-description'>
            <h3 style={{
                fontSize: "25px",
                fontWeight: 500,
                lineHeight: "37.5px",
                color: "#312F30",
                marginBottom: "20px"
            }} >
                Mahsulot tavsifi
            </h3>

            {isMobile ? (
                <>
                    <Button
                        type="default"
                        size="large"
                        className="w-100"
                        style={{ borderRadius: '8px', fontWeight: 500, height: '45px' }}
                        onClick={() => setIsModalOpen(true)}
                    >
                        Tavsifni o'qish
                    </Button>
                    <Modal
                        title={(
                            <h3 style={{ fontSize: "20px", fontWeight: 500, margin: 0 }}>
                                Mahsulot tavsifi
                            </h3>
                        )}
                        open={isModalOpen}
                        onCancel={() => setIsModalOpen(false)}
                        footer={
                            <Button type="primary" size="large" className="w-100 mt-3" onClick={() => setIsModalOpen(false)}>
                                Yopish
                            </Button>
                        }
                        centered
                        width={600}
                        bodyStyle={{ maxHeight: '70vh', overflowY: 'auto', padding: '10px 0' }}
                    >
                        {content}
                    </Modal>
                </>
            ) : (
                content
            )}
        </div>
    );
}

export default Description;