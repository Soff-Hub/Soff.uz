import React from 'react';
import styles from '../styles/LastOpened.module.scss';
import LastOpenedCard from '../ui/LastOpenedCard';
import useLastOpened from '../../chat/api/useLastOpened';
import { useRouter } from 'next/router';
import Image from 'next/image';
const LastOpened = () => {
    const { push } = useRouter();
    const { data } = useLastOpened();

    return (
        <>
            <div className={styles.freelance_section}>
                <div className={styles.freelance_text}>
                    <div className="d-flex  gap-2 flex-fill align-items-start">
                        <div className="d-none d-md-flex ">
                            <Image
                                src={'/static/img/star.svg'}
                                width={30}
                                height={30}
                                alt="starts"
                            />
                        </div>
                        <div className={styles.titleWrapper}>
                            <h1 className={styles.labelWrapperH1}>
                                So’ngi ochilgan xizmatlar
                            </h1>
                            <p className={styles.labelWrapperP}>
                                Xizmatni tanlang – Buyurtma bering
                            </p>
                        </div>
                    </div>
                </div>
                <button
                    className={styles.freelance_button}
                    size="large"
                    onClick={() => push('orders')}>
                    <span>Barcha xizmatlar</span>

                    <img
                        src={'/static/img/arrowwhite.svg'}
                        width={45}
                        height={5}
                        alt="arrow"
                    />
                </button>
            </div>

            {/* Cardlar */}
            <div className={styles.cardSection}>
                {data &&
                    data.map(item => (
                        <LastOpenedCard
                            key={item.title}
                            title={item.title}
                            image={item.poster}
                            author={item.user.full_name}
                            price={item.price}
                            slug={item.slug}
                            userImage={item.user.photo_url}
                        />
                    ))}
            </div>
        </>
    );
};

export default LastOpened;
