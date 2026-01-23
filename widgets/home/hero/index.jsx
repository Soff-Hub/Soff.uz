import styles from './style.module.scss';
import dynamic from 'next/dynamic';
import { Skeleton } from 'antd';
import CategorySection from './CategorySection';
import useResponsive from '~/shared/utilities/useResponsive';
import { useTranslation } from 'next-i18next';

const HeroSearchPartLoader = () => {
    const { isMobile } = useResponsive();
    return (
        <div className={styles.heroButtons}>
            <div className={styles.heroFilterButtons}>
                {Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton.Button
                        key={index}
                        style={{
                            height: isMobile ? '26px' : '35.6px',
                            width: isMobile ? '30%' : '130px',
                            borderRadius: '8px',
                        }}></Skeleton.Button>
                ))}
            </div>
            <div
                className={styles.searchBoxWrapper}
                style={{
                    margin: 'auto',
                }}>
                <Skeleton.Button
                    style={{
                        width: '600px',
                        height: '47px',
                        borderRadius: '8px',
                    }}
                />
            </div>
        </div>
    );
};

const HeaderSearchPart = dynamic(() => import('./HeroSearchPart'), {
    ssr: false,
    loading: HeroSearchPartLoader,
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
