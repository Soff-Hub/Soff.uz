import React, { useState } from "react";
import CreditCardInput from "./CardNumber";
import PostsRepository from "~/reositoriy-admin/PostsRepository";
import { useSelector } from 'react-redux';



const CreditCard = () => {
  const { user } = useSelector(state => state.auth);
  const [number, SetNumber] = useState("●●●● ●●●● ●●●● ●●●●");
  const [numberCard, SetNumberCard] = useState(null);
  const [numberCardVal, SetNumberCardVal] = useState(null);

  const numberTyper = (value) => {
    SetNumberCardVal(value)
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

  async function handleClickCardPosts(){
    const ItemsData= await PostsRepository.CardPostsCredit({"credit_card_number":numberCardVal},user?.access );

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
            <div className="d-flex justify-content-end">
            <button onClick={handleClickCardPosts} className="btn btn-success w-25"><span className="fs-4">Saqlash</span></button>
            </div>
    </div>
  );
};
export default CreditCard;
