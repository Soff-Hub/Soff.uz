import React from 'react';
var parse = require("html-react-parser");


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
            <li>{product?.short_description ? parse(product?.short_description) : ""}</li>
           }
        </ul>
    </div>
);

export default ModuleProductDetailDescription;
