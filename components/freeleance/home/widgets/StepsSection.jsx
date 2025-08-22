import React from 'react'
import styles from "../styles/Steps.module.scss"

const steps = [
    { id: 1, title: "Xizmatni tanlang", description: "Katalogdan yoki qidiruv orqali sizga kerakli xizmat yoki frilanserni toping."},
    { id: 2, title: "Xizmat tafsilotibilan tanishing", description: "Talablaringizga mos xizmat ekanligiga amin bo’ling va kerak bo’lsa frilanser bilan muloqot qilib kelishib oling" },
    { id: 3, title: "To‘lov qiling - xavfsiz", description: "To‘lov faqat ish yakunlangandan so‘ng ijrochiga o‘tkaziladi. Sizning pulingiz platforma kafolati ostida saqlanadi." },
    { id: 4, title: "Sifatli natijani oling", description: "Ishni qabul qiling va kerak bo‘lsa tuzatishlar so‘rang. 100% qoniqish kafolati." },
]

const StepsSection = () => {
    return (
        <div className={styles.stepsSection}>
            <img src="/static/img/HomePage/icon.png" alt="badge" className='mb-5' />
            <h3>Xizmatlardan foydalanish juda oson</h3>
            <h1 className="mb-4">SOFF.UZ</h1>
            <div className={styles.bgBlob}></div>

            <div className={styles.stepsWrapper}>
                {steps.map((step, index) => (
                    <div style={{marginTop: (index == 1 || index == 3) && "70px"}} key={step.id} className={styles.stepCard}>
                        <h3>{step.id}</h3>
                        <p>{step.title}</p>
                        <span>{step?.description}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default StepsSection
