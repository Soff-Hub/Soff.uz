import React from 'react';
import { formatCurrencyWithSpace } from '~/utilities/product-helper';

const ServicePackages = ({ openModal, packages, setPkg }) => {
    const handleClick = (pkg) => {
        setPkg(pkg);
        openModal(true);
    };
    return (
        <div className="row">
            {packages?.map((pkg, idx) => (
                <div
                    key={idx}
                    className="col-12 col-sm-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center"
                >
                    <div className="service_package w-100">
                        <div>
                            <h2>{pkg?.package_type}</h2>

                            <div
                                className="d-flex flex-column gap-4 py-4"
                                style={{
                                    borderBottom: '2px dashed black',
                                }}
                            >
                                {pkg?.options?.map((option, index) => (
                                    <div
                                        key={index}
                                        className="d-flex align-items-center gap-3"
                                    >
                                        <img
                                            src="/static/img/services_images/Vector.png"
                                            alt="check img"
                                        />
                                        <p className="flex-grow-1">
                                            {option?.option?.name}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <h2 className="mt-4">{formatCurrencyWithSpace(pkg?.price)} so'm</h2>
                        </div>

                        <button onClick={() => handleClick(pkg)} className="w-100 mt-4">
                            Buyurtma berish
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ServicePackages;
