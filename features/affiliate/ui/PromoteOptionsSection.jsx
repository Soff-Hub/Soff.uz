import React from 'react'
import { useTranslation } from 'next-i18next'

const PromoteOptionsSection = () => {
    const { t } = useTranslation('affiliate');
    
    return (
        <div className='container py-5'>
            <div className='promote_options_section'>
                <div className='promote_text'>
                    <h2>{t('promoteOptions.title')}</h2>
                    <p>{t('promoteOptions.description')}</p>
                    <ul>
                        <li>{t('promoteOptions.items.file')}</li>
                        <li>{t('promoteOptions.items.3d')}</li>
                        <li>{t('promoteOptions.items.design')}</li>
                        <li>{t('promoteOptions.items.website')}</li>
                        <li>{t('promoteOptions.items.template')}</li>
                        <li>{t('promoteOptions.items.video')}</li>
                    </ul>
                </div>
                <div className='promote_image'>
                    {/* Rasm joyi: sen quyidagiga o'z rasmingni qo'yasan */}
                    <img src="/static/img/affiliate_program/promote-en.png" alt="What you can promote" />
                </div>
            </div>
        </div>
    )
}

export default PromoteOptionsSection
