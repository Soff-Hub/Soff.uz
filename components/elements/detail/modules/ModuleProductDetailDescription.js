import React from 'react';

const ModuleProductDetailDescription = ({ product, views }) => {
    return (
        <div className="ps-product__desc">
            <strong className="fs-4"> Qisqa tavsif </strong>
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
                    <span
                        className="file_type-color"
                        style={{
                            backgroundColor:
                                product?.document?.file_type === '.doc'
                                    ? '#007DFF'
                                    : product?.document?.file_type === '.xls' ||
                                      product?.document?.file_type === '.xlsx'
                                    ? '#69C700'
                                    : product?.document?.file_type === '.ppt'
                                    ? '#DC8452'
                                    : product?.document?.file_type === '.pdf'
                                    ? '#BD4851'
                                    : product?.document?.file_type === '.avi'
                                    ? '#6EB5E9'
                                    : product?.document?.file_type === 'mp3'
                                    ? '#88549E'
                                    : product?.document?.file_type === 'html'
                                    ? '#6D96A'
                                    : product?.document?.file_type === 'zip'
                                    ? '#E4BD3E'
                                    : product?.document?.file_type === '.psd'
                                    ? '#0053BD'
                                    : product?.document?.file_type === '.pptx'
                                    ? '#DC8452'
                                    : '#007DFF',
                        }}>
                        {' '}
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
        </div>
    );
};

export default ModuleProductDetailDescription;
