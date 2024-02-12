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

    return (
        <form className=" pt-3 pb-3 d-flex align-items-end justify-content-between row gap-xxs-0 gap-xs-0 gap-lg-0 gap-md-0 gap-3">
            <div className="col-md-8 ">
                <label htmlFor="ccn">Karta raqam</label>
                <input
                    id="ccn"
                    type="tel"
                    className="form-control rounded-3 "
                    inputMode="numeric"
                    pattern="[0-9\s]{13,19}"
                    autoComplete="cc-number"
                    maxLength="19"
                    placeholder="xxxx xxxx xxxx xxxx"
                    value={formattedCardNumber}
                    onChange={handleCardNumberChange}
                />
            </div>
            <div className="col-md-4">
                <input
                    id="ccn"
                    type="tel"
                    className="form-control rounded-3 text-center "
                    inputMode="numeric"
                    pattern="[0-9\s]{13,19}"
                    autoComplete="cc-number"
                    maxLength="5"
                    placeholder="00/00"
                    value={numberDate}
                    onChange={handleCardNumberDate}
                />
            </div>
        </form>
    );
};

export default ClickCard;
