import Link from 'next/link';
import React from 'react';
import MenuCategoriesDropdown from '~/components/shared/menu/MenuCategoriesDropdown'; 
import useResponsive from '~/utilities/useResponsive';

export default function HeaderTop() {
    const { isMobile } = useResponsive();
    return (
        <div className=" header__top__items py-2">
            <div className="d-flex justify-content-between align-items-center">
                <Link href="https://t.me/soff_uz">
                    <a
                        target="_blank"
                        className="rounded-circle"
                        style={{
                            display: 'flex',
                            padding: 4,
                            color: '#0088cc',
                            border: '1px solid #0088cc',
                        }}>
                        <i className="fa-regular fa-paper-plane"></i>
                    </a>
                </Link>
                {/*  <HeaderAIIcon />*/}
                <MenuCategoriesDropdown />
            </div>
        </div>
    );
}
