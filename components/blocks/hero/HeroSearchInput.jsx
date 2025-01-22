import React, { useState } from 'react'
import SearchSelectDropdown from '../SearchSelectDropdown'
import Router from 'next/router';

export default function HeroSearchInput(inputProps) {
    const [search, setSearch] = useState('')
    const [value, setValue] = useState({ label: 'Barcha turdagi', icn: 'fa fa-list', value: 'all' })

    function handleSubmit(e) {
        e.preventDefault();
        if (search && search.trim()) {
            Router.push(`/search-page?keyword=${search}&type=${value.value}`);
        }
    }


    return (
        <form className='hero-search-box' onSubmit={handleSubmit}>
            <div className="hero-search-input-loader">
                <i className="fa fa-search fs-4"></i>
            </div>

            <input
                onChange={e => setSearch(e.target.value)}
                className='hero-search-input'
                type="text"
                placeholder="100 000 dan ortiq ma'lumotlar..." {...inputProps}
            />

            <SearchSelectDropdown value={value} setValue={setValue} />
        </form>
    )
}
