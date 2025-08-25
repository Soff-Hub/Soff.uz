import React from 'react';
import styles from './catalogs.module.scss';
import Image from 'next/image';
import CatalogCard from '../cards/catalogCard';
import { useQuery } from '@tanstack/react-query';
import { api } from '~/repositories/api';
import Loader from '~/components/shared/loader';
import { useRouter } from 'next/router';

const title = {
    '3d': '3D moddellar',
    website: 'Veb saytlar',
    design: 'Dizayn shablonlari',
    video: 'Video darsliklar',
    template: 'Shablonlar',
    file: 'Ilmiy ishlar',
};
const CatalogsSection = () => {
    const router = useRouter();
    const { data, isLoading } = useQuery({
        queryKey: ['catalogCards'],
        queryFn: async () => {
            const response = api.get('customer/last-added-for-card');
            return (await response).data;
        },
    });

    if (isLoading && !data) return <Loader />;

    const goProducts = () => {};

    return (
        <div className={styles.catalogSectionBlock}>
            <div className="container mx-auto">
                <div className={styles.catalogHealine}>
                    <div className="d-flex gap-2 flex-fill">
                        {' '}
                        <div>
                            <Image
                                src={'/static/img/star.svg'}
                                width={40}
                                height={40}
                                alt="starts"
                            />
                        </div>
                        <div className={styles.catalogWrapper}>
                            <h1 className={styles.catalogLabel}>
                                Tayyor mahsulotlar katalogi
                            </h1>
                            <p className={styles.catalogSubLabel}>
                                Sifatli va tayyor ishlardan foydalaning, vaqt va
                                kuchingizni tejang.
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => router.push('/scientific-resources/all')}
                        className={styles.catalogSeeAll}>
                        Barcha mahsulotlar{' '}
                        <Image
                            src={'/static/img/arrowwhite.svg'}
                            width={40}
                            height={20}
                            alt="arrow"
                        />
                    </button>
                </div>
                <div className={styles.catalogCardsSection}>
                    {data?.map(item => (
                        <CatalogCard
                            key={item.direction}
                            content_type={item.direction}
                            title={title[item.direction]}
                            count={item.count}
                            items={item.items}
                        />
                    ))}
                </div>
                <section className={styles.howItWorksSection}>
                    <div className="d-flex justify-content-center my-5">
                        <Image
                            width={30}
                            height={30}
                            src={'/static/img/star.svg'}
                            alt="starts"
                        />
                    </div>
                    <h2>Tayyor mahsulotlardan foydalanish qanday ishlaydi?</h2>
                    <div className={styles.steps}>
                        <div className={styles.stepItem}>
                            <img
                                src={'/static/img/catalogMenu.png'}
                                alt="starts"
                            />
                            <div>
                                <h3>Qidiring va tanlang</h3>
                                <p>
                                    Katalogdan yoki qidiruv orqali sizga kerakli
                                    tayyor mahsulotni toping.
                                </p>
                            </div>
                        </div>
                        <div className={styles.stepItem}>
                            <img
                                src={'/static/img/catalogCoin.png'}
                                alt="starts"
                            />
                            <div>
                                <h3>Sotib oling</h3>
                                <p>
                                    Xavfsiz to‘lov tizimi orqali mahsulotni
                                    sotib oling — narx va shartlar oldindan
                                    ko‘rinadi.
                                </p>
                            </div>
                        </div>
                        <div className={styles.stepItem}>
                            <img
                                src={'/static/img/catalogSecure.png'}
                                alt="starts"
                            />
                            <div>
                                <h3>Yuklab oling va foydalaning</h3>
                                <p>
                                    Mahsulotni darhol yuklab oling va
                                    ishlatishni boshlang.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={styles.readyProducts}>
                    <div className={styles.block}>
                        <h1 className={styles.title}>
                            Tayyor mahsulotlar bilan vaqtingizni tejang
                        </h1>
                        <button
                            onClick={goProducts}
                            className={styles.catalogSeeAll}>
                            Barcha mahsulotlar{' '}
                            <i
                                style={{ marginLeft: '12px' }}
                                class="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CatalogsSection;
