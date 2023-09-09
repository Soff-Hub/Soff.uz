import React, { useState } from "react";
import CreditCardInput from "./CardNumber";


const CreditCard = ({profile}) => {
  const [number, SetNumber] = useState("●●●● ●●●● ●●●● ●●●●");
  const [numberCard, SetNumberCard] = useState(null);
  
  
  const numberTyper = (value) => {
    const firstFourNumbers = value.slice(0, 4);
    SetNumberCard(Number(firstFourNumbers))
    if (!value == 0) {
      let numberPlaceholder = ''
      for (let i = 0; i < 16; i++) {
        if (i > 0 && i % 4 === 0) {
          numberPlaceholder += ' ';
        }
        numberPlaceholder += value[i] || '●';
      }
      return SetNumber(numberPlaceholder)
    }

    SetNumber('●●●● ●●●● ●●●● ●●●●')

  }

  return (
    <div className="formCard w-75 m-auto py-5 px-5">
        <div id="Card" className={ numberCard===9860 ? "BackImg " : numberCard===8600 ? "BackImg2" : "BackImg1"}>
      <div className="colCard px-5">
      <h5 className="cardText cardColorHumo">{number}</h5>
          <h5 className="cardText text-white" style={{marginRight:"8rem",}}>{numberCard===9860 ? "HUMO" : numberCard===8600 ? "UZCARD" : "Karta nomi"}</h5>
      </div>
        </div>
            <CreditCardInput onChange={value => numberTyper(value)} />
    </div>
  );
};
export default CreditCard;
