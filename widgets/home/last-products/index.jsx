import React from 'react';
import styles from './style.module.scss';
import { useGet } from '~/repositories/https';
import Link from 'next/link';
import { RightOutlined } from '@ant-design/icons';
import useResponsive from '~/shared/utilities/useResponsive';
import ProductCard from '~/entities/product/product-card';
import { LAST_ADDED_PRODUCTS } from '~/shared/api/end-points';


const LastProducts = () => {
    const { isMobile } = useResponsive();

    const limit = isMobile ? 6 : 5;

    const { data: fileData, isLoading: fileLoading } = useGet(
        'file_product',
        `${LAST_ADDED_PRODUCTS}?direction=file&limit=${limit}`
    );

    const { data: threeDData, isLoading: threeDLoading } = useGet(
        'three_d_product',
        `${LAST_ADDED_PRODUCTS}?direction=3d&limit=${limit}`
    );

    const { data: designData, isLoading: designLoading } = useGet(
        'design_product',
        `${LAST_ADDED_PRODUCTS}?direction=design&limit=${limit}`
    );

    const { data: videoData, isLoading: videoLoading } = useGet(
        'video_product',
        `${LAST_ADDED_PRODUCTS}?direction=video&limit=${limit}`
    );

    const { data: websiteData, isLoading: websiteLoading } = useGet(
        'web_product',
        `${LAST_ADDED_PRODUCTS}?direction=website&limit=${limit}`
    );

    const { data: templateData, isLoading: templateLoading } = useGet(
        'templates_product',
        `${LAST_ADDED_PRODUCTS}?direction=template&limit=${limit}`
    );

    return (
        <section className={styles.wrapper}>
            <div className={styles.titleWrapper}>
                <img
                    src="/static/img/star.svg"
                    alt="badge"
                    className={styles.badge}
                />
                <h1>So’ngi yuklangan mahsulotlar</h1>
            </div>
            {fileData?.results?.length > 0 && <div className={styles.productBox}>
                <Link href={`/scientific-resources/all`}>
                    <div className={styles.titleBox}>
                        <h3>Ilmiy ishlar </h3>
                        <RightOutlined style={{ fontSize: '20px' }} />
                    </div>
                </Link>
                <div className='row px-1 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-gap-4'>
                    {fileData?.results?.map(p =>
                        <div key={p.id} className='col px-2'>
                            <ProductCard product={p} />
                        </div>
                    )}
                </div>
            </div>}
            {threeDData?.results?.length > 0 && <div className={styles.productBox}>
                <Link href={`/3d-models-and-interior-designs/all`}>
                    <div className={styles.titleBox}>
                        <h3>3D moddellar</h3>
                        <RightOutlined style={{ fontSize: '20px' }} />
                    </div>
                </Link>
                <div className='row px-1 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-gap-4'>
                    {threeDData?.results?.map(p =>
                        <div key={p.id} className='col px-2'>
                            <ProductCard product={p} />
                        </div>
                    )}
                </div>
            </div>
            }
            {designData?.results?.length > 0 && <div className={styles.productBox}>
                <Link href={`/design-developments/all`}>
                    <div className={styles.titleBox}>
                        <h3>Dizayn shablonlari</h3>
                        <RightOutlined style={{ fontSize: '20px' }} />
                    </div>
                </Link>
                <div className='row px-1 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-gap-4'>
                    {designData?.results?.map(p =>
                        <div className='col px-2'>
                            <ProductCard product={p} />
                        </div>
                    )}
                </div>
            </div>
            }
            {videoData?.results?.length > 0 && <div className={styles.productBox}>
                <Link href={`/video-lessons/all`}>
                    <div className={styles.titleBox}>
                        <h3>Video ishlanmalar</h3>
                        <RightOutlined style={{ fontSize: '20px' }} />
                    </div>
                </Link>
                <div className='row px-1 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-gap-4'>
                    {videoData?.results?.map(p =>
                        <div className='col px-2'>
                            <ProductCard product={p} />
                        </div>
                    )}
                </div>
            </div>}
            {templateData?.results?.length > 0 && <div className={styles.productBox}>
                <Link href={`/templates/all`}>
                    <div className={styles.titleBox}>
                        <h3>Tayyor shablonlar</h3>
                        <RightOutlined style={{ fontSize: '20px' }} />
                    </div>
                </Link>
                <div className='row px-1 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-gap-4'>
                    {templateData?.results?.map(p =>
                        <div className='col px-2'>
                            <ProductCard product={p} />
                        </div>
                    )}
                </div>
            </div>
            }
            {websiteData?.results?.length > 0 && <div className={styles.productBox}>
                <Link href={`/websites/all`}>
                    <div className={styles.titleBox}>
                        <h3>Vebsaytlar</h3>
                        <RightOutlined style={{ fontSize: '20px' }} />
                    </div>
                </Link>
                <div className='row px-1 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-gap-4'>
                    {websiteData?.results?.map(p =>
                        <div className='col px-2'>
                            <ProductCard product={p} />
                        </div>
                    )}
                </div>
            </div>
            }
        </section>
    );
};

export default LastProducts;
