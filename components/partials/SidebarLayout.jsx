import React, { useContext, useEffect, useState } from 'react'
import AccountMenuSidebar from './account/modules/AccountMenuSidebar'
import { SidebarContext } from '~/hooks/SidebarContext'

export default function SidebarLayout({ children, accountLinks }) {
    const [animate, setAnimate] = useState(false)
    const { collapse, toggleSidebar } = useContext(SidebarContext)

    const handleCollapse = () => {
        toggleSidebar()
    }

    useEffect(() => {
        setTimeout(() => {
            setAnimate(true)
        }, 400);
    }, [])

    return (
        <>
            <div className={`mt-3 ${animate && 'animate-manu'} ${collapse ? 'col-lg-4' : 'col-lg-1'} fixed-sidebar`} style={{ flex: 1 }}>
                <div className={`${animate && 'animate-manu'} ps-page__left ${!collapse && 'px-1'} justify-content-center pt-3`}>
                    <button className={`burger-btn burger-btn-${collapse}`} onClick={handleCollapse}>
                        {collapse ? <i class="fa-solid fa-angles-left"></i> : <i class="fa-solid fa-angles-right"></i>}
                    </button>
                    <AccountMenuSidebar menuOpen={collapse} data={accountLinks} />
                </div>
            </div>
            <div className={`mt-3 ${animate && 'animate-manu'} ${collapse ? 'col-lg-8' : 'col-lg-11'}`}>
                {children}
            </div>
        </>
    )
}
