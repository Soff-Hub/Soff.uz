import { message } from 'antd';
import Axios from 'axios';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import React from 'react';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/shared/ui/meta';
import { orginalUrl } from '~/reositoriy-admin/Repository';
import { useGet } from '~/repositories/https';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { FaUser } from 'react-icons/fa';

function Report() {
    const { t } = useTranslation('report');
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const { productId } = router.query;
    const { data: product } = useGet(
        'customerDocuments/',
        `customer/documents/${productId}/`,
        undefined,
        { enabled: Boolean(productId) }
    );

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const data = {
            message: e.target[1].value,
            contact: e.target[0].value,
            document: product?.id,
        };
        try {
            await Axios.post(orginalUrl + 'customer/complaint/create/', data);
            e.target.reset();
            message.success(t('form.success'));
            Router.back();
        } catch (error) {
            message.error(t('form.error'));
        }
        setLoading(false);
    }

    return (
        <div>
            <Meta title={t('title')} description={t('meta.description')} />
            <PageContainer title={t('title')}>
                <div className="container">
                    <div
                        className="report-page py-5"
                        style={{ maxWidth: '900px', marginTop: '20px' }}>
                        <p className="fs-3">{t('description')}</p>

                        <Link href={`/product/${product?.slug}`}>
                            <a>
                                <div
                                    className="reported-product p-2 bg-white d-flex align-items-center gap-3 mb-4"
                                    style={{ borderRadius: '8px' }}>
                                    <div className="reported-product-img">
                                        <img
                                            src={product?.poster_url}
                                            alt=""
                                            height={50}
                                        />
                                    </div>
                                    <div className="reported-product-info">
                                        <h5 className="fw-medium fs-4 m-0">
                                            {product?.title}
                                        </h5>
                                    </div>
                                    <div className="d-flex align-items-center gap-2 ms-auto">
                                        <FaUser />
                                        <h5 className="m-0 fw-medium">
                                            {product?.seller?.first_name}{' '}
                                            {product?.seller?.last_name}
                                        </h5>
                                    </div>
                                </div>
                            </a>
                        </Link>

                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder={t('form.contactPlaceholder')}
                                className="form-control mb-3 bg-white"
                            />
                            <div className="form-group">
                                <label for="exampleFormControlTextarea1">
                                    {t('form.messageLabel')}
                                </label>
                                <textarea
                                    className="form-control bg-white"
                                    id="exampleFormControlTextarea1"
                                    placeholder={t('form.messagePlaceholder')}
                                    rows="3"></textarea>
                            </div>
                            <button
                                disabled={loading}
                                type="submit"
                                className="btn btn-success fs-3 px-5">
                                {loading
                                    ? t('form.submitting')
                                    : t('form.submit')}
                            </button>
                        </form>
                    </div>
                </div>
            </PageContainer>
        </div>
    );
}

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'header',
                'footer',
                'common',
                'report',
                'modals',
            ])),
        },
    };
}

export default Report;
