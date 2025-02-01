import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import NavigationList from '~/components/shared/navigation/NavigationList';
import NavigationListAdmin from '../shared/navigation/NavigationListAdmin';
import { useRouter } from 'next/router';
import NavigationListSeller from '../shared/navigation/NavigationListSeller';
import NavigationListCustomer from '../shared/navigation/NavigationListCustomer';
import Backtop from '../elements/backTop';
import InlinePlayer from '../elements/InlinePlayer';
import { AudioContext } from '~/hooks/AudioContext';
import MobileInlinePlayer from '../elements/MobileInlinePlayer';
import useResponsive from '~/utilities/useResponsive';

const MasterLayout = ({ children }) => {
    const { accountLinks, user } = useSelector((state) => state.auth);
    const router = useRouter();
    const { pathname } = router;
    const [background, setBackground] = useState(false);
    const { playerVisible } = useContext(AudioContext)
    const { isMobile } = useResponsive()

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
            {/* <PageLoader /> */}
            {
            accountLinks.some((el) => el.url === pathname) || accountLinks.some((el) => el.url === pathname + "?page=1") && (
                user?.role === 'admin' ? (
                    <NavigationListAdmin />
                ) : user?.role === 'seller' ? (
                    <NavigationListSeller />
                ) : (
                    <NavigationListCustomer />
                )
            ) 
            // : (
            //     <NavigationList />
            // )
            }
            {!pathname.startsWith('/product/') && <div className="ant-back-top">
                <Backtop setBackground={setBackground} backtop={background} />
            </div>}
            <div
                onClick={() => setBackground(!background)}
                className={background ? 'backgound-black' : ''}></div>

            {playerVisible ? <div className={`inline-player`}>
                {isMobile ? <MobileInlinePlayer /> : <InlinePlayer />}
            </div> : ''}
        </>
    );
};

export default MasterLayout;
