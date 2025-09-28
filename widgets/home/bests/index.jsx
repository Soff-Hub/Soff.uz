import React from 'react'
import styles from "./style.module.scss"
import { useGet } from '~/repositories/https'
import Link from 'next/link'

const Bests = () => {
    const { data: sellers } = useGet("customer/top-seller-statistics", `customer/top-seller-statistics/`, {
        filter_stats: 'active_sellers',
        filter_by: "week",
    })

    const { data: authors } = useGet(
        "customer/top-seller-statistics",
        `customer/top-seller-statistics/`,
        {
            filter_stats: 'best_seller',
            filter_by: "week",
        }
    )

    const { data: products } = useGet(
        "customer/top-seller-statistics",
        `customer/top-seller-statistics/`,
        {
            filter_stats: 'top_product',
            filter_by: "week",
        }
    )

    return (
        <div id='bests' className={styles.bestsWrapper}>
            <div className={styles.titleWrapper}>
                <img src="/static/img/star.svg" alt="badge" className={styles.badge} />
                <h2>Haftaning eng yaxshilari</h2>
            </div>

            <div className={styles.grid}>
                {/* Eng faol sotuvchilar */}
                <div className={styles.column}>
                    <h3 className={styles.columnTitle}>Eng faol sotuvchilar</h3>
                    {sellers?.map((item, idx) => (
                        <Link key={item.id || idx} href={`/seller/${item?.id}`}>
                            <div className={styles.item} >
                                <img

                                    src={item.image || "/static/img/ozodbek.png"}
                                    alt={item.first_name}
                                    className={styles.avatar}
                                />
                                <div>
                                    <p className={`${styles.name} p-0`}>
                                        {item.first_name} {item.last_name}
                                    </p>
                                    <p className={styles.infoGreen}>
                                        {item.products_count} mahsulot yuklangan
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Bestseller mualliflari */}
                <div className={styles.column}>
                    <h3 className={styles.columnTitle}>Bestseller mualliflari</h3>
                    {authors?.map((item, idx) => (
                        <Link key={item.id || idx} href={`/seller/${item?.id}`}>
                            <div className={styles.item}>
                                <img
                                    src={item.image || "/static/img/ozodbek.png"}
                                    alt={item.first_name}
                                    className={styles.avatar}
                                />
                                <div>
                                    <p className={styles.name}>
                                        {item.first_name} {item.last_name}
                                    </p>
                                    <p className={styles.info}>
                                        {item.order_count} ta sotuv{" "}
                                        <span className={styles.infoGreen}>
                                            {item.total_amount.toLocaleString()} so’m
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Top mahsulotlar */}
                <div className={styles.column}>
                    <h3 className={styles.columnTitle}>Top mahsulotlar</h3>
                    {products?.map((item, idx) => (
                        <Link key={item.id || idx} href={`/product/${item?.slug}`}>
                            <div className={styles.item}>
                                <img
                                    src={item.poster || "/static/img/ozodbek.png"}
                                    alt={item.title}
                                    className={styles.avatar}
                                />
                                <div>
                                    <p className={styles.name}>{item.title}</p>
                                    <p className={styles.info}>
                                        {item.view_count} ta ko‘rilgan, {" "}
                                        <span className={styles.infoGreen}>{item.sold_count} ta sotilgan</span>
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Bests
