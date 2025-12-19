import { Modal } from 'antd';
import React, { useState } from 'react'
import ProtfolioModal from './porfolioModal';

const PortfolioCard = ({ item, portfolioData }) => {
    const [openDetailModal, setOpenDetailModel] = useState(false)
    return (
        <div key={portfolioData?.id} className='SellerPortfolioCard'>
            <img
                src={item?.cover_image[0]}
                alt={item?.title}
                className='SellerPortfolioCardImg'
                onClick={() => {
                    setOpenDetailModel(true);
                }}
            />
            <div className='SellerPortfolioCardbody'>
                <p className='SellerPortfolioCardTitle'>{item?.title}</p>
                <div className='SellerPortfolioCardEnd d-flex justify-content-between'>
                    <p className='SellerPortfolioCardEndTitle'>
                        {item?.sub_category?.title}
                    </p>
                    <div className='SellerPortfolioCard_view_count'>
                        <img src='/static/img/eye.png' width={'20px'} />
                        <p className='text-white p-0 m-0'>{item?.view_count}</p>
                    </div>
                </div>
            </div>

            <Modal
                open={openDetailModal}
                title="Portfolio"
                onCancel={() => setOpenDetailModel(false)}
                width={800}
                footer={null}
            >
                <ProtfolioModal data={
                    portfolioData?.find(i => i.id === item.id)
                } onClose={setOpenDetailModel} />
            </Modal>
        </div>
    )
}

export default PortfolioCard