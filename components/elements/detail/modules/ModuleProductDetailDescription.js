import React from 'react';

const ModuleProductDetailDescription = ({ product }) => (
    <div className="ps-product__desc">
        <strong className="fs-3"> Qisqa tavsif </strong>
        <ul className="ps-list--dot" style={{ listStyleType: 'revert' }}>
            <li>
                {' '}
                <strong>Betlar soni : </strong> {product?.document?.page_count}
            </li>
            <li>
                {' '}
                <strong>Hajmi : </strong> {product?.document?.file_size}
            </li>
            <li>
                {' '}
                <strong>Turi : </strong> {product?.document?.file_type}
            </li>
            {product?.category?.name && (
                <li>
                    <strong> Kategoriyasi</strong> : {product?.category?.name}
                </li>
            )}
        </ul>
    </div>
);

export default ModuleProductDetailDescription;
