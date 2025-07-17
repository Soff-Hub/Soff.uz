'use client';
import { PlusOutlined } from '@ant-design/icons';
import { Skeleton, Modal, Button } from 'antd';
import { useEffect, useState } from 'react';
import ServiceIsUnavailable from './ServiceIsUnavailable';
import ProtfolioModal from './porfolioModal';
import PortfolioForm from '~/components/form/portfolioForm';
import PortfolioEditForm from '~/components/form/poerfolioEsitForm';
import { useSellerPortfolios } from '~/hooks/useSellerPortfolios';
import { useGet } from '~/repositories/https';

export default function SellerPortfolio({ pid }) {
    // categoires
    const [parentCategory, setParentCategory] = useState('all');
    const [childCategory, setChildCategory] = useState('all');
    const [showUnavailable, setShowUnavailable] = useState(false);
    const [childCategories, setChildCategories] = useState([]);

    // edit portfolio modal
    const [openModal, setOpenModal] = useState(false);
    const [cardId, setCardId] = useState(null);

    // create portfolio modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false);

    const { data: categories, isLoading: catLoading } = useGet(
        'category',
        'http://176.96.241.219:8005/api/v1/categories/?parent_only=false'
    );
    console.log(parentCategory)
    console.log(childCategories)
    useEffect(() => {
        if (typeof parentCategory === 'number') {
            const parent = categories?.find(cat => cat.id === parentCategory);
            setChildCategories(parent?.children || []);
        } else {
            setChildCategories([]);
        }
    }, [parentCategory, categories]);

    // portfolio detail
    const [openDetailModal, setOpenDetailModel] = useState(false)

    const {
        data: portfolioData,
        isLoading,
        isError,
    } = useSellerPortfolios(pid, parentCategory, childCategory);

    useEffect(() => {
        if (openModal) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [openModal]);
    return (
        <div>
            {showUnavailable ? (
                <ServiceIsUnavailable />
            ) : (
                <div className='SellerPortfolio'>
                    <form className='SellerPortfolioForm'>
                        {categories?.length > 0 && (
                            <select
                                className='SellerPortfolioSelect'
                                onChange={e => setParentCategory(e.target.value === 'all' ? 'all' : Number(e.target.value))}>
                                <option value='all'>Barchasi</option>
                                {categories.filter(c => c.parent_id == null).map(cat => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.title}
                                    </option>
                                ))}
                            </select>
                        )}
                        {parentCategory && (
                            <select
                                className='SellerPortfolioSelect'
                                value={childCategory}
                                onChange={e => setChildCategory(e.target.value === 'all' ? 'all' : Number(e.target.value))}>
                                <option value='all'>Barchasi</option>
                                {childCategories.map(sub => (
                                    <option key={sub.id} value={sub.id}>
                                        {sub.title}
                                    </option>
                                ))}
                            </select>
                        )}
                    </form>
                    {isLoading ? (
                        <div className='sellerProductSkeletonWrap'>
                            {Array(16)
                                .fill(0)
                                .map((_, i) => (
                                    <Skeleton.Image
                                        key={i}
                                        active
                                        className='sellerProductSkeleton shadow'
                                        style={{ width: '100%' }}
                                    />
                                ))}
                        </div>
                    ) : portfolioData?.items?.length === 0 ? (
                        <ServiceIsUnavailable />
                    ) : (
                        <div className='SellerPortfolioWrap'>
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
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#1890ff')}
                                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#d9d9d9')}
                            >
                                <PlusOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                            </div>

                            {portfolioData.items.map((item, index) => (
                                <div key={index} className='SellerPortfolioCard'>
                                    <img
                                        src={item?.cover_image[0]}
                                        alt={item?.title}
                                        className='SellerPortfolioCardImg'
                                        onClick={() => {
                                            setOpenDetailModel(true);
                                            setCardId(item.id);
                                        }}
                                    />
                                    <div className='SellerPortfolioCardbody'>
                                        <p className='SellerPortfolioCardTitle'>{item?.title}</p>
                                        <div className='SellerPortfolioCardEnd d-flex justify-content-between'>
                                            <p className='SellerPortfolioCardEndTitle'>
                                                {item?.sub_category?.title}
                                            </p>
                                            <div className='SellerPortfolioCard_view_count'>
                                                <i
                                                    onClick={() => {
                                                        setCardId(item.id);
                                                        setOpenModal(true);
                                                    }}
                                                    className='fa-solid fa-pen fs-4 mx-3 text-white'
                                                ></i>
                                                <img src='/static/img/eye.png' width={'20px'} />
                                                <p className='text-white p-0 m-0'>{item?.view_count}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <Modal
                open={openDetailModal}
                title="Portfolio"
                onCancel={() => setOpenDetailModel(false)}
                width={800}
                footer={null}
            >
                <ProtfolioModal data={
                    portfolioData?.items?.find(item => item.id === cardId)
                } onClose={setOpenDetailModel} />
            </Modal>

            <Modal
                open={openModal}
                title="Portfolioni tahrirlash"
                onCancel={() => setOpenModal(false)}
                width={800}
                footer={null}
            >
                <PortfolioEditForm onClose={setOpenModal} portId={cardId} data={portfolioData?.items} />
            </Modal>

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
    );
}
