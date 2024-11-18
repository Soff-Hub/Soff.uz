import Link from 'next/link'
import React, { useState } from 'react'

export default function SellerProductsStock() {
    const [style, setStyle] = useState('flex')

    return (
        <div>
            <div className={`mb-2 p-4 d-${style} flex-column justify-content-between mobileImage`}
                style={{
                    borderRadius: "10px",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundImage: "url(/static/img/bagImage.avif)"
                }} >

                <div className="d-flex justify-content-between text-white fw-bold " >
                    <Link href={"https://birja.soff.uz/"}>
                        <a className='iconsmar' target='_blank'>
                            <img src="/static/img/soffbirja-dark-logo.png" alt="birjalogo"
                                width={140}
                                height={30}
                            />
                        </a>
                    </Link>
                    <a className='iconsmar ' style={{ cursor: "pointer" }} onClick={() => setStyle("none")}><i className="fa-solid fa-xmark fs-2 p-0"></i></a>
                </div>
                <Link href={"https://birja.soff.uz/"}>
                    <a className='btn  fs-4 text-white fw-medium '
                        href='https://birja.soff.uz/'
                        target='_blank'
                        style={{
                            borderRadius: "30px", padding: "6px 0", width: "190px",
                            opacity: "0.9",
                            backgroundColor: "#151526"
                        }} >
                        Birjada savdo qilish
                        <i className="fa-solid fa-angle-right ml-2"></i></a>
                </Link>
            </div>
        </div>
    )
}
