import Router, { useRouter } from 'next/router';
import React from 'react';
import { addPeriodToThousands } from '~/components/partials/account/ProductsLists';
import { checkIfUserIsOnline } from '~/components/partials/homepage/electronic/TopSellersTable';

const ModuleDetailTopInformation = ({ product }) => {
    const router = useRouter();
    const pid = router.asPath;
    const SellerPage = (e) => {
        if (pid !== '/account/myproducts') {
            Router.push(`/seller/${e}`);
            // setAdminModal(true)
        }
    };

 

    console.log(product);
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
                <div className='w_fulls'>
                    <span className="input--label">muallif</span>
                    <div
                        className="product__top-information-account"
                        style={{ cursor: 'pointer' }}
                        onClick={() => SellerPage(product?.seller?.id)}>

                        <div style={{ position: "relative" }}>
                            <img
                                alt="soff"
                                src={product?.seller?.image_url ? product?.seller?.image_url : "/static/img/ozodbek.png"}
                                className="profile__image-client-top-seller"
                            />
                            {
                                <span>{checkIfUserIsOnline(product?.seller?.last_login) ?
                                    <i className="fa-solid fa-circle text-success fs-5" style={{ position: "absolute", bottom: "-12%", right: "3%" }}></i> :
                                    <i className="fa-solid fa-circle text-secondary  fs-5" style={{ position: "absolute", bottom: "-12%", right: "3%" }}></i>

                                }</span>
                            }
                        </div>

                        {product?.seller?.first_name && (
                            <div>
                                <p>{product?.seller?.first_name}{' '}</p>
                                <p> {product?.seller?.last_name}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className='w_fulls2 d-flex gap-3 align-items-center'  >
                    <span className="input--label">narxi</span>
                    <div className="product__top-information--price buystep-0 p-0">
                        {priceView}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default ModuleDetailTopInformation;
