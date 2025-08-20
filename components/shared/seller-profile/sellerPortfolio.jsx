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
import { useQuery } from '@tanstack/react-query';
import { apiForFreelance } from '~/repositories/api';
import PortfolioCard from '~/components/freeleance/services/service-deatail/ui/PortfolioCard';
 
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

    useEffect(() => {
        if (typeof parentCategory === 'number') {
            const parent = categories?.find(cat => cat.id === parentCategory);
            setChildCategories(parent?.children || []);
        } else {
            setChildCategories([]);
        }
    }, [parentCategory, portfolios]);

    // portfolio detail
    const [openDetailModal, setOpenDetailModel] = useState(false);

    const { data: portfolios, isLoading } = useQuery({
        queryFn: ['sellerPorfolios'],
        queryFn: async () => {
            console.log(pid);
            const response = await apiForFreelance.get(
                `customer/portfolios/${pid}`
            );
            return response.data;
        },
        enabled: !!pid,
    });
 

    return (
        <div>
            <div className="SellerPortfolio">
                {isLoading ? (
                    <div className="sellerProductSkeletonWrap">
                        {Array(16)
                            .fill(0)
                            .map((_, i) => (
                                <Skeleton.Image
                                    key={i}
                                    active
                                    className="sellerProductSkeleton shadow"
                                    style={{
                                        width: '100%',
                                    }}
                                />
                            ))}
                    </div>
                ) : portfolios.length == 0 ? (
                    <ServiceIsUnavailable />
                ) : (
                    <div className="SellerPortfolioWrap">
                        {portfolios?.map((item, index) => (
                            <PortfolioCard portfolio={item} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

{
    /* <div
                                    key={index}
                                    className="SellerPortfolioCard">
                                    <img
                                        src={item?.cover_image[0]}
                                        alt={item?.title}
                                        className="SellerPortfolioCardImg"
                                        onClick={() => {
                                            setOpenDetailModel(true);
                                            setCardId(item.id);
                                        }}
                                    />
                                    <div className="SellerPortfolioCardbody">
                                        <p className="SellerPortfolioCardTitle">
                                            {item?.title}
                                        </p>
                                        <div className="SellerPortfolioCardEnd d-flex justify-content-between">
                                            <p className="SellerPortfolioCardEndTitle">
                                                {item?.sub_category?.title}
                                            </p>
                                            <div className="SellerPortfolioCard_view_count">
                                                <i
                                                    onClick={() => {
                                                        setCardId(item.id);
                                                        setOpenModal(true);
                                                    }}
                                                    className="fa-solid fa-pen fs-4 mx-3 text-white"></i>
                                                <img
                                                    src="/static/img/eye.png"
                                                    width={'20px'}
                                                />
                                                <p className="text-white p-0 m-0">
                                                    {item?.view_count}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div> */
}
