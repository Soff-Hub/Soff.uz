import React from 'react'

const steps = [
    {
        title: "Ro'yxatdan o'ting",
        description: "Soff.uz saytida hisob yarating va hamkorlik havolangizni oling.",
        number: "1"
    },
    {
        title: "Havolangizni ulashing",
        description: "Do‘stlaringizga, auditoriyangizga yoki ijtimoiy tarmoqlarga havolani joylashtiring.",
        number: "2"
    },
    {
        title: "Daromad oling",
        description: "Har bir tranzaksiya orqali sizga mukofotlar to‘lanadi.",
        number: "3"
    }
]

const ThreeStepsSection = () => {
    return (
        <div className="container py-5">
            <div className="three_steps_section">
                <h2>3 qadamda daromad oling</h2>
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
