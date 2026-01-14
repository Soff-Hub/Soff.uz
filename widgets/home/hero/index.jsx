import styles from './style.module.scss';
import dynamic from 'next/dynamic';
import CategorySection from './CategorySection';
import { useTranslation } from 'next-i18next';

const HeaderSearchPart = dynamic(() => import('./HeroSearchPart'), {
    ssr: false,
});

const Hero = () => {
    const { t } = useTranslation('index');

    return (
        <div className={styles.heroMainBlock}>
            <div className={styles.heroInfoSection}>
                <h1 className={styles.heroTitle}>{t('hero.title')}</h1>
                <p className={styles.heroParagraph}>{t('hero.description')}</p>

                <HeaderSearchPart />
                <CategorySection />
            </div>
        </div>
    );
};

export default Hero;
