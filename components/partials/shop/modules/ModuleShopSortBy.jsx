import React from 'react';

const ModuleShopSortBy = () => {
    return (
        <select
            className="ps-select form-control"
            data-placeholder="Sort Items">
            <option>Sort by latest</option>

            <option>Sort by head</option>
        </select>
    );
};

export default ModuleShopSortBy;
