import React from 'react';
import Link from 'next/link';

const ModuleProductDetailDescription = ({ product }) => (
    <div className="ps-product__desc">

        {/* <p>
            Sold By:
            <Link href="/shop">
                <a>
                    <strong> {product.vendor}</strong>
                </a>
            </Link>

        </p> */}
        <ul className="ps-list--dot">
           {
            <li>{product.short_description}</li>
           }
        </ul>
    </div>
);

export default ModuleProductDetailDescription;
