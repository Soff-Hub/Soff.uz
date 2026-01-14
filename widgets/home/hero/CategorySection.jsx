import Link from 'next/link';
import Image from 'next/image';
import styles from './style.module.scss';
import { useTranslation } from 'next-i18next';

const CategorySection = () => {
    const { t } = useTranslation('index');
    
    const readyProducts = [
        {
            href: '/scientific-resources/all',
            img: '/static/img/HomePage/file3.webp',
            alt: t('categorySection.categories.scientific'),
            label: t('categorySection.categories.scientific'),
        },
        {
            href: '/3d-models-and-interior-designs/all',
            img: '/static/img/HomePage/3d2.webp',
            alt: t('categorySection.categories.3d'),
            label: t('categorySection.categories.3d'),
        },
        {
            href: '/design-developments/all',
            img: '/static/img/HomePage/design1.webp',
            alt: t('categorySection.categories.design'),
            label: t('categorySection.categories.design'),
        },
        {
            href: '/websites/all',
            img: '/static/img/HomePage/web2.webp',
            alt: t('categorySection.categories.websites'),
            label: t('categorySection.categories.websites'),
        },
        {
            href: '/templates/all',
            img: '/static/img/HomePage/template2.webp',
            alt: t('categorySection.categories.templates'),
            label: t('categorySection.categories.templates'),
        },
        {
            href: '/video-lessons/all',
            img: '/static/img/HomePage/video1.webp',
            alt: t('categorySection.categories.video'),
            label: t('categorySection.categories.video'),
        },
    ];

    // 2️⃣ Xizmatlar ro'yxati
    const services = [
        {
            href: '/orders?direction=scientific_work',
            img: '/static/img/HomePage/file2.webp',
            alt: t('categorySection.categories.scientificServices'),
            label: t('categorySection.categories.scientificServices'),
        },
        {
            href: '/orders?direction=dizayn',
            img: '/static/img/HomePage/design3.webp',
            alt: t('categorySection.categories.designServices'),
            label: t('categorySection.categories.designServices'),
        },
        {
            href: '/orders?direction=web',
            img: '/static/img/HomePage/web3.webp',
            alt: t('categorySection.categories.programmingServices'),
            label: t('categorySection.categories.programmingServices'),
        },
        {
            href: '/orders?direction=three_d',
            img: '/static/img/HomePage/3d.webp',
            alt: t('categorySection.categories.3dServices'),
            label: t('categorySection.categories.3dServices'),
        },
    ];
    const renderCategoryBlock = (title, items, showBadge = false) => (
        <div className={styles.categoryBlock}>
            <div className={styles.titleWrapper}>
                {showBadge && (
                    <img
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
                                loading="lazy"
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
                t('categorySection.readyProducts'),
                readyProducts,
                true
            )}
            {renderCategoryBlock(
                t('categorySection.selectService'),
                services
            )}
        </div>
    );
};

export default CategorySection;
