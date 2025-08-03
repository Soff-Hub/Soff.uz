import React, { useState, useEffect, useRef } from 'react';
import Router from 'next/router';

export default function HeroSearchInput(inputProps) {
    const [search, setSearch] = useState('');
    const [value, setValue] = useState({ label: 'Barcha turdagi', icn: 'fa fa-list', value: 'all' });

    const debounceTimer = useRef(null);
    const lastSearched = useRef('');

    function performSearch(query) {
        if (!query || !query.trim()) return;

        const fullUrl = `/search-page?keyword=${query}&type=${value.value}&tab=products&page=1`;

        if (lastSearched.current !== fullUrl) {
            lastSearched.current = fullUrl;
            Router.push(fullUrl);
        }
    }

    // ENTER bosilganda ishlaydi
    function handleSubmit(e) {
        e.preventDefault();
        performSearch(search);
    }

    // foydalanuvchi yozishni tugatgandan 3 soniya o‘tgach avtomatik izlash
    useEffect(() => {
        if (search && search.trim()) {
            if (debounceTimer.current) clearTimeout(debounceTimer.current);

            debounceTimer.current = setTimeout(() => {
                performSearch(search);
            }, 1500);
        }

        return () => {
            if (debounceTimer.current) clearTimeout(debounceTimer.current);
        };
    }, [search, value]); // `value` o‘zgarsa ham ishlaydi

    return (
        <form className='hero-search-box' onSubmit={handleSubmit}>
            <div className="hero-search-input-loader">
                <i className="fa fa-search fs-4"></i>
            </div>

            <input
                onChange={(e) => setSearch(e.target.value)}
                className='hero-search-input fs-3'
                type="text"
                placeholder="Izlayotgan mahsulotingizni toping..."
                {...inputProps}
            />

            {/* <SearchSelectDropdown value={value} setValue={setValue} /> */}
        </form>
    );
}
