import React from 'react';
import Link from 'next/link';
import PageContainer from '~/widgets/layouts/PageContainer';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Page404 = () => {
    const { t } = useTranslation('page-404');
    
    return (
        <PageContainer title={t('content.title')}>
            <div className="ps-page--404">
                <div className="container">
                    <div className="ps-section__content">
                        <img src="/static/img/noinfo.svg" alt={t('content.title')} />
                        <h3>{t('content.title')}</h3>
                        <p>
                            {t('content.errorMessage')}
                        </p>
                        <p>
                            <Link href="/">
                                <a> {t('content.homeLink')}</a>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'header',
                'footer',
                'common',
                'page-404',
                'modals',
            ])),
        },
    };
}

export default Page404;
