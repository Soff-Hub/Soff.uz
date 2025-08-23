import Image from 'next/image';
import Router from 'next/router';
import React from 'react';
import MenuCategoriesDropdown from '~/components/shared/menu/MenuCategoriesDropdown';
import HeaderAIIcon from './HeaderActions/HeaderAIIcon';
import useResponsive from '~/utilities/useResponsive';

export default function HeaderLogo({ mode }) {
    const { isMobile } = useResponsive();
    return (
        <div className="d-flex gap-5 align-items-center">
            <div
                className="site-header-logo p-0 m-0"
                style={{ cursor: 'pointer' }}
                onClick={() => Router.push('/')}>
                <Image
                    src={`/static/img/soff/logo-${mode}.png`}
                    width={'130.37px'}
                    height={'36.67px'}
                    alt="Logo of Soff.uz"
                />
            </div>
            {!isMobile && (
                <>
                    <HeaderAIIcon />
                    <MenuCategoriesDropdown />
                </>
            )}
        </div>
    );
}
