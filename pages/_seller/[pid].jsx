import Link from 'next/link';
import { useRouter } from 'next/router';
import PageContainer from '~/components/layouts/PageContainer';
import SellerCollapseMenu from '~/components/shared/seller-profile/sellerCollapseMenu';
import SellerComments from '~/components/shared/seller-profile/sellerComments';
import SellerInfo from '~/components/shared/seller-profile/sellerInfo';
import SellerPortfolio from '~/components/shared/seller-profile/sellerPortfolio';
import SellerProduct from '~/components/shared/seller-profile/sellerProduct';
import SellerServices from '~/components/shared/seller-profile/sellerServices';
import SellerShortInfo from '~/components/shared/seller-profile/sellerShortInfo';
import { useGet } from '~/repositories/https';

export default function SellersPage () {
    const { asPath } = useRouter();
    const activeIndex = asPath.slice(asPath.indexOf('#') + 1, asPath.length);

    const router = useRouter();
    const { productId } = router.query;

    console.log('productId', productId);

    const sellerTabItems = {
        about_author: <SellerInfo />,
        services: <SellerServices />,
        portfolio: <SellerPortfolio />,
        comments: <SellerComments />,
        products: <SellerProduct />,
    };

    const menuItems = [
        {
            title: 'Muallif Haqida',
            path: 'about_author',
        },
        {
            title: 'Portfolio',
            path: 'portfolio',
        },
        {
            title: 'Xizmatlar',
            path: 'services',
        },
        {
            title: 'Mahsulotlar',
            path: 'products',
        },
        {
            title: 'Kamentariyalar',
            path: 'comments',
        },
    ];

    const id = 28977;

    const { data, isLoading } = useGet('users', `/users/${id}/`);

    console.log('data', data);

    return (
        <PageContainer>
            <div className='container bg-gray-999 '>
                <div className='SellersPageWrap'>
                    <div className=''>
                        <SellerShortInfo />
                    </div>
                    <div className='SellerCollapseMenu'>
                        <SellerCollapseMenu />
                    </div>
                    <div className='sellerProduct '>
                        <div className='shadow-sm'>
                            <div className='sellerProductMenu'>
                                {menuItems.map((item, index) => (
                                    <Link href={`#${item.path}`} key={index}>
                                        <a
                                            className={`activeTab ${
                                                activeIndex === item.path
                                                    ? 'active'
                                                    : ''
                                            }`}>
                                            {item.title}
                                        </a>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        {sellerTabItems[activeIndex]}
                    </div>
                </div>
            </div>
        </PageContainer>
    );
}
