import React from 'react'
import MenuCategoriesDropdown from '~/components/shared/menu/MenuCategoriesDropdown'

export default function HeaderTop() {
    return (
        <div className="container header__top__items py-2">
            <div className='d-flex justify-content-end'>
                <MenuCategoriesDropdown />
            </div>
        </div>
    )
}
