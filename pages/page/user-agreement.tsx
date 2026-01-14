import React from 'react';
import PageLayout from '~/widgets/layouts/PageLayout';
import Meta from '~/shared/ui/meta';
import { Trans, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextPageContext } from 'next';

export default function UserAgreement() {
    const { t } = useTranslation('user-agreement');

    return (
        <PageLayout>
            <Meta title={t('meta.title')} description={t('meta.description')} />

            <div className="container my-5">
                <h3>{t('content.title')}</h3>

                <p>{t('content.intro.p1')}</p>
                <p>{t('content.intro.p2')}</p>

                <h4>{t('content.section1.title')}</h4>

                <Trans
                    parent={'p'}
                    t={t}
                    i18nKey="content.section1.p1"
                    components={{ strong: <strong /> }}
                />
                <Trans
                    parent={'p'}
                    t={t}
                    i18nKey="content.section1.p2"
                    components={{ strong: <strong /> }}
                />
                <Trans
                    parent={'p'}
                    t={t}
                    i18nKey="content.section1.p3"
                    components={{ strong: <strong /> }}
                />
                <Trans
                    parent={'p'}
                    t={t}
                    i18nKey="content.section1.p4"
                    components={{ strong: <strong /> }}
                />
                <Trans
                    parent={'p'}
                    t={t}
                    i18nKey="content.section1.p5"
                    components={{ strong: <strong /> }}
                />
                <Trans
                    parent={'p'}
                    t={t}
                    i18nKey="content.section1.p6"
                    components={{ strong: <strong /> }}
                />
                <Trans
                    parent={'p'}
                    t={t}
                    i18nKey="content.section1.p7"
                    components={{ strong: <strong /> }}
                />
                <Trans
                    parent={'p'}
                    t={t}
                    i18nKey="content.section1.p8"
                    components={{ strong: <strong /> }}
                />
                <Trans
                    parent={'p'}
                    t={t}
                    i18nKey="content.section1.p9"
                    components={{ strong: <strong /> }}
                />

                <h4>{t('content.section2.title')}</h4>
                <p>{t('content.section2.p1')}</p>
                <p>{t('content.section2.p2')}</p>
                <p>{t('content.section2.p3')}</p>
                <p>{t('content.section2.p4')}</p>

                <h4>{t('content.section3.title')}</h4>
                <p>{t('content.section3.p1')}</p>
                <p>{t('content.section3.p2')}</p>
                <p>{t('content.section3.p3')}</p>
                <p>{t('content.section3.p4')}</p>
                <p>{t('content.section3.p5')}</p>
                <p>{t('content.section3.p6')}</p>
                <p>{t('content.section3.p7')}</p>
                <p>{t('content.section3.p8')}</p>
                <p>{t('content.section3.p9')}</p>
                <p>{t('content.section3.p10')}</p>
                <p>{t('content.section3.p11')}</p>
                <p>{t('content.section3.p12')}</p>
                <p>{t('content.section3.p13')}</p>
                <p>{t('content.section3.p14')}</p>

                <h4>{t('content.section4.title')}</h4>
                <h5>{t('content.section4.subtitle1')}</h5>
                <p>{t('content.section4.right1')}</p>
                <p>{t('content.section4.right2')}</p>
                <p>{t('content.section4.right3')}</p>
                <p>{t('content.section4.right4')}</p>
                <p>{t('content.section4.right5')}</p>
                <p>{t('content.section4.right6')}</p>

                <h5>{t('content.section4.subtitle2')}</h5>
                <p>{t('content.section4.obligation1')}</p>
                <p>{t('content.section4.obligation2')}</p>
                <p>{t('content.section4.obligation3')}</p>
                <p>{t('content.section4.obligation4')}</p>
                <p>{t('content.section4.obligation5')}</p>
                <p>{t('content.section4.obligation6')}</p>

                <h4>{t('content.section5.title')}</h4>
                <h5>{t('content.section5.subtitle1')}</h5>
                <p>{t('content.section5.right1')}</p>
                <p>{t('content.section5.right2')}</p>
                <p>{t('content.section5.right3')}</p>
                <p>{t('content.section5.right4')}</p>
                <p>{t('content.section5.right5')}</p>
                <p>{t('content.section5.right6')}</p>

                <h5>{t('content.section5.subtitle2')}</h5>
                <p>{t('content.section5.obligation1')}</p>
                <p>{t('content.section5.obligation2')}</p>
                <p>{t('content.section5.obligation3')}</p>
                <p>{t('content.section5.obligation4')}</p>
                <p>{t('content.section5.obligation5')}</p>
                <p>{t('content.section5.obligation6')}</p>
                <p>{t('content.section5.obligation7')}</p>

                <h4>{t('content.section6.title')}</h4>
                <h5>{t('content.section6.subtitle1')}</h5>
                <p>{t('content.section6.p1')}</p>
                <p>{t('content.section6.p2')}</p>
                <p>{t('content.section6.p3')}</p>

                <h5>{t('content.section6.subtitle2')}</h5>
                <p>{t('content.section6.p4')}</p>
                <p>{t('content.section6.p5')}</p>
                <p>{t('content.section6.p6')}</p>

                <h5>{t('content.section6.subtitle3')}</h5>
                <p>{t('content.section6.p7')}</p>
                <p>{t('content.section6.p8')}</p>
                <p>{t('content.section6.p9')}</p>

                <h4>{t('content.section7.title')}</h4>
                <p>{t('content.section7.p1')}</p>
                <p>{t('content.section7.p2')}</p>
                <p>{t('content.section7.p3')}</p>
                <p>{t('content.section7.p4')}</p>

                <h4>{t('content.section8.title')}</h4>
                <p>{t('content.section8.p1')}</p>
                <p>{t('content.section8.p2')}</p>
                <p>{t('content.section8.p3')}</p>
                <p>{t('content.section8.p4')}</p>

                <h4>{t('content.section9.title')}</h4>
                <p>{t('content.section9.p1')}</p>
                <p>{t('content.section9.p2')}</p>
                <p>{t('content.section9.p3')}</p>
                <p>{t('content.section9.p4')}</p>
                <p>{t('content.section9.p5')}</p>
                <p>{t('content.section9.p6')}</p>

                <h4>{t('content.section10.title')}</h4>
                <h5>{t('content.section10.subtitle1')}</h5>
                <p>{t('content.section10.right1')}</p>
                <p>{t('content.section10.right2')}</p>
                <p>{t('content.section10.right3')}</p>
                <p>{t('content.section10.right4')}</p>
                <p>{t('content.section10.right5')}</p>

                <h5>{t('content.section10.subtitle2')}</h5>
                <p>{t('content.section10.obligation1')}</p>
                <p>{t('content.section10.obligation2')}</p>
                <p>{t('content.section10.obligation3')}</p>
                <p>{t('content.section10.obligation4')}</p>

                <h4>{t('content.section11.title')}</h4>
                <p>{t('content.section11.p1')}</p>
                <p>{t('content.section11.p2')}</p>
                <p>{t('content.section11.p3')}</p>
                <p>{t('content.section11.p4')}</p>

                <h4>{t('content.section12.title')}</h4>
                <p>{t('content.section12.p1')}</p>
                <p>{t('content.section12.p2')}</p>
                <p>{t('content.section12.p3')}</p>
                <p>{t('content.section12.p4')}</p>
                <p>{t('content.section12.p5')}</p>
                <p>{t('content.section12.p6')}</p>
                <p>{t('content.section12.p7')}</p>
                <p>{t('content.section12.p8')}</p>
                <p>{t('content.section12.p9')}</p>

                <h4>{t('content.section13.title')}</h4>
                <Trans parent={'p'} t={t} i18nKey="content.section13.p1" />
                <Trans
                    parent={'p'}
                    t={t}
                    i18nKey="content.section13.p2"
                    components={{ strong: <strong /> }}
                />
                <Trans
                    parent={'p'}
                    t={t}
                    i18nKey="content.section13.p3"
                    components={{ strong: <strong /> }}
                />
                <Trans
                    parent={'p'}
                    t={t}
                    i18nKey="content.section13.p4"
                    components={{ strong: <strong /> }}
                />
                <Trans
                    parent={'p'}
                    t={t}
                    i18nKey="content.section13.p5"
                    components={{ strong: <strong /> }}
                />
                <p>{t('content.section13.p6')}</p>
                <p>{t('content.section13.p7')}</p>

                <h4>{t('content.section14.title')}</h4>
                <p>{t('content.section14.p1')}</p>
                <p>{t('content.section14.p2')}</p>
                <p>{t('content.section14.p3')}</p>
                <p>{t('content.section14.p4')}</p>
                <Trans
                    parent={'p'}
                    t={t}
                    i18nKey="content.section14.p5"
                    components={{ strong: <strong /> }}
                />
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
                'user-agreement',
                'modals',
            ])),
        },
    };
}
