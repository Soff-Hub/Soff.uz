import Router, { useRouter } from 'next/router';
import React from 'react';

const ModuleDetailTopInformation = ({ product }) => {
    const router = useRouter();
    const pid = router.asPath;
    const SellerPage = (e) => {
        if (pid !== '/account/myproducts') {
            Router.push(`/seller/${e}`);
            // setAdminModal(true)
        }
    };

    function addPeriodToThousands(number) {
        const numStr = String(number);

        const [integerPart, decimalPart] = numStr.split('.');

        const formattedIntegerPart = integerPart.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ' '
        );

        const formattedNumber =
            decimalPart !== undefined
                ? `${formattedIntegerPart}.${decimalPart}`
                : formattedIntegerPart;

        return formattedNumber;
    }

    // Views
    let priceView;
    if (product?.is_sale) {
        priceView = (
            <div className="ps-product__price sale">
                {+product?.discount_price === 0 ? (
                    <p>Bepul</p>
                ) : product?.discount === 0 ? (
                    <p>{addPeriodToThousands(product?.discount_price)} so'm</p>
                ) : (
                    <>
                        <del>{addPeriodToThousands(product?.price)} so'm</del>
                        <p>
                            {addPeriodToThousands(product?.discount_price)}
                            so'm
                        </p>
                    </>
                )}
            </div>
        );
    } else {
        priceView = (
            <h4 className="ps-product__price">
                {+product?.discount_price === 0 ? (
                    <p>Bepul</p>
                ) : product?.discount === 0 ? (
                    <p>{addPeriodToThousands(product?.discount_price)} so'm</p>
                ) : (
                    <>
                        <del>{addPeriodToThousands(product?.price)} so'm</del>
                        <p>
                            {addPeriodToThousands(product?.discount_price)}
                            so'm
                        </p>
                    </>
                )}
            </h4>
        );
    }
    return (
        <header>
            <h1 className="product__name">
                {product?.title !== undefined ? product?.title : ''}
            </h1>
            <div className="product__top-information">
                <div>
                    <span className="input--label">muallif</span>
                    <div
                        className="product__top-information-account"
                        style={{ cursor: 'pointer' }}
                        onClick={() => SellerPage(product?.seller?.id)}>
                        <div>
                            {product?.seller?.image ? (
                                <img
                                    alt="soff"
                                    src={product?.seller?.image}
                                    className="profile__image-client"
                                />
                            ) : (
                                <i
                                    className=" fa-2x text-info fa-solid fa-circle-user"
                                    style={{
                                        fontSize: '30px',
                                    }}></i>
                            )}
                        </div>

                        {product?.seller?.first_name && (
                            <p>
                                {product?.seller?.first_name}{' '}
                                {product?.seller?.last_name}
                            </p>
                        )}
                    </div>
                </div>
                <div>
                    <span className="input--label">narxi</span>
                    <div className="product__top-information--price">
                        {priceView}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default ModuleDetailTopInformation;
