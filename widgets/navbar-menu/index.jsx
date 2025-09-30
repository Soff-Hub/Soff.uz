import React from 'react';
import styles from './style.module.scss';
import menuItemStyle from './menuItem.module.scss';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useFGet } from '~/shared/hooks/useFApi';
import { NAVBAR_MENU_CATEGORIES } from '~/shared/api/end-points';

const NavbarMenu = () => {
    const { data, isLoading } = useFGet('navbar-items', NAVBAR_MENU_CATEGORIES);

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




const option = {
    scientific_work: 'Ilmiy va Akademik Xizmatlar',
    three_d: '3D Dizayn va Vizualizatsiya',
    web: 'Dasturlash xizmatlari',
    dizayn: 'Dizayn',
    document: 'Shablonlar',
};

const templateLink = {
    scientific_work: 'scientific-resources',
    three_d: '3d-models-and-interior-designs',
    web: 'websites',
    dizayn: 'design-developments',
    document: 'templates',
};

const MenuItem = ({ products, templates, label }) => {
    const router = useRouter();

    return (
        <div className={menuItemStyle.menuItem}>
            <button type="button" className={menuItemStyle.label}>
                {option[label]}
            </button>
            <div className={menuItemStyle.dropDown}>
                <div className={menuItemStyle.templates}>
                    <h3 style={{ cursor: "pointer" }} onClick={() => router.push(`/${templateLink[label]}/all`)} className={menuItemStyle.sectionLabel}>Tayyor mahsulotlar</h3>
                    <ul className={menuItemStyle.details}>
                        {templates.map(item => (
                            <Link  key={item.id} href={`/${templateLink[label]}/${item.slug}?slug=${item.slug}&search=&parentCategory=${item.slug}&title=${item.title}`}>
                                <a className={menuItemStyle.detail}>{item.title}</a>
                            </Link>
                        ))}
                    </ul>
                </div>
                <div className={menuItemStyle.orders}>
                    <h3 style={{ cursor: "pointer" }} onClick={() => router.push(`/orders?direction=${label}`)} className={menuItemStyle.sectionLabel}>Buyurtma berish</h3>
                    <ul className={menuItemStyle.details}>
                        {products.map(item => (
                            <Link key={item.id} href={`/orders?direction=${label}&category_id=${item.id}&title=${item.title}`}>
                                <a className={menuItemStyle.detail}>{item.title}</a>
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};