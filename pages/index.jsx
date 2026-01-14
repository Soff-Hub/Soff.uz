import React from 'react';
import PageLayout from '~/widgets/layouts/PageLayout';
import Home from '~/widgets/home';
import Meta from '~/shared/ui/meta';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Header from '~/widgets/header';
import { useTranslation } from 'next-i18next';

const type = 'website';
const url = 'https://soff.uz';
const author = 'Soff.uz';
const image = 'https://soff.uz/static/img/soff/logo-dark.png';

export default function NewHomePage() {
    const { t } = useTranslation('index');

    const title = t('meta.title');
    const description = t('meta.description');
    const keywords = [
        { name: t('meta.keywords.digitalProducts') },
        { name: t('meta.keywords.onlineServices') },
        { name: t('meta.keywords.readyMaterials') },
        { name: t('meta.keywords.scientificWorks') },
        { name: t('meta.keywords.3dDesign') },
        { name: t('meta.keywords.designTemplates') },
        { name: t('meta.keywords.websites') },
        { name: t('meta.keywords.graphicDesign') },
        { name: t('meta.keywords.academicServices') },
        { name: t('meta.keywords.soffUz') },
    ];

    const meta = {
        title,
        description,
        image,
        type,
        keywords,
        author,
        url,
    };

    return (
        <PageLayout>
            <Meta {...meta} />
            <Home />
        </PageLayout>
    );
}

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'header',
                'footer',
                'index',
                'product-pages',
                'orders',
                'modals',
            ])),
        },
    };
}
