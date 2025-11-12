import styles from './style.module.scss';
import dynamic from 'next/dynamic';
import CategorySection from './CategorySection';

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

                <HeaderSearchPart />
                <CategorySection />
            </div>
        </div>
    );
};

export default Hero;
