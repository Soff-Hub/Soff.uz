import Link from 'next/link';
import Image from 'next/image';
import styles from './style.module.scss';
import { Skeleton } from 'antd';

const readyProducts = [
    {
        href: '/scientific-resources/all',
        img: '/static/img/HomePage/file3.webp',
        alt: 'Ilmiy ishlar',
        label: 'Ilmiy ishlar',
    },
    {
        href: '/3d-models-and-interior-designs/all',
        img: '/static/img/HomePage/3d2.webp',
        alt: '3D Modellar',
        label: '3D Modellar',
    },
    {
        href: '/design-developments/all',
        img: '/static/img/HomePage/design1.webp',
        alt: 'Dizayn shablonlari',
        label: 'Dizayn shablonlari',
    },
    {
        href: '/websites/all',
        img: '/static/img/HomePage/web2.webp',
        alt: 'Veb saytlar',
        label: 'Veb saytlar',
    },
    {
        href: '/templates/all',
        img: '/static/img/HomePage/template2.webp',
        alt: 'Shablonlar',
        label: 'Shablonlar',
    },
    {
        href: '/video-lessons',
        img: '/static/img/HomePage/video1.webp',
        alt: 'Video darsliklar',
        label: 'Video darsliklar',
    },
];

// 2️⃣ Xizmatlar ro‘yxati
const services = [
    {
        href: '/orders?direction=scientific_work',
        img: '/static/img/HomePage/file2.webp',
        alt: 'Ilmiy va Akademik xizmatlar',
        label: 'Ilmiy va Akademik Xizmatlar',
    },
    {
        href: '/orders?direction=dizayn',
        img: '/static/img/HomePage/design3.webp',
        alt: 'Dizayn xizmatlari',
        label: 'Dizayn xizmatlari',
    },
    {
        href: '/orders?direction=web',
        img: '/static/img/HomePage/web3.webp',
        alt: 'Dasturlash xizmatlari',
        label: 'Dasturlash xizmatlari',
    },
    {
        href: '/orders?direction=three_d',
        img: '/static/img/HomePage/3d.webp',
        alt: '3D Dizayn va Vizualizatsiya',
        label: '3D Dizayn va Vizualizatsiya',
    },
];
const CategorySection = () => {
    const renderCategoryBlock = (title, items, showBadge = false) => (
        <div className={styles.categoryBlock}>
            <div className={styles.titleWrapper}>
                {showBadge && (
                    <Image
                        priority
                        src="/static/img/star.svg"
                        alt="badge"
                        width={30}
                        height={30}
                        className={styles.badge}
                    />
                )}
                <h3>{title}</h3>
            </div>
            <div className={styles.categoryGrid}>
                {items.map((item, index) => (
                    <Link key={index} href={item.href}>
                        <div className={styles.categoryItem}>
                            <Image
                                src={item.img}
                                alt={item.alt}
                                width={40}
                                height={40}
                                style={{ objectFit: 'contain' }}
                                loading={index < 4 ? "eager" : "lazy"}
                                priority={index < 4}
                            />
                            <span>{item.label}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );

    return (
        <div
            style={{ backgroundColor: 'transparent' }}
            className={styles.heroCategorySection}>
            {renderCategoryBlock(
                'Tayyor yuklangan mahsulotlar',
                readyProducts,
                true
            )}
            {renderCategoryBlock(
                'Xizmatni tanlang – Buyurtma bering',
                services
            )}
        </div>
    );
};

export default CategorySection;
