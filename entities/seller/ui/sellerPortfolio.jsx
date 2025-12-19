import { Skeleton, Modal, Button } from 'antd';
import { useEffect, useState } from 'react';
import ServiceIsUnavailable from './ServiceIsUnavailable';
import { useQuery } from '@tanstack/react-query';
import { apiForFreelance } from '~/repositories/api';
import PortfolioCard from '~/features/freelancers/services/service-deatail/ui/PortfolioCard';

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
            const parent = categories?.find((cat) => cat.id === parentCategory);
            setChildCategories(parent?.children || []);
        } else {
            setChildCategories([]);
        }
    }, [parentCategory, portfolios]);

    // portfolio detail

    const { data: portfolios, isLoading } = useQuery({
        queryFn: ['sellerPorfolios'],
        queryFn: async () => {
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
                ) : portfolios?.length == 0 ? (
                    <ServiceIsUnavailable type="portfolio" />
                ) : (
                    <div className="row">
                        {portfolios?.map((item, index) => (
                            <div className="col-6 col-md-4 p-1" key={index}>
                                <PortfolioCard portfolio={item} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
