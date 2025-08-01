import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import PortfolioForm from '~/components/form/portfolioForm';

const FourthStep = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false);
    return (
        <div className='service_card row'>
            <div className='col-12 col-md-8'>
                <div className='service_title'>
                    <h2>4</h2>
                    <h3>Portfolio</h3>
                </div>
                <div className='service_content'>
                    <div className='row'>
                        <div className='col-3'>
                            <div
                                onClick={showModal}
                                style={{
                                    border: '2px dashed #d9d9d9',
                                    backgroundColor: 'rgba(0,0,0,0.1)',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s',
                                    height: '150px'
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(0, 164, 79, 1)')}
                                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#d9d9d9')}
                            >
                                <PlusOutlined style={{ fontSize: '48px', color: 'rgba(0, 164, 79, 1)' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                title="Yangi portfolio qo‘shish"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                width={800}
            >
                <PortfolioForm onClose={handleCancel} />
            </Modal>
        </div>
    )
}

export default FourthStep