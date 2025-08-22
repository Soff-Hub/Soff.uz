import React from 'react';
import { Collapse } from 'antd';
import styles from "../styles/detail.module.scss";

const FaqSection = ({ faqs }) => {
  return (
    <div className={styles.faq}>
      <h2>Ko‘p beriladigan savollar</h2>
      <Collapse
        accordion
        items={faqs?.map((faq) => ({
          key: faq.answer, // Har bir panel uchun noyob kalit
          label: faq.question, // Savol panel sarlavhasi sifatida
          children: <p>{faq.answer}</p>, // Javob panel tarkibi sifatida
        }))}
      />
    </div>
  );
};

export default FaqSection;