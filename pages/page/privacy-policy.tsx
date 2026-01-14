import React from 'react';
import PageLayout from '~/widgets/layouts/PageLayout';
import Meta from '~/shared/ui/meta';
import { Trans, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextPageContext } from 'next';

export default function PrivacyPolicy() {
    const { t } = useTranslation('privacy-policy');

    return (
        <PageLayout>
            <Meta title={t('meta.title')} description={t('meta.description')} />

            <div className="container my-5">
                <h3>{t('content.title')}</h3>

                <h4>{t('content.section1.title')}</h4>
                <p>{t('content.section1.p1')}</p>
                <p>{t('content.section1.p2')}</p>

                <h4>{t('content.section2.title')}</h4>
                <Trans
                    parent={'p'}
                    t={t}
                    i18nKey="content.section2.p1"
                    components={{ strong: <strong /> }}
                />
                <Trans
                    parent={'p'}
                    t={t}
                    i18nKey="content.section2.p2"
                    components={{ strong: <strong /> }}
                />
                <Trans
                    parent={'p'}
                    t={t}
                    i18nKey="content.section2.p3"
                    components={{ strong: <strong /> }}
                />
                <Trans
                    parent={'p'}
                    t={t}
                    i18nKey="content.section2.p4"
                    components={{ strong: <strong /> }}
                />
                <Trans
                    parent={'p'}
                    t={t}
                    i18nKey="content.section2.p5"
                    components={{ strong: <strong /> }}
                />

                <h4>{t('content.section3.title')}</h4>
                <p>{t('content.section3.p1')}</p>
                <p>{t('content.section3.p2')}</p>

                <h4>{t('content.section4.title')}</h4>
                <h5>{t('content.section4.subtitle1')}</h5>
                <p>{t('content.section4.userData1')}</p>
                <p>{t('content.section4.userData2')}</p>
                <p>{t('content.section4.userData3')}</p>
                <p>{t('content.section4.userData4')}</p>

                <h5>{t('content.section4.subtitle2')}</h5>
                <p>{t('content.section4.sellerData1')}</p>
                <p>{t('content.section4.sellerData2')}</p>
                <p>{t('content.section4.sellerData3')}</p>
                <p>{t('content.section4.sellerData4')}</p>
                <p>{t('content.section4.sellerData5')}</p>
                <p>{t('content.section4.sellerData6')}</p>
                <p>{t('content.section4.sellerData7')}</p>
                <p>{t('content.section4.sellerData8')}</p>
                <p>{t('content.section4.sellerData9')}</p>

                <h5>{t('content.section4.subtitle3')}</h5>
                <p>{t('content.section4.autoData1')}</p>
                <p>{t('content.section4.autoData2')}</p>
                <p>{t('content.section4.autoData3')}</p>
                <p>{t('content.section4.autoData4')}</p>
                <p>{t('content.section4.autoData5')}</p>

                <h4>{t('content.section5.title')}</h4>
                <p>{t('content.section5.p1')}</p>
                <p>{t('content.section5.p2')}</p>
                <p>{t('content.section5.cookieData1')}</p>
                <p>{t('content.section5.cookieData2')}</p>
                <p>{t('content.section5.cookieData3')}</p>
                <p>{t('content.section5.cookieData4')}</p>
                <p>{t('content.section5.p3')}</p>

                <h4>{t('content.section6.title')}</h4>
                <p>{t('content.section6.p1')}</p>
                <p>{t('content.section6.purpose1')}</p>
                <p>{t('content.section6.purpose2')}</p>
                <p>{t('content.section6.purpose3')}</p>
                <p>{t('content.section6.purpose4')}</p>
                <p>{t('content.section6.purpose5')}</p>
                <p>{t('content.section6.purpose6')}</p>
                <p>{t('content.section6.purpose7')}</p>
                <p>{t('content.section6.purpose8')}</p>
                <p>{t('content.section6.purpose9')}</p>

                <h4>{t('content.section7.title')}</h4>
                <p>{t('content.section7.p1')}</p>
                <Trans
                    parent={'p'}
                    t={t}
                    i18nKey="content.section7.p2"
                    components={{ strong: <strong /> }}
                />

                <h4>{t('content.section8.title')}</h4>
                <p>{t('content.section8.p1')}</p>
                <p>{t('content.section8.measure1')}</p>
                <p>{t('content.section8.measure2')}</p>
                <p>{t('content.section8.measure3')}</p>
                <p>{t('content.section8.measure4')}</p>
                <p>{t('content.section8.measure5')}</p>
                <p>{t('content.section8.p2')}</p>

                <h4>{t('content.section9.title')}</h4>
                <p>{t('content.section9.p1')}</p>
                <p>{t('content.section9.transfer1')}</p>
                <p>{t('content.section9.transfer2')}</p>
                <p>{t('content.section9.transfer3')}</p>
                <p>{t('content.section9.transfer4')}</p>
                <p>{t('content.section9.p2')}</p>

                <h4>{t('content.section10.title')}</h4>
                <h5>{t('content.section10.subtitle1')}</h5>
                <p>{t('content.section10.userRight1')}</p>
                <p>{t('content.section10.userRight2')}</p>
                <p>{t('content.section10.userRight3')}</p>
                <p>{t('content.section10.userRight4')}</p>

                <h5>{t('content.section10.subtitle2')}</h5>
                <p>{t('content.section10.sellerRight1')}</p>
                <p>{t('content.section10.sellerRight2')}</p>
                <p>{t('content.section10.sellerRight3')}</p>
                <p>{t('content.section10.sellerRight4')}</p>

                <h4>{t('content.section11.title')}</h4>
                <p>{t('content.section11.p1')}</p>
                <p>{t('content.section11.p2')}</p>
                <p>{t('content.section11.p3')}</p>

                <h4>{t('content.section12.title')}</h4>
                <p>{t('content.section12.p1')}</p>
                <Trans
                    parent={'p'}
                    t={t}
                    i18nKey="content.section12.contact1"
                    components={{ strong: <strong /> }}
                />
                <Trans
                    parent={'p'}
                    t={t}
                    i18nKey="content.section12.contact2"
                    components={{ strong: <strong /> }}
                />
                <Trans
                    parent={'p'}
                    t={t}
                    i18nKey="content.section12.contact3"
                    components={{ strong: <strong /> }}
                />
                <Trans
                    parent={'p'}
                    t={t}
                    i18nKey="content.section12.contact4"
                    components={{ strong: <strong /> }}
                />

                <h4>{t('content.section13.title')}</h4>
                <p>{t('content.section13.p1')}</p>
                <p>{t('content.section13.p2')}</p>
            </div>
        </PageLayout>
    );
}

export async function getServerSideProps({ locale }: NextPageContext) {
    return {
        props: {
            ...(await serverSideTranslations(locale!, [
                'header',
                'footer',
                'common',
                'privacy-policy',
                'modals',
            ])),
        },
    };
}
