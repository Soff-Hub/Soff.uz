import React from 'react';
import PageLayout from '~/widgets/layouts/PageLayout';
import Meta from '~/shared/ui/meta';
import { Trans, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Oferta() {
    const { t } = useTranslation('oferta');

    return (
        <PageLayout>
            <Meta
                title={t('meta.title')}
                description={t('meta.description')}
                keywords={[
                    { name: t('meta.keywords.termsOfUse') },
                    { name: t('meta.keywords.soffUzTerms') },
                    { name: t('meta.keywords.userTerms') },
                    { name: t('meta.keywords.platformTerms') },
                    { name: t('meta.keywords.digitalProducts') },
                    { name: t('meta.keywords.onlineServices') },
                    { name: t('meta.keywords.digitalContent') },
                    { name: t('meta.keywords.sellingAndBuying') },
                ]}
                author={t('meta.author')}
            />

            <div className="container my-5">
                <h3>{t('content.title')}</h3>
                <h4>{t('content.section1.title')}</h4>
                <p
                    dangerouslySetInnerHTML={{
                        __html: t('content.section1.p1'),
                    }}
                />
                <p
                    dangerouslySetInnerHTML={{
                        __html: t('content.section1.p2'),
                    }}
                />
                <p>{t('content.section1.p3')}</p>
                <h4>{t('content.section2.title')}</h4>
                <p>{t('content.section2.p1')}</p>
                <h4>{t('content.section3.title')}</h4>
                <p>{t('content.section3.p1')}</p>
                <h4>{t('content.section4.title')}</h4>
                <h5>{t('content.section4.subsection41.title')}</h5>
                <p>{t('content.section4.subsection41.p1')}</p>
                <p>{t('content.section4.subsection41.p2')}</p>
                <p>{t('content.section4.subsection41.p3')}</p>
                <p>{t('content.section4.subsection41.p4')}</p>
                <p>{t('content.section4.subsection41.p5')}</p>
                <p>{t('content.section4.subsection41.p6')}</p>
                <h5>{t('content.section4.subsection42.title')}</h5>
                <p>{t('content.section4.subsection42.p1')}</p>
                <p>{t('content.section4.subsection42.p2')}</p>
                <p>{t('content.section4.subsection42.p3')}</p>
                <p>{t('content.section4.subsection42.p4')}</p>
                <h4>{t('content.section5.title')}</h4>
                <h5>{t('content.section5.subsection51.title')}</h5>
                <p>{t('content.section5.subsection51.p1')}</p>
                <p>{t('content.section5.subsection51.p2')}</p>
                <p>{t('content.section5.subsection51.p3')}</p>
                <p>{t('content.section5.subsection51.p4')}</p>
                <p>{t('content.section5.subsection51.p5')}</p>
                <p>{t('content.section5.subsection51.p6')}</p>
                <p>{t('content.section5.subsection51.p7')}</p>
                <p>{t('content.section5.subsection51.p8')}</p>
                <p>{t('content.section5.subsection51.p9')}</p>
                <h5>{t('content.section5.subsection52.title')}</h5>
                <p>{t('content.section5.subsection52.p1')}</p>
                <p>{t('content.section5.subsection52.p2')}</p>
                <p>{t('content.section5.subsection52.p3')}</p>
                <p>{t('content.section5.subsection52.p4')}</p>
                <p>{t('content.section5.subsection52.p5')}</p>
                <p>{t('content.section5.subsection52.p6')}</p>
                <p>{t('content.section5.subsection52.p7')}</p>
                <p>{t('content.section5.subsection52.p8')}</p>
                <p>{t('content.section5.subsection52.p9')}</p>
                <p>{t('content.section5.subsection52.p10')}</p>
                <p>{t('content.section5.subsection52.p11')}</p>
                <h4>{t('content.section6.title')}</h4>
                <p>{t('content.section6.p1')}</p>
                <p>{t('content.section6.p2')}</p>
                <p>{t('content.section6.p3')}</p>
                <p>{t('content.section6.p4')}</p>
                <h4>{t('content.section7.title')}</h4>
                <p>{t('content.section7.p1')}</p>
                <p>{t('content.section7.p2')}</p>
                <p>{t('content.section7.p3')}</p>
                <p>{t('content.section7.p4')}</p>
                <p>{t('content.section7.p5')}</p>
                <p>{t('content.section7.p6')}</p>
                <p>{t('content.section7.p7')}</p>
                <h4>{t('content.section8.title')}</h4>
                <p>{t('content.section8.p1')}</p>
                <p>{t('content.section8.p2')}</p>
                <p>{t('content.section8.p3')}</p>
                <p>{t('content.section8.p4')}</p>
                <p>{t('content.section8.p5')}</p>
                <p>{t('content.section8.p6')}</p>
                <p>{t('content.section8.p7')}</p>
                <h4>{t('content.section9.title')}</h4>
                <h5>{t('content.section9.subsection91.title')}</h5>
                <p>{t('content.section9.subsection91.p1')}</p>
                <p>{t('content.section9.subsection91.p2')}</p>
                <h5>{t('content.section9.subsection92.title')}</h5>
                <p>{t('content.section9.subsection92.p1')}</p>
                <p>{t('content.section9.subsection92.p2')}</p>
                <h4>{t('content.section10.title')}</h4>
                <h5>{t('content.section10.subsection101.title')}</h5>
                <p>{t('content.section10.subsection101.p1')}</p>
                <p>{t('content.section10.subsection101.p2')}</p>
                <h4>{t('content.section10b.title')}</h4>
                <h5>{t('content.section10b.subsection10b1.title')}</h5>
                <p>{t('content.section10b.subsection10b1.p1')}</p>
                <h5>{t('content.section10b.subsection10b2.title')}</h5>
                <p>{t('content.section10b.subsection10b2.p1')}</p>
                <h4>{t('content.section11.title')}</h4>
                <h5>{t('content.section11.subsection111.title')}</h5>
                <p>{t('content.section11.subsection111.p1')}</p>
                <p>{t('content.section11.subsection111.p2')}</p>
                <h5>{t('content.section11.subsection112.title')}</h5>
                <p>{t('content.section11.subsection112.p1')}</p>
                <p>{t('content.section11.subsection112.p2')}</p>
                <h4>{t('content.section12.title')}</h4>
                <h5>{t('content.section12.subsection121.title')}</h5>
                <p>{t('content.section12.subsection121.p1')}</p>
                <p>{t('content.section12.subsection121.p2')}</p>
                <h4>{t('content.section13.title')}</h4>
                <p>{t('content.section13.p1')}</p>
                <Trans
                    parent={'p'}
                    t={t}
                    i18nKey="content.section13.p2"
                    components={{ strong: <strong /> }}
                />
                <p>{t('content.section13.p3')}</p>
            </div>
        </PageLayout>
    );
}

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'header',
                'footer',
                'common',
                'oferta',
                'modals',
            ])),
        },
    };
}
