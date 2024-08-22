import Router, { useRouter } from 'next/router';
import React from 'react';
import { addPeriodToThousands } from '~/components/partials/account/ProductsLists';
import { checkIfUserIsOnline } from '~/components/partials/homepage/electronic/TopSellersTable';

const TemplateModuleDetailTopInformation = ({ product }) => {
    const router = useRouter();
    const pid = router.asPath;
    const SellerPage = (e) => {
        if (pid !== '/account/myproducts') {
            Router.push(`/seller/${e}`);
            // setAdminModal(true)
        }
    };




    // Views
    let priceView;
    if (product?.is_sale) {
        priceView = (
            <div className="ps-product__price sale">
                {+product?.discount_price === 0 ? (
                    <p className='fs-4'>Bepul</p>
                ) : product?.discount === 0 ? (
                    <p className='fs-4'>{addPeriodToThousands(product?.discount_price)} so'm</p>
                ) : (
                    <>
                        <del>{addPeriodToThousands(product?.price)} so'm</del>
                        <p className='fs-4'>
                            {addPeriodToThousands(product?.discount_price)}
                            so'm
                        </p>
                    </>
                )}
            </div>
        );
    } else {
        priceView = (
            <h4 className="ps-product__price ">
                {+product?.discount_price === 0 ? (
                    <p className='fs-4'>Bepul</p>
                ) : product?.discount === 0 ? (
                    <p className='fs-4'>{addPeriodToThousands(product?.discount_price)} so'm</p>
                ) : (
                    <>
                        <del>{addPeriodToThousands(product?.price)} so'm</del>
                        <p className='fs-4'>
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
            <h4 style={{
                fontFamily: " PolySans, 'Inter', -apple-system, 'BlinkMacSystemFont', 'Segoe UI', 'Fira Sans', 'Helvetica Neue', 'Arial', sans-serif ",
                fontSize: "24px"
            }}>
                {product?.title !== undefined ? product?.title : ''}
            </h4>

            <div className="product__top-information p-0">
                <div className='w-100 d-flex flex-column gap-3'>
                    <div
                        className="product__top-information-account"
                        style={{
                            cursor: 'pointer', borderRadius: "8px",
                            border: "1px solid #d6d6d6",
                        }}
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

                    <div style={{
                      borderRadius: "8px",
                         border: "1px solid #d6d6d6",
                    }} className="product__top-information--price buystep-0 d-flex  justify-content-center gap-3 align-items-center ">
                        <strong className='fs-4'> Narxi:</strong>  {priceView}
                    </div>

                </div>


            </div>
        </header>
    );
};

export default TemplateModuleDetailTopInformation;
