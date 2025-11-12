import React from 'react';
import SearchSellerCard from '~/entities/seller/search-seller-card';

function FreelancersFilterResult({ data, collapsed }) {
    return <div className={`row row-gap-4 row-cols-2 row-cols-sm-2 row-cols-md-3 ${collapsed ? 'row-cols-lg-3' : 'row-cols-lg-4'} `}>
        {data?.results?.map(s => (
            <div key={s.id}>
                <SearchSellerCard seller={s} />
            </div>
        ))}
    </div>;
}

export default FreelancersFilterResult;
