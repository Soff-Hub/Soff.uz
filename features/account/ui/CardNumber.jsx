import React, { useState } from 'react';

const CreditCardInput = ({ onChange }) => {

    const [formattedCardNumber, setFormattedCardNumber] = useState('');

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
    return (
        <>
            <input
                id="ccn"
                type="tel"
                className='form-control rounded-3 '
                inputMode="numeric"
                pattern="[0-9\s]{13,19}"
                autoComplete="cc-number"
                maxLength="19"
                placeholder="xxxx xxxx xxxx xxxx"
                value={formattedCardNumber}
                onChange={handleCardNumberChange}
                style={{height:"35px",}}
            />
        </>
    );
};

export default CreditCardInput;
