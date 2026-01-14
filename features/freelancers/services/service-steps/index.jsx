import React from 'react'
import styles from './style.module.scss'
import { useTranslation } from 'next-i18next'

const ServiceSteps = () => {
    const { t } = useTranslation('orders');
    
    const steps = [
        { id: 1, title: t('steps.step1') },
        { id: 2, title: t('steps.step2') },
        { id: 3, title: t('steps.step3') },
        { id: 4, title: t('steps.step4') },
    ]

    return (
        <div className={styles.stepsContainer}>
            {steps.map((step) => (
                <StepCard key={step.id} number={step.id} title={step.title} />
            ))}
        </div>
    )
}

export default ServiceSteps


const StepCard = ({ number, title }) => {
    return (
        <div className={styles.stepCard}>
            <div className={styles.numberCircle}>{number}</div>
            <h3 className={styles.stepTitle}>{title}</h3>
        </div>
    )
}
