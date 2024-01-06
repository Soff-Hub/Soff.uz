import React, { useState } from 'react';
import Router from 'next/router';

const PanelSearch = ({
    setMenuDrawer,
    setCartDrawer,
    setCategoriesDrawer,
    setSearchDrawer,
}) => {
    const [keyword, setKeyword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (keyword !== '') {
            Router.push(`/search?keyword=${keyword}`);
        }
    }

    const handleDrawerClose = () => {
        setMenuDrawer(false);
        setCartDrawer(false);
        setCategoriesDrawer(false);
        setSearchDrawer(false);
    };

    return (
        <div className="ps-panel__search-results">
            <form
                className="ps-form--search-mobile"
                action="/main"
                method="get"
                onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group--nest">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Mahsulotlarni izlang..."
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button onClick={handleDrawerClose}>
                        <i className="icon-magnifier"></i>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PanelSearch;
