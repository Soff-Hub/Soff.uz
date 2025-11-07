import styles from './style.module.scss';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const HeaderSearchPart = dynamic(() => import('./HeroSearchPart'), {
    ssr: false,
});

const Hero = () => {
    return (
        <div className={styles.heroMainBlock}>
            <div className={styles.heroInfoSection}>
                <h1 className={styles.heroTitle}>
                    Raqamli mahsulotlar va onlayn xizmatlar bozori
                </h1>
                <p className={styles.heroParagraph}>
                    Bizning mutaxassislar va sotuvchilar sizga kerakli tayyor
                    raqamli mahsulot yoki xizmatni tez va sifatli taqdim etadi.
                </p>

                {/*Search part is here (●__●)*/}
                <HeaderSearchPart />

                <div
                    style={{ backgroundColor: 'transparent' }}
                    className={styles.heroCategorySection}>
                    <div className={styles.categoryBlock}>
                        <div className={styles.titleWrapper}>
                            <img
                                src="/static/img/star.svg"
                                alt="badge"
                                className={styles.badge}
                            />
                            <h3>Tayyor yuklangan mahsulotlar</h3>
                        </div>
                        <div className={styles.categoryGrid}>
                            <Link href="/scientific-resources/all">
                                <a>
                                    <div className={styles.categoryItem}>
                                        <img
                                            src="/static/img/HomePage/file3.webp"
                                            alt="Ilmiy ishlar"
                                            style={{ objectFit: 'cover' }}
                                        />
                                        <span>Ilmiy ishlar</span>
                                    </div>
                                </a>
                            </Link>
                            <Link href="/3d-models-and-interior-designs/all">
                                <a>
                                    <div className={styles.categoryItem}>
                                        <img
                                            src="/static/img/HomePage/3d2.webp"
                                            alt="3D Modellar"
                                            style={{ objectFit: 'cover' }}
                                        />
                                        <span>3D Modellar</span>
                                    </div>
                                </a>
                            </Link>
                            <Link href="/design-developments/all">
                                <a>
                                    <div className={styles.categoryItem}>
                                        <img
                                            src="/static/img/HomePage/design1.webp"
                                            alt="Dizayn shablonlari"
                                            style={{ objectFit: 'cover' }}
                                        />
                                        <span>Dizayn shablonlari</span>
                                    </div>
                                </a>
                            </Link>
                            <Link href="/websites/all">
                                <a>
                                    <div className={styles.categoryItem}>
                                        <img
                                            src="/static/img/HomePage/web2.webp"
                                            alt="Veb saytlar"
                                            style={{ objectFit: 'cover' }}
                                        />
                                        <span>Veb saytlar</span>
                                    </div>
                                </a>
                            </Link>
                            <Link href="/templates/all">
                                <a>
                                    <div className={styles.categoryItem}>
                                        <img
                                            src="/static/img/HomePage/template2.webp"
                                            alt="Shablonlar"
                                            style={{ objectFit: 'cover' }}
                                        />
                                        <span>Shablonlar</span>
                                    </div>
                                </a>
                            </Link>
                            <Link href="/video-lessons/all">
                                <a>
                                    <div className={styles.categoryItem}>
                                        <img
                                            src="/static/img/HomePage/video1.webp"
                                            alt="Video darsliklar"
                                            style={{ objectFit: 'cover' }}
                                        />
                                        <span>Video darsliklar</span>
                                    </div>
                                </a>
                            </Link>
                        </div>
                    </div>

                    <div className={styles.categoryBlock}>
                        <h3>Xizmatni tanlang – Buyurtma bering</h3>
                        <div className={styles.categoryGrid}>
                            <Link href="/orders?direction=scientific_work">
                                <a>
                                    <div className={styles.categoryItem}>
                                        <img
                                            src="/static/img/HomePage/file2.webp"
                                            alt="Ilmiy va Akademik xizmatlar"
                                            style={{ objectFit: 'cover' }}
                                        />
                                        <span>Ilmiy va Akademik Xizmatlar</span>
                                    </div>
                                </a>
                            </Link>
                            <Link href="/orders?direction=dizayn">
                                <a>
                                    <div className={styles.categoryItem}>
                                        <img
                                            src="/static/img/HomePage/design3.webp"
                                            alt="Dizayn xizmatlari"
                                            style={{ objectFit: 'cover' }}
                                        />
                                        <span>Dizayn xizmatlari</span>
                                    </div>
                                </a>
                            </Link>
                            <Link href="/orders?direction=web">
                                <a>
                                    <div className={styles.categoryItem}>
                                        <img
                                            src="/static/img/HomePage/web3.webp"
                                            alt="Dasturlash xizmatlari"
                                            style={{ objectFit: 'cover' }}
                                        />
                                        <span>Dasturlash xizmatlari</span>
                                    </div>
                                </a>
                            </Link>
                            <Link href="/orders?direction=three_d">
                                <a>
                                    <div className={styles.categoryItem}>
                                        <img
                                            src="/static/img/HomePage/3d.webp"
                                            alt="3D Dizayn va Vizualizatsiya"
                                            style={{ objectFit: 'cover' }}
                                        />
                                        <span>3D Dizayn va Vizualizatsiya</span>
                                    </div>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
