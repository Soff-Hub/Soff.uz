import React from 'react'
import styles from "../styles/LastProducts.module.scss"
import { useGet } from '~/repositories/https'
import ProductCard from '../ui/ProductCard';

const LastProducts = () => {
    const { data: fileData, isLoading: fileLoading } = useGet(
        'file_product',
        "customer/last-added/?direction=file&limit=4"
    );

    const { data: threeDData, isLoading: threeDLoading } = useGet(
        'three_d_product',
        "customer/last-added?direction=3d&limit=4"
    );

    const { data: designData, isLoading: designLoading } = useGet(
        'design_product',
        "customer/last-added?direction=design&limit=4"
    );

    const { data: videoData, isLoading: videoLoading } = useGet(
        'video_product',
        "customer/last-added?direction=video&limit=4"
    );

    const { data: websiteData, isLoading: websiteLoading } = useGet(
        'web_product',
        "customer/last-added?direction=website&limit=4"
    );

    const { data: templateData, isLoading: templateLoading } = useGet(
        'templates_product',
        "customer/last-added?direction=template&limit=4"
    );

    return (
        <section className={styles.wrapper}>
            <div className={styles.titleWrapper}>
                <img src="/static/img/HomePage/icon.png" alt="badge" className={styles.badge} />
                <h1>So’ngi yuklangan mahsulotlar</h1>
            </div>
            <div className={styles.productBox}>
                <h3>📚 Ilmiy ishlar</h3>
                <div className='row px-1'>
                    {fileData?.results?.map(p =>
                        <div className='col-md-3 col-6 p-2'>
                            <ProductCard product={p} />
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.productBox}>
                <h3>🏠 3D moddellar</h3>
                <div className='row px-1'>
                    {threeDData?.results?.map(p =>
                        <div className='col-md-3 col-6 p-2'>
                            <ProductCard product={p} />
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.productBox}>
                <h3>🎨 Dizayn shablonlari</h3>
                <div className='row px-1'>
                    {designData?.results?.map(p =>
                        <div className='col-md-3 col-6 p-2'>
                            <ProductCard product={p} />
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.productBox}>
                <h3>🎥 Video ishlanmalar</h3>
                <div className='row px-1'>
                    {videoData?.results?.map(p =>
                        <div className='col-md-3 col-6 p-2'>
                            <ProductCard product={p} />
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.productBox}>
                <h3>📝 Tayyor shablonlar</h3>
                <div className='row px-1'>
                    {templateData?.results?.map(p =>
                        <div className='col-md-3 col-6 p-2'>
                            <ProductCard product={p} />
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.productBox}>
                <h3>🌐 Vebsaytlar</h3>
                <div className='row px-1'>
                    {websiteData?.results?.map(p =>
                        <div className='col-md-3 col-6 p-2'>
                            <ProductCard product={p} />
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default LastProducts