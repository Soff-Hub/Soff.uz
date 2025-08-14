import React from 'react'
import { Collapse } from 'antd'
import styles from "../styles/detail.module.scss"

const { Panel } = Collapse

const FaqSection = ({ faqs }) => {
    return (
        <div className={styles.faq}>
            <h2 >Ko‘p beriladigan savollar</h2>
            <Collapse accordion>
                {faqs?.map((faq, index) => (
                    <Panel header={faq.question} key={index}>
                        <p>{faq.answer}</p>
                    </Panel>
                ))}
            </Collapse>
        </div>
    )
}

export default FaqSection
