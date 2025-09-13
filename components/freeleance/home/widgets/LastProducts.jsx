import React from 'react';
import styles from '../styles/LastProducts.module.scss';
import { useGet } from '~/repositories/https';
import ProductCard from '../ui/ProductCard';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { RightOutlined } from '@ant-design/icons';


const LastProducts = () => {
    const { push } = useRouter()

    const { data: fileData, isLoading: fileLoading } = useGet(
        'file_product',
        "customer/last-added/?direction=file&limit=5"
    );

    const { data: threeDData, isLoading: threeDLoading } = useGet(
        'three_d_product',
        "customer/last-added?direction=3d&limit=5"
    );

    const { data: designData, isLoading: designLoading } = useGet(
        'design_product',
        "customer/last-added?direction=design&limit=5"
    );

    const { data: videoData, isLoading: videoLoading } = useGet(
        'video_product',
        "customer/last-added?direction=video&limit=5"
    );

    const { data: websiteData, isLoading: websiteLoading } = useGet(
        'web_product',
        "customer/last-added?direction=website&limit=5"
    );

    const { data: templateData, isLoading: templateLoading } = useGet(
        'templates_product',
        "customer/last-added?direction=template&limit=5"
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
            <div className={styles.productBox}>
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
            </div>
            <div className={styles.productBox}>
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
            <div className={styles.productBox}>
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
            <div className={styles.productBox}>
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
            </div>
            <div className={styles.productBox}>
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
            <div className={styles.productBox}>
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
        </section>
    );
};

export default LastProducts;
