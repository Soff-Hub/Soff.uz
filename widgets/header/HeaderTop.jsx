import React from 'react';
import MenuCategoriesDropdown from '~/widgets/header/MenuCategoriesDropdown';
import useResponsive from '~/shared/utilities/useResponsive';
import HeaderCatergories from './HeaderCategories';

export default function HeaderTop() {
    const { isDesktop } = useResponsive();
    return (
        <div className=" header__top__items py-2">
            <div className="d-flex align-items-center flex-wrap justify-content-end header__top__block">
                {!isDesktop && <HeaderCatergories />}

                <MenuCategoriesDropdown />
            </div>
        </div>
    );
}
