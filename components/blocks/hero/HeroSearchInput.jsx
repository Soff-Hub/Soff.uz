import React from 'react'
import SearchSelectDropdown from '../SearchSelectDropdown'

export default function HeroSearchInput() {
    return (
        <div className='hero-search-box'>
            <div className="hero-search-input-loader">
                <i className="fa fa-search fs-4"></i>
            </div>

            <input className='hero-search-input' type="text" placeholder='Video, audio, shablon...' />

            <SearchSelectDropdown />
        </div>
    )
}
