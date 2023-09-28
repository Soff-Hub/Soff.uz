import React from 'react';
var parse = require('html-react-parser');

const ModuleProductDetailDescription = ({ product }) => (
    <div className="ps-product__desc">
        <ul className="ps-list--dot">
            {
                <li>
                    {product?.short_description
                        ? parse(product?.short_description)
                        : ''}
                </li>
            }
        </ul>
        {product?.category?.name && (
            <ul>
                <li>
                    <strong> Kategoriyasi</strong> : {product?.category?.name}
                </li>
            </ul>
        )}
    </div>
);

export default ModuleProductDetailDescription;
