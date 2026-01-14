import React from 'react'
import { useTranslation } from 'next-i18next'

const ThreeStepsSection = () => {
    const { t } = useTranslation('affiliate');
    
    const steps = [
        {
            title: t('threeSteps.step1.title'),
            description: t('threeSteps.step1.description'),
            number: "1"
        },
        {
            title: t('threeSteps.step2.title'),
            description: t('threeSteps.step2.description'),
            number: "2"
        },
        {
            title: t('threeSteps.step3.title'),
            description: t('threeSteps.step3.description'),
            number: "3"
        },
        {
            title: t('threeSteps.step4.title'),
            description: t('threeSteps.step4.description'),
            number: "4"
        }
    ]
    
    return (
        <div className="container py-5">
            <div className="three_steps_section">
                <h2>{t('threeSteps.title')}</h2>
                <div className="steps_wrapper">
                    {steps.map((step, index) => (
                        <div className="step_card" key={index}>
                            <div className="step_number">{step.number}</div>
                            <h4>{step.title}</h4>
                            <p>{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ThreeStepsSection
