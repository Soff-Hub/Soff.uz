import React from 'react'
import { Collapse } from 'antd'
import styles from "../styles/detail.module.scss"

const { Panel } = Collapse

const MoneyBack = () => {
  return (
    <div 
      className="card shadow-sm border-0 mb-4" 
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: "#fff"
      }}
    >
      <div 
        className={`${styles.moneyBox} d-flex align-items-center p-3`} 
        style={{
          gap: "16px"
        }}
      >
        <img 
          src="/static/img/services_images/garant.png" 
          alt="money garant img" 
          style={{
            width: "70px",
            height: "70px",
            objectFit: "contain"
          }}
        />
        <div>
          <h3 className="mb-1" style={{ fontSize: "18px", fontWeight: "600" }}>
            Pulni qaytarish kafolati
          </h3>
          <p className="mb-0 text-muted" style={{ fontSize: "14px" }}>
            Agar buyurtmangiz siz kutgandek bo‘lmasa, pulingizni to‘liq qaytaramiz.
          </p>
        </div>
      </div>

      {/* accordion umumiy divning tagida */}
      <Collapse
        ghost
        expandIconPosition="end"
        className="border-top"
        style={{
          padding: "0 16px 12px",
          backgroundColor: "#fff"
        }}
      >
        <Panel 
          header={<span className='text-success'  style={{ fontWeight: 500 }}>Batafsil ma’lumot</span>} 
          key="1"
        >
          <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.6" }}>
            Pulni qaytarish kafolati bizning mijozlarimizni himoya qilishga qaratilgan.
            Agar xizmat sifati siz kutgandek bo‘lmasa yoki kelishilgan shartlarga
            mos kelmasa, biz pulingizni to‘liq qaytarib beramiz.
          </p>
          <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.6" }}>
            Jarayon oddiy: ariza topshirasiz, biz tekshiramiz va tasdiqlangandan
            so‘ng 3–5 ish kuni ichida mablag‘ingizni qaytarib olasiz.
          </p>
        </Panel>
      </Collapse>
    </div>
  )
}

export default MoneyBack
