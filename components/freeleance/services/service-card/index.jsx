import React, { useCallback, useState } from 'react'
import styles from './style.module.scss'
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import AuthModal from '~/components/AuthModal'
import { useRouter } from 'next/router'

const ServiceCard = ({ service }) => {
    const { isLoggedIn } = useSelector(state => state.auth)
    const [open, setOpen] = useState(false)
    const { push } = useRouter()

    const handleOrder = useCallback(() => {
        if (isLoggedIn) {
            push(`/service/${service?.slug}?modal=open`)
        } else {
            setOpen(true)
        }
    }, [isLoggedIn, push, service?.slug])



    return (
        <>
            <div className={styles.card}>
                <div className={styles.cardBody}>
                    <a href={`/service/${service?.slug}`} >
                        <h1 className={styles.cardTitle}>
                            {service?.title}
                        </h1>
                    </a>
                    <h3 className={styles.price}>
                        {formatCurrencyWithSpace(service?.price)} so'm
                    </h3>
                    <div className={styles.btns}>

                        <button onClick={() => push(`/service/${service?.slug}`)} className={styles.secondaryBtn}>
                            Batafsil
                        </button>

                        <button onClick={handleOrder} className={styles.primaryBtn}>
                            Buyurtma berish
                        </button>
                    </div>
                </div>
                <div className={styles.divider} />
                <div className={styles.footer}>
                    <Link href={`/seller/${service?.user?.soff_seller_id}`}>
                        <img className={styles.userImg} src={service?.user?.photo_url || "/static/img/ozodbek.png"} alt="user_img" />
                    </Link>
                    <Link href={`/seller/${service?.user?.soff_seller_id}`} className={styles.username}>{service?.user?.full_name}</Link>
                </div>
            </div>
            <AuthModal slug={service?.slug} open={open} onClose={() => setOpen(false)} />
        </>
    )
}

export default React.memo(ServiceCard) 