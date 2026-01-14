import React from 'react';
import { useTranslation } from 'next-i18next';

export default function AboutContent() {
    const { t } = useTranslation('about-us');
    
    return (
        <div className="my-5 container">
            <h3>{t('content.title')}</h3>
            <p
                style={{
                    fontSize: '16px',
                }}
                dangerouslySetInnerHTML={{ __html: t('content.paragraph1') }}
            />
            <p
                style={{
                    fontSize: '16px',
                }}
                dangerouslySetInnerHTML={{ __html: t('content.paragraph2') }}
            />
            <p
                style={{
                    fontSize: '16px',
                }}>
                {t('content.paragraph3')}
            </p>
        </div>
    );
}
