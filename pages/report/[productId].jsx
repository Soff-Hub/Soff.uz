import { message } from 'antd';
import Axios from 'axios';
import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import * as cookie from 'cookie';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/shared/ui/meta';
import { orginalUrl } from '~/reositoriy-admin/Repository';
import { baseUrlUseApi } from '~/repositories/useApi';
import { getOrCreateDeviceId } from '~/shared/utilities/device-id';
import { FaUser } from 'react-icons/fa';

const EXCERPT_LENGTH = 220;

const toPlainText = (html) =>
    typeof html === 'string'
        ? html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
        : '';

const getExcerpt = (html) => {
    const text = toPlainText(html);
    return text.length > EXCERPT_LENGTH
        ? `${text.slice(0, EXCERPT_LENGTH).trimEnd()}…`
        : text;
};

function Report({ product }) {
    const [loading, setLoading] = React.useState(false);
    const sellerName = [product.seller?.first_name, product.seller?.last_name]
        .filter(Boolean)
        .join(' ');
    const excerpt = getExcerpt(product.description);
    const pageTitle = `${product.title} — mualliflik huquqi bo'yicha shikoyat | Soff.uz`;

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const data = {
            message: e.target.message.value,
            contact: e.target.contact.value,
            document: product.id,
        };
        try {
            await Axios.post(orginalUrl + 'customer/complaint/create/', data);
            e.target.reset();
            message.success(
                "Murojaatingiz muvaffaqiyatli yuborildi, tez orada biz bilan bog'lanamiz"
            );
            Router.back();
        } catch (error) {
            message.error('Xatolik yuz berdi');
        }
        setLoading(false);
    }

    return (
        <div>
            {/* Each page is tied to one product, so title and description name it:
                otherwise every /report/<slug> would be an identical form page. */}
            <Meta
                title={pageTitle}
                description={`"${product.title}" mahsuloti${
                    sellerName ? ` (sotuvchi: ${sellerName})` : ''
                } mualliflik huquqingizni buzgan bo'lsa, Soff.uz'ga shu sahifa orqali xabar bering. Murojaatingiz ko'rib chiqiladi.`}
                image={product.poster_url || undefined}
            />
            {/* PageLayout writes <title> after Meta, so it must get the same title. */}
            <PageContainer title={pageTitle}>
                <div className="container">
                    <div
                        className="report-page py-5"
                        style={{ maxWidth: '900px', marginTop: '20px' }}>
                        <h1 className="fs-3 fw-semibold mb-2">
                            “{product.title}” bo'yicha mualliflik huquqi shikoyati
                        </h1>
                        <p className="fs-4 mb-4">
                            Agar bu mahsulot mualliflik huquqingizni buzgan deb
                            hisoblasangiz, quyidagi forma orqali biz bilan
                            bog'laning.
                        </p>

                        <Link href={`/product/${product.slug}`}>
                            <a>
                                <div
                                    className="reported-product p-2 bg-white d-flex align-items-center gap-3 mb-4"
                                    style={{ borderRadius: '8px' }}>
                                    <div className="reported-product-img">
                                        <img
                                            src={product.poster_url}
                                            alt={product.title}
                                            width={50}
                                            height={50}
                                            style={{
                                                display: 'block',
                                                objectFit: 'cover',
                                                overflow: 'hidden',
                                                borderRadius: '6px',
                                                background: '#f1f3f5',
                                            }}
                                        />
                                    </div>
                                    <div className="reported-product-info">
                                        <h2 className="fw-medium fs-4 m-0">
                                            {product.title}
                                        </h2>
                                    </div>
                                    {sellerName && (
                                        <div className="d-flex align-items-center gap-2 ms-auto">
                                            <FaUser />
                                            <span className="m-0 fw-medium fs-5">
                                                {sellerName}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </a>
                        </Link>

                        {excerpt && (
                            <p className="fs-5 text-secondary mb-4">{excerpt}</p>
                        )}

                        <form onSubmit={handleSubmit}>
                            <label htmlFor="report-contact" className="mb-1">
                                Kontakt ma'lumotlaringiz
                            </label>
                            <input
                                id="report-contact"
                                name="contact"
                                type="text"
                                placeholder="Siz bilan bog'lanish uchun kontakt ma'lumotlaringiz"
                                className="form-control mb-3 bg-white"
                            />
                            <div className="form-group">
                                <label htmlFor="report-message" className="mb-1">
                                    Murojaatingizni batafsil yozing
                                </label>
                                <textarea
                                    id="report-message"
                                    name="message"
                                    className="form-control bg-white"
                                    placeholder="Yozing..."
                                    rows="3"></textarea>
                            </div>
                            <button
                                disabled={loading}
                                type="submit"
                                className="btn btn-success fs-3 px-5">
                                {loading ? 'Yuborilmoqda...' : 'Yuborish'}
                            </button>
                        </form>
                    </div>
                </div>
            </PageContainer>
        </div>
    );
}

export default Report;

// Server-rendered so crawlers get the product name and description, not an empty form.
export async function getServerSideProps({ req, res, params }) {
    const { productId } = params;
    if (!productId) return { notFound: true };

    const headers = {
        Accept: 'application/json',
        'X-Device-Id': getOrCreateDeviceId({ req, res }),
    };
    const { token } = cookie.parse(req.headers.cookie || '');
    if (token) headers.Authorization = `Bearer ${token}`;

    try {
        const response = await fetch(
            `${baseUrlUseApi}customer/documents/${encodeURIComponent(productId)}/`,
            { headers }
        );
        if (!response.ok) return { notFound: true };
        const product = await response.json();
        if (!product?.id) return { notFound: true };
        return { props: { product } };
    } catch (error) {
        console.error('Error fetching product for report page:', error);
        return { notFound: true };
    }
}
