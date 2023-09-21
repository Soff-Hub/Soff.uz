import React from 'react';
var parse = require('html-react-parser');

const PartialDescription = ({ product }) => {
    return (
        <div className="ps-document">
            <p>{product?.description ? parse(product.description) : ''}</p>
        </div>
    );
};

export default PartialDescription;
