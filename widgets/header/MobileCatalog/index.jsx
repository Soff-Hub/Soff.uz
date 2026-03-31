import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
    MdClose,
    MdLayers,
    MdKeyboardArrowRight,
    MdKeyboardArrowDown,
    MdPersonOutline,
    MdEditNote,
    MdStorefront,
    MdAutoAwesome
} from 'react-icons/md';
import {
    TbBox,
    TbTool,
    TbDownload,
    TbBriefcase,
    TbSparkles,
    TbUpload,
    TbSchool,
    TbPalette,
    TbCode,
    TbVideo,
    TbSpeakerphone
} from 'react-icons/tb';
import styles from './mobile-catalog.module.scss';

const directionIcons = {
    scientific_work: <TbSchool size={22} strokeWidth={1.5} />,
    dizayn: <TbPalette size={22} strokeWidth={1.5} />,
    web: <TbCode size={22} strokeWidth={1.5} />,
    three_d: <TbBox size={22} strokeWidth={1.5} />,
    marketing: <TbSpeakerphone size={22} strokeWidth={1.5} />,
    video: <TbVideo size={22} strokeWidth={1.5} />,
    audio_video: <TbVideo size={22} strokeWidth={1.5} />,
    business: <TbBriefcase size={22} strokeWidth={1.5} />,
};

const categoryTitles = {
    audio_video: 'Audio va Video',
    marketing: 'Marketing va SMM',
    marketing_smm: 'Marketing va SMM',
    business: 'Biznes',
    three_d: '3D Dizayn va Vizualizatsiya',
    web: 'Veb Dasturlash',
    dizayn: 'Dizayn',
    scientific_work: 'Ilmiy va Akademik xizmatlar',
};

const templateLink = {
    scientific_work: 'category',
    three_d: '3d-models-and-interior-designs',
    web: 'websites',
    dizayn: 'design-developments',
    document: 'templates',
};

const formatCategoryTitle = (key) => {
    if (categoryTitles[key]) return categoryTitles[key];
    return key?.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const MobileCatalog = ({ isOpen, onClose, categoriesData }) => {
    const [expandedCategory, setExpandedCategory] = useState(null);

    const toggleCategory = (direction) => {
        setExpandedCategory(expandedCategory === direction ? null : direction);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className={styles.backdrop}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Sidebar */}
                    <motion.aside
                        className={styles.sidebar}
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        {/* Header */}
                        <div className={styles.sidebarHeader}>
                            <span className={styles.title}>Katalog</span>
                            <button className={styles.closeBtn} onClick={onClose}>
                                <MdClose size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className={styles.sidebarContent}>
                            {/* Main Categories */}
                            <div className={styles.categorySection}>
                                {categoriesData?.map((category) => (
                                    <div key={category.id} className={styles.categoryWrap}>
                                        <div
                                            className={`${styles.categoryHeader} ${expandedCategory === category.direction ? styles.active : ''}`}
                                            onClick={() => toggleCategory(category.direction)}
                                        >
                                            <div className={styles.labelWrap}>
                                                <span className={styles.icon}>
                                                    {directionIcons[category.direction] || <MdLayers size={20} />}
                                                </span>
                                                <span className={styles.text}>{formatCategoryTitle(category.direction)}</span>
                                            </div>
                                            <MdKeyboardArrowDown
                                                className={`${styles.chevron} ${expandedCategory === category.direction ? styles.rotate : ''}`}
                                            />
                                        </div>

                                        <AnimatePresence>
                                            {expandedCategory === category.direction && (
                                                <motion.div
                                                    className={styles.subCategories}
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    {/* MAHSULOTLAR */}
                                                    {category.soff_categories?.length > 0 && (
                                                        <div className={styles.subSection}>
                                                            <h5>Mahsulotlar</h5>
                                                            <div className={styles.links}>
                                                                {category.soff_categories.map(cat => (
                                                                    <Link
                                                                        key={cat.id}
                                                                        href={`/${templateLink[category.direction] || 'templates'}/${cat.slug}?slug=${cat.slug}&search=&parentCategory=${cat.slug}&title=${cat.title}`}
                                                                    >
                                                                        <a onClick={onClose}>{cat.title}</a>
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* XIZMATLAR */}
                                                    {category.freelance_categories?.length > 0 && (
                                                        <div className={styles.subSection}>
                                                            <h5>Xizmatlar</h5>
                                                            <div className={styles.links}>
                                                                {category.freelance_categories.map(cat => (
                                                                    <Link
                                                                        key={cat.id}
                                                                        href={`/orders?direction=${category.direction}&category_id=${cat.id}&title=${cat.title}`}
                                                                    >
                                                                        <a onClick={onClose}>{cat.title}</a>
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>

                            {/* Additional Links (Synchronized with Header SubRow) */}
                            <div className={styles.quickLinks}>
                                <h4 className={styles.sectionLabel}>Foydali</h4>

                                <Link href="/order/create">
                                    <a className={styles.quickLink} onClick={onClose}>
                                        <MdEditNote size={20} />
                                        Buyurtma berish
                                    </a>
                                </Link>

                                <Link href="/scientific-resources/all">
                                    <a className={styles.quickLink} onClick={onClose}>
                                        <TbDownload size={20} />
                                        Tayyor mahsulotlar
                                    </a>
                                </Link>

                                <Link href="/orders">
                                    <a className={styles.quickLink} onClick={onClose}>
                                        <TbBriefcase size={20} />
                                        Frilanserlik xizmatlari
                                    </a>
                                </Link>

                                <a
                                    href="https://soffia.uz/uz/dashboard"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.quickLink}
                                >
                                    <TbSparkles size={20} />
                                    AI xizmatlari
                                </a>

                                <a
                                    href="https://seller.soff.uz/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.quickLink}
                                >
                                    <TbUpload size={20} />
                                    Sotuvchi bo'lish
                                </a>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className={styles.sidebarFooter}>
                            <Link href="/auth/login">
                                <a className={styles.loginBtn} onClick={onClose}>
                                    <MdPersonOutline size={20} />
                                    Kirish / Ro'yxatdan o'tish
                                </a>
                            </Link>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
};

export default MobileCatalog;
