import React, { useEffect, useState } from 'react';
// import { FloatButton } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { setCompareItems, setWishlistTtems } from '~/store/ecomerce/action';
import PageLoader from '~/components/elements/common/PageLoader';
import NavigationList from '~/components/shared/navigation/NavigationList';
import NavigationListAdmin from '../shared/navigation/NavigationListAdmin';
import { useRouter } from 'next/router';
import NavigationListSeller from '../shared/navigation/NavigationListSeller';
import NavigationListCustomer from '../shared/navigation/NavigationListCustomer';
import Backtop from '../elements/backTop';

const MasterLayout = ({ children }) => {
    const dispatch = useDispatch();
    const [cookies] = useCookies(['cart', 'compare', 'wishlist']);
    const { accountLinks, user } = useSelector((state) => state.auth);
    const router = useRouter();
    const { pathname } = router;
    const [background, setBackground] = useState(false);

    function initEcomerceValues() {
        // if (cookies) {
        //     if (cookies.wishlist) {
        //         dispatch(setWishlistTtems(cookies.wishlist));
        //     }
        //     if (cookies.compare) {
        //         dispatch(setCompareItems(cookies.compare));
        //     }
        // }
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
            <div className="ant-back-top">
                <Backtop setBackground={setBackground} backtop={background} />
            </div>
            <div
                onClick={() => setBackground(!background)}
                className={background ? 'backgound-black' : ''}></div>
        </>
    );
};

export default MasterLayout;
