import React, { useEffect } from 'react';
import { FloatButton } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { setCompareItems, setWishlistTtems } from '~/store/ecomerce/action';
import PageLoader from '~/components/elements/common/PageLoader';
import NavigationList from '~/components/shared/navigation/NavigationList';
import NavigationListAdmin from '../shared/navigation/NavigationListAdmin';
import { useRouter } from 'next/router';
import NavigationListSeller from '../shared/navigation/NavigationListSeller';
import NavigationListCustomer from '../shared/navigation/NavigationListCustomer';

const MasterLayout = ({ children }) => {
    const dispatch = useDispatch();
    const [cookies] = useCookies(['cart', 'compare', 'wishlist']);
    const { accountLinks, user } = useSelector((state) => state.auth);
    const router = useRouter();
    const { pathname } = router;

    function initEcomerceValues() {
        if (cookies) {
            if (cookies.wishlist) {
                dispatch(setWishlistTtems(cookies.wishlist));
            }
            if (cookies.compare) {
                dispatch(setCompareItems(cookies.compare));
            }
        }
    }

    useEffect(() => {
        initEcomerceValues();
    }, []);

    return (
        <>
            {children}
            <PageLoader />
            {accountLinks.some((el) => el.url === pathname) ? (
                user?.role === 'admin' ? (
                    <NavigationListAdmin />
                ) : user?.role === 'seller' ? (
                    <NavigationListSeller />
                ) : (
                    <NavigationListCustomer />
                )
            ) : (
                <NavigationList />
            )}
            <FloatButton.BackTop>
                <button className="ps-btn--backtop">
                    <i className="icon-arrow-up" />
                </button>
            </FloatButton.BackTop>
        </>
    );
};

export default MasterLayout;
