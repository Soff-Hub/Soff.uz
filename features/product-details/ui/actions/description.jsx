import React from 'react';
import { useTranslation } from 'next-i18next';

function Description({ description }) {
    const { t } = useTranslation('product-pages');

    return (
        <div className="ps-product__thumbnail_seller_secound product-description">
            <h3
                style={{
                    fontSize: '25px',
                    fontWeight: 500,
                    lineHeight: '37.5px',
                    color: '#312F30',
                    marginBottom: '30px',
                }}>
                {t('productDetail.description.title')}
            </h3>

            {description?.length > 0 ? (
                <div dangerouslySetInnerHTML={{ __html: description }} />
            ) : (
                <div className="text-center">
                    <img
                        src="/static/img/noinfo.svg  "
                        alt={t('productDetail.description.noDescription')}
                        width="35%"
                    />
                    <p>{t('productDetail.description.noDescriptionText')}</p>
                </div>
            )}
        </div>
    );
}

export default Description;
