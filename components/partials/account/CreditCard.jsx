import React, { useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";


const CreditCard = () => {
  const [number, SetNumber] = useState("");
  const [name, SetName] = useState("");
  const [date, SetDate] = useState("");
  const [cvc, SetCvc] = useState("");
  const [focus, SetFocus] = useState("");

  return (
    <div className="FormShadow">
      {/* <div className="rccs__card backcolor"> */}

      <div clasName="rccs__card rccs__card--unknown imageBack">
        <Cards
          number={number}
          name={name}
        />
      </div>

      <br />
      <form className="formIdCard">
        <div className="row">
          <div className="col-sm-11">
            <label for="name">Karta raqam</label>
            <input
              type="text"
              className="form-control rounded-3"
              value={number}
              name="number"
              onChange={(e) => {
                SetNumber(e.target.value);
              }}
              onFocus={(e) => SetFocus(e.target.name)}
            ></input>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-sm-11">
            <label for="name">Karta nomi</label>
            <input
              type="text"
              className="form-control rounded-3"
              value={name}
              name="name"
              onChange={(e) => {
                SetName(e.target.value);
              }}
              onFocus={(e) => SetFocus(e.target.name)}
            ></input>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-sm-6">
            <label for="name">Tugash muddati</label>
            <input
              type="text"
              name="expiry"
              className="form-control rounded-3"
              value={date}
              onChange={(e) => {
                SetDate(e.target.value);
              }}
              onFocus={(e) => SetFocus(e.target.name)}
            ></input>
          </div>
          <div className="col-sm-5 ">
            <label for="name">CVV</label>
            <input
              type="tel"
              name="cvc"
              className="card rounded-3 form-control"
              value={cvc}
              onChange={(e) => {
                SetCvc(e.target.value);
              }}
              onFocus={(e) => SetFocus(e.target.name)}
            ></input>
          </div>
        </div>
      </form>
    </div>
  );
};
export default CreditCard;
