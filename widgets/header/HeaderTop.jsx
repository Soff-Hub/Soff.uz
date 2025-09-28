import React from 'react';
import MenuCategoriesDropdown from '~/components/shared/menu/MenuCategoriesDropdown';
import useResponsive from '~/shared/utilities/useResponsive';
import HeaderCatergories from './HeaderCategories';

export default function HeaderTop() {
    const { isMobile, isDesktop } = useResponsive();
    return (
        <div className=" header__top__items py-2">
            <div className="d-flex align-items-center  justify-content-end header__top__block">
                {!isDesktop && 
                    <HeaderCatergories />
                }

                <MenuCategoriesDropdown />
            </div>
        </div>
    );
}
