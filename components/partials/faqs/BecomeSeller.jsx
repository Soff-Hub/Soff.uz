import React from 'react';
import { useTranslation } from 'next-i18next';

export default function BecomeSeller() {
  const { t } = useTranslation('become-a-seller');
  
  return (
    <div className='mt-4'>
      <h3>{t('content.title')}</h3>
      <p>{t('content.intro')}</p>
      <div className='mb-5'>
        <p className='h3 my-4'> <strong>1)</strong> {t('content.step1.title')}</p>
        <img width="100%" src="/static/img/soff/soff market asosiy oynasi.png" alt={t('content.step1.imageAlt')} />
      </div>
      <div className='mb-5'>
        <p className='h3 my-4'> <strong>2)</strong> {t('content.step2.title')}</p>
        <img width="100%" src="/static/img/soff/soff marketdan adminkaga kirish oynasi.png" alt={t('content.step2.imageAlt')} />
      </div>
      <div className='mb-5'>
        <p className='h3 my-4'> <strong>3)</strong> {t('content.step3.title')}</p>
        <img width="100%" src="/static/img/soff/soff marketdan ro'yxatdan o'tish oynasi.png" alt={t('content.step3.imageAlt')} />
      </div>
      <div className='mb-5'>
        <p className='h3 my-4'> <strong>4)</strong> {t('content.step4.title')}</p>
        <p className='h4 text-muted'>{t('content.step4.note')}</p>
        <img width="100%" src="/static/img/soff/soff market kod tasdiqlash oynasi.png" alt={t('content.step4.imageAlt')} />
      </div>
      <div className='mb-5'>
        <p className='h3 my-4'> <strong>5)</strong> {t('content.step5.title')}</p>
        <img width="100%" src="/static/img/soff/soff market admin oyansi.png" alt={t('content.step5.imageAlt')} />
      </div>
    </div>
  )
}
