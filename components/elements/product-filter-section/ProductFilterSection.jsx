import React, { useEffect, useRef, useState } from 'react';
import styles from './ProductFilter.module.scss';
import { SearchOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import useDebounce from '~/hooks/useDebounce';

const childC = [
    'Texnika fanlari',
    'Iqtisodiyot',
    'Tibbiyot',
    'Tarix',
    'Adabiyot',
    'Psixologiya',
    'Falsafa',
    'Huquqshunoslik',
];

const parentC = [
    'Axborot texnologiyalari',
    'Dasturlash tillari',
    'Sun’iy intellekt',
    'Makroiqtisodiyot',
    'Buxgalteriya hisobi',
    'Bank ishi',
    'Kardiologiya',
    'Farmatsiya',
    'O‘zbekiston tarixi',
    'Jahon tarixi',
    'Adabiy tanqid',
    'She’riyat nazariyasi',
    'Shaxs psixologiyasi',
    'Ijtimoiy psixologiya',
    'Etika',
    'Logika',
    'Fuqarolik huquqi',
    'Mehnat huquqi',
];

const ProductFilterSection = ({ child, parent, path }) => {
    const { query, pathname, push } = useRouter();
    const parentRef = useRef(null);
    const childRef = useRef(null);
    const [showParentArrow, setShowParentArrow] = useState(false);
    const [showChildArrow, setShowChildArrow] = useState(false);
    const [title, setTitle] = useState(query.slug || 'Barchasi');
    const [sybTitle, setSybTitle] = useState('');
    const [search, setSearch] = useState('');

    const debouncedSearch = useDebounce(search, 500);

    const handleParent = (slug, name) => {
        push({
            pathname: `${path}${slug}`,
            query: { ...query, parentCategory: slug, childCategory: '' },
        });
        setTitle(name);
        setSybTitle('');
    };

    const handleChild = (slug, name) => {
        push({
            pathname: `${path}${slug}`,
            query: { ...query, childCategory: slug },
        });
        setSybTitle(name);
    };

    const scrollLeft = ref => {
        ref.current.scrollBy({ left: -200, behavior: 'smooth' });
    };

    const scrollRight = ref => {
        ref.current.scrollBy({ left: 200, behavior: 'smooth' });
    };

    useEffect(() => {
        const childCont = childRef.current;
        if (!childCont) return;

        setShowChildArrow(childCont.scrollWidth > childCont.clientWidth);
    }, [child]);

    useEffect(() => {
        const parentCont = parentRef.current;
        if (!parentCont) return;

        setShowParentArrow(parentCont.scrollWidth > parentCont.clientWidth);
    }, [parent]); 
    
    useEffect(() => {
        if (query.slug) {
            setTitle(query.slug);
        }
    }, [query]);
    return (
        <div className={`${styles.filter}  container`}>
            <h1 className={styles.title}>
                {title.replace('-', ' ')}
                {sybTitle && ` & ${sybTitle}`}
            </h1>
            <div className={`${styles.searchBox} container `}>
                <input
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Qanday mahsulot izlamoqdasiz?"
                    className={styles.input}
                    type="text"
                />
                <span className={styles.searchIcon}>
                    <SearchOutlined />
                </span>
            </div>

            {/* Parent carousel */}
            <div className={styles.carouselTestWrapper}>
                {showParentArrow && (
                    <LeftOutlined
                        className={`${styles.arrow} ${styles.left}`}
                        onClick={() => scrollLeft(parentRef)}
                    />
                )}
                <div
                    className={styles.carouselTest}
                    ref={parentRef}
                    style={{
                        justifyContent: showParentArrow ? 'start' : 'center',
                    }}>
                    {parent.map((cat, index) => (
                        <span
                            key={cat.slug}
                            onClick={() => handleParent(cat?.slug, cat?.name)}
                            className={`${
                                styles.parentCat
                            } ${(query.parentCategory === cat.slug ||
                                query.slug === cat.slug) &&
                                styles.active}`}>
                            {cat?.name}
                        </span>
                    ))}
                </div>
                {showParentArrow && (
                    <RightOutlined
                        className={`${styles.arrow} ${styles.right}`}
                        onClick={() => scrollRight(parentRef)}
                    />
                )}
            </div>

            {/* Child carousel */}
            <div className={styles.carouselTestWrapper}>
                {showChildArrow && (
                    <LeftOutlined
                        className={`${styles.arrow} ${styles.left}`}
                        onClick={() => scrollLeft(childRef)}
                    />
                )}
                <div
                    className={styles.carouselTest}
                    ref={childRef}
                    style={{
                        justifyContent: showChildArrow ? 'start' : 'center',
                    }}>
                    {query?.parentCategory && (
                        <>
                            {child.map(cat => (
                                <span
                                    key={cat.slug}
                                    onClick={() =>
                                        handleChild(cat?.slug, cat?.name)
                                    }
                                    className={`${
                                        styles.childCat
                                    } ${(query.childCategory === cat.slug ||
                                        query.slug === cat.slug) &&
                                        styles.active}`}>
                                    {cat?.name}
                                </span>
                            ))}
                        </>
                    )}
                </div>
                {showChildArrow && (
                    <RightOutlined
                        className={`${styles.arrow} ${styles.right}`}
                        onClick={() => scrollRight(childRef)}
                    />
                )}
            </div>
        </div>
    );
};

export default ProductFilterSection;
