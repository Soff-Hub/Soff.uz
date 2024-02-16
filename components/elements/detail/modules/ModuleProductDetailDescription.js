import React from 'react';

const ModuleProductDetailDescription = ({ product, views }) => {
    console.log(views);
    return (
        <div className="ps-product__desc">
            <strong className="fs-4"> Qisqa tavsif </strong>
            {product?.document?.content_type === 'video' ? (
                <ul style={{ listStyleType: 'revert' }}>
                    <li>
                        <strong>Davomiyligi : </strong> <div></div>{' '}
                        <span>{product?.document?.content_duration}</span>
                    </li>
                    <li>
                        <strong>Sifati : </strong> <div></div>{' '}
                        <span>{product?.document?.content_quality}</span>
                    </li>
                    <li>
                        <strong>Turi : </strong> <div></div>{' '}
                        <span className="file_type-color">
                            {product?.document?.file_type}
                        </span>
                    </li>
                    <li>
                        <strong>Hajmi : </strong> <div></div>{' '}
                        <span>
                            {product?.document?.file_size}
                        </span>
                    </li>
                    {product?.category?.name && (
                        <li>
                            <strong> Kategoriyasi</strong> : <div></div>{' '}
                            <span> {product?.category?.name}</span>
                        </li>
                    )}
                    {views?.approved > 0 && (
                        <li>
                            <strong>Xarid qilishlar soni : </strong> <div></div>{' '}
                            <span>{views?.approved}</span>
                        </li>
                    )}
                </ul>
            ) : product?.document?.content_type === 'file' ? (
                <ul style={{ listStyleType: 'revert' }}>
                    <li>
                        <strong>Betlar soni : </strong> <div></div>{' '}
                        <span>{product?.document?.page_count} bet</span>
                    </li>
                    <li>
                        <strong>Hajmi : </strong> <div></div>{' '}
                        <span>{product?.document?.file_size}</span>
                    </li>
                    <li>
                        <strong>Turi : </strong> <div></div>{' '}
                        <span className="file_type-color">
                            {product?.document?.file_type}
                        </span>
                    </li>
                    {product?.category?.name && (
                        <li>
                            <strong> Kategoriyasi</strong> : <div></div>{' '}
                            <span> {product?.category?.name}</span>
                        </li>
                    )}
                    {views?.approved > 0 && (
                        <li>
                            <strong>Xarid qilishlar soni : </strong> <div></div>{' '}
                            <span>{views?.approved}</span>
                        </li>
                    )}
                </ul>
            ) : (
                ''
            )}
        </div>
    );
};

export default ModuleProductDetailDescription;
