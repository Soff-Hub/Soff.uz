import React, { useEffect, useState } from 'react'
import AccountMenuSidebar from './account/modules/AccountMenuSidebar'

export default function SidebarLayout({ children, accountLinks }) {
    const [menuOpen, setMenuOpen] = useState(false)
    const [animate, setAnimate] = useState(false)

    const handleCollapse = () => {
        if (!menuOpen) {
            localStorage.setItem('menu', 'menu')
        } else localStorage.removeItem('menu')
        setMenuOpen(c => !c)
    }

    useEffect(() => {
        if (!localStorage.getItem('menu')) {
            setMenuOpen(false)
        } else {
            setMenuOpen(true)
        }

        setTimeout(() => {
            setAnimate(true)
        }, 400);
    }, []);

    return (
        <>
            <div className={`mt-3 ${animate && 'animate-manu'} ${menuOpen ? 'col-lg-4' : 'col-lg-1'} fixed-sidebar`} style={{ flex: 1 }}>
                <div className={`${animate && 'animate-manu'} ps-page__left ${!menuOpen && 'px-1'} justify-content-center pt-3`}>
                    <button className={`burger-btn burger-btn-${menuOpen}`} onClick={handleCollapse}>
                        {menuOpen ? <i class="fa-solid fa-angles-left"></i> : <i class="fa-solid fa-angles-right"></i>}
                    </button>
                    <AccountMenuSidebar menuOpen={menuOpen} data={accountLinks} />
                </div>
            </div>
            <div className={`mt-3 ${animate && 'animate-manu'} ${menuOpen ? 'col-lg-8' : 'col-lg-11'}`}>
                {children}
            </div>
        </>
    )
}
