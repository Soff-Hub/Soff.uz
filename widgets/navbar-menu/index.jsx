import React, { useRef, useState, useEffect } from 'react';
import styles from './style.module.scss';
import menuItemStyle from './menuItem.module.scss';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useFGet } from '~/shared/hooks/useFApi';
import { NAVBAR_MENU_CATEGORIES } from '~/shared/api/end-points';
import { directions } from '~/components/freeleance/constants';
import { options } from '~/shared/constants/createOrder';

const NavbarMenu = () => {
    const { data, isLoading } = useFGet('navbar-items', NAVBAR_MENU_CATEGORIES);
    console.log('navbar items', data);

    if (isLoading && !data) return null;

    return (
        <>
            {data && (
                <nav className={styles.navSectionBlock}>
                    <div className="container">
                        <div className={styles.navbarWrapper}>
                            {data?.map(item => (
                                <MenuItem
                                    key={item.direction}
                                    products={item.freelance_categories}
                                    templates={item.soff_categories}
                                    label={item.direction}
                                />
                            ))}
                        </div>
                    </div>
                </nav>
            )}
        </>
    );
};

export default NavbarMenu;

const option = directions.reduce((acc, item) => {
    acc[item.value] = item.label;
    return acc;
}, {});
// {
//     scientific_work: 'Ilmiy va Akademik Xizmatlar',
//     three_d: '3D Dizayn va Vizualizatsiya',
//     web: 'Dasturlash xizmatlari',
//     dizayn: 'Dizayn',
//     document: 'Shablonlar',
// };

const templateLink = {
    scientific_work: 'scientific-resources',
    three_d: '3d-models-and-interior-designs',
    web: 'websites',
    dizayn: 'design-developments',
    document: 'templates',
};

const MenuItem = ({ products, templates, label }) => {
    const router = useRouter();
    const dropdownRef = useRef(null);
    const menuItemRef = useRef(null);
    const [isOverflowing, setIsOverflowing] = useState(false);

    const checkOverflow = () => {
        if (dropdownRef.current && menuItemRef.current) {
            // Temporarily make dropdown visible to measure it
            const dropdown = dropdownRef.current;
            const originalDisplay = dropdown.style.display;
            const originalVisibility = dropdown.style.visibility;

            dropdown.style.display = 'flex';
            dropdown.style.visibility = 'hidden';

            const rect = dropdown.getBoundingClientRect();
            const windowWidth = window.innerWidth;

            setIsOverflowing(rect.right > windowWidth);

            // Restore original styles
            dropdown.style.display = originalDisplay;
            dropdown.style.visibility = originalVisibility;
        }
    };

    const handleMouseEnter = () => {
        // Small delay to ensure dropdown is rendered
        setTimeout(checkOverflow, 10);
    };

    console.log({ options });
    return (
        <div
            ref={menuItemRef}
            className={menuItemStyle.menuItem}
            onMouseEnter={handleMouseEnter}>
            <button type="button" className={menuItemStyle.label}>
                {option[label]}
            </button>
            <div
                ref={dropdownRef}
                className={`${menuItemStyle.dropDown} ${
                    isOverflowing ? menuItemStyle.overflowing : ''
                }`}>
                <div className={menuItemStyle.templates}>
                    <h3
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                            router.push(`/${templateLink[label]}/all`)
                        }
                        className={menuItemStyle.sectionLabel}>
                        Tayyor mahsulotlar
                    </h3>
                    <ul className={menuItemStyle.details}>
                        {templates.map(item => (
                            <Link
                                key={item.id}
                                href={`/${templateLink[label]}/${item.slug}?slug=${item.slug}&search=&parentCategory=${item.slug}&title=${item.title}`}>
                                <a className={menuItemStyle.detail}>
                                    {item.title}
                                </a>
                            </Link>
                        ))}
                    </ul>
                </div>
                <div className={menuItemStyle.orders}>
                    <h3
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                            router.push(`/orders?direction=${label}`)
                        }
                        className={menuItemStyle.sectionLabel}>
                        Buyurtma berish
                    </h3>
                    <ul className={menuItemStyle.details}>
                        {products.map(item => (
                            <Link
                                key={item.id}
                                href={`/orders?direction=${label}&category_id=${item.id}&title=${item.title}`}>
                                <a className={menuItemStyle.detail}>
                                    {item.title}
                                </a>
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
