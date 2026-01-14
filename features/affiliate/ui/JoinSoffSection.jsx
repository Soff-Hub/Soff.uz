import React from 'react'
import { useTranslation } from 'next-i18next'

const JoinSoffSection = () => {
  const { t } = useTranslation('affiliate');
  
  return (
    <div className='JoinSoffSection'>
        <h3>{t('joinSoff.title')}</h3>
        <a href='#link'>{t('joinSoff.button')}</a>
    </div>
  )
}

export default JoinSoffSection