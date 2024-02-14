import React, { useState } from 'react';

const ClickCard = ({ onChange, setCardDate }) => {
    const [formattedCardNumber, setFormattedCardNumber] = useState('');
    const [numberDate, setNumberDate] = useState('');

    const handleCardNumberChange = (e) => {
        const inputValue = e.target.value.replace(/\D/g, ''); // Raqam va probilni olib tashlash
        let formattedValue = '';

        if (inputValue.length <= 16) {
            for (let i = 0; i < inputValue.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += ' '; // Raqamlarni probil bilan ajratish
                }
                formattedValue += inputValue[i];
            }
        }

        onChange(inputValue);
        setFormattedCardNumber(formattedValue);
    };

    const handleCardNumberDate = (e) => {
        const inputValue = e.target.value.replace(/\D/g, ''); // Raqam va probilni olib tashlash
        let formattedValue = '';

        if (inputValue.length <= 4) {
            for (let i = 0; i < inputValue.length; i++) {
                if (i > 0 && i % 2 === 0) {
                    formattedValue += '/'; // Raqamlarni probil bilan ajratish
                }
                formattedValue += inputValue[i];
            }
        }
        setCardDate(inputValue);
        setNumberDate(formattedValue);
    };

    // if (reset) {
    //     setNumberDate(" ")
    //     setFormattedCardNumber(" ")
    // }

    return (
        <form className=" pt-3 pb-3 d-flex align-items-end justify-content-between row gap-xxs-0 gap-xs-0 gap-lg-0 gap-md-0 gap-3">
            <div className="col-md-8 click-form-item">
                <span>Karta raqam</span>
                <label htmlFor="ccn">
                    <i class="fa-regular fa-credit-card"></i>
                    <input
                        id="ccn"
                        type="tel"
                        className="form-control rounded-3 card__number "
                        inputMode="numeric"
                        pattern="[0-9\s]{13,19}"
                        autoComplete="cc-number"
                        maxLength="19"
                        placeholder="0000 0000 0000 0000"
                        value={formattedCardNumber}
                        onChange={handleCardNumberChange}
                    />
                </label>
            </div>
            <div className="col-md-4 click-form-item">
                <label>
                    <i class="fa-regular fa-calendar-days"></i>
                    <input
                        id="ccn"
                        type="tel"
                        className="form-control rounded-3 "
                        inputMode="numeric"
                        pattern="[0-9\s]{13,19}"
                        autoComplete="cc-number"
                        maxLength="5"
                        placeholder="MM/YY"
                        value={numberDate}
                        onChange={handleCardNumberDate}
                    />
                </label>
            </div>
        </form>
    );
};

export default ClickCard;
