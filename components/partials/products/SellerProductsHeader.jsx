import React from 'react'

export default function SellerProductsHeader() {

    return (
        <div className="d-flex flex-column gap-2">
            <span className="fs-4">
                <i className="text-primary-emphasis fa-solid fa-circle-info"></i>{' '}
                <strong>Moderatsiya</strong>{' '}
                <em>
                    ma'lumotlar ko'rib
                    chiqilmoqda...
                </em>
            </span>
            <span className="fs-4">
                <i className="fa-solid text-success fa-circle-check"></i>{' '}
                <strong>Tasdiqlangan </strong>{' '}
                <em>
                    ma'lumotlaringiz
                    muvaffaqqiyatli tasdiqlandi!
                </em>
            </span>
            <span className="fs-4">
                <i className="fa-solid fa-circle-xmark text-danger"></i>{' '}
                <strong>Bekor qilingan</strong>{' '}
                <em>
                    ma'lumotlaringiz bekor
                    qilindi
                </em>
            </span>
        </div>
    )
}
