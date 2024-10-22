import Image from 'next/image'
import React from 'react'
import { formatCurrencyWithSpace } from '~/utilities/product-helper'

export default function FileCard() {
    return (
        <div className='file-card'>
            <div className="file-card-inner">
                <div className="file-card-img">
                    <Image
                        src={'https://eu2.contabostorage.com/20ddac7ab90d4d188d1ca104120b91ed:soffuz/media/Images/Kalonka_detaliga_mexanik_ishlov_berish_samaradorlix63.docx_page-1_generate.jpg'}
                        width={300}
                        height={400}
                        alt=''
                    />
                </div>
                <div className="file-card-content">
                    <h3 className='file-card-title'>
                        Transportda yuklarni tashishning taqsimlanishi
                    </h3>
                    <ins className='file-card-price'>{formatCurrencyWithSpace(10000)} so'm</ins>
                </div>
            </div>
        </div>
    )
}
