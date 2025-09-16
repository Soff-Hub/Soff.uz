import React from 'react'
import styles from './style.module.scss'

const ServiceSteps = () => {
    const steps = [
        { id: 1, title: "Mutaxassisni tanlang" },
        { id: 2, title: "Buyurtma bering" },
        { id: 3, title: "To’lovni amalga oshiring" },
        { id: 4, title: "Buyurtmani kuting va qabul qiling" },
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
