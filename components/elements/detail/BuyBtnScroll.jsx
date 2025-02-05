import React, { useEffect, useState } from 'react'

export default function BuyBtnScroll() {
    const [show, setCollapse] = useState(true)

    const handleScroll = () => {
        if (window.scrollY > 200) {
            setCollapse(false)
        } else if (window.scrollY <= 200) {
            setCollapse(true)
        }
    }

    useEffect(() => {
        if (window) {
            window.addEventListener('scroll', () => handleScroll())
        }

        return () => {
            window.addEventListener('scroll', () => handleScroll())
        }
    }, [window])

    return (
        <div className={`scroll-buy-btn ${show ? '' : 'scroll-buy-btn-no-active'}`}>
            <a
                className="ps-btn py-3 m-0 text-white"
                href="#get-buy"
            >
                <i class="fa-solid fa-download mr-3"></i>
                Yuklab olish
            </a>
        </div>
    )
}
