import React from 'react'

export default function TemplateDetails({ product }) {
    console.log(product);

    return (
        <div>
            <div>
                <div>
                    <i class="fa-solid fa-caret-right"></i>
                    <span>Fayl formati</span>
                </div>
                <span>{product?.document?.file_type}</span>
            </div>
            <div>
                <div>
                    <i class="fa-solid fa-caret-right"></i>
                    <span>Fayl hajmi</span>
                </div>
                <span>{product?.document?.file_size}</span>
            </div>
            <div>
                <div>
                    <i class="fa-solid fa-caret-right"></i>
                    <span>Ko'rshlar soni</span>
                </div>
                <span>{product?.views} ta</span>
            </div>
            <div>
                <div>
                    <i class="fa-solid fa-caret-right"></i>
                    <span>AI dan foydalanilmagan</span>
                </div>
            </div>
        </div>
    )
}
