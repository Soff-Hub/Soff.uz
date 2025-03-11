import React, { useState } from 'react';

export default function SellerProduct() {
    const [activeIndex, setActiveIndex] = useState(null);

    const menuItems = ["Biz haqimizda", "Xizmatlar", "Mahsulotlar", "Kamentariyalar"];

    return (
        <div className='shadow-sm'>
            <ul className='sellerProductMenu'>
                {menuItems.map((item, index) => (
                    <li 
                        key={index} 
                        className={activeIndex === index ? 'active' : ''} 
                        onClick={() => setActiveIndex(index)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}
