import React from 'react';

const ModuleAudioDetailTopInformationLive = ({
    product,
    views,
    admin,
    taxminiyNarx,
}) => {
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

    if (taxminiyNarx) {
        priceView = (
            <div className="ps-product__price sale">
                {+taxminiyNarx === 0 ? (
                    <p>Bepul</p>
                ) : (
                    <>
                        <p className='m-0 p-0' style={{ fontWeight: "bold" }}>
                            {addPeriodToThousands(taxminiyNarx)}
                            so'm
                        </p>
                    </>
                )}
            </div>
        );
    } else {
        priceView = (
            <>
                <p className='m-0 p-0' style={{ fontWeight: "bold" }} >0 so'm</p>
            </>
        );
    }


    return (
        <header>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '15px',
                    margin: '8px 5px',
                }}></div>
            <div
                className={`product__top-information ${'video_user_information'} `}
                style={{ width: '100%' }}>
                <div>
                    <h3>{product?.title}</h3>
                    <div
                        className="product__top-information-account"
                        style={{ cursor: 'pointer' }}>
                        <div>
                            {product?.image || product?.seller?.image ? (
                                <img
                                    alt="soff"
                                    src={product?.image || product?.seller?.image}
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
                        {(product?.first_name || product?.seller?.first_name) && (
                            <a href={`/seller/${product?.seller?.id}`}>
                                {product?.first_name || product?.seller?.first_name} {product?.last_name || product?.seller?.last_name}
                            </a>
                        )}
                    </div>
                </div>
                <div className={`${'audio_live video_send_container'}`}>
                    <div className={`ps-product__actions heart_video `}>
                        <a
                            href="#"
                            style={{
                                cursor: `${admin ? 'not-allowed' : 'pointer'}`,
                            }}>
                            <i
                                className={`${!admin
                                    ? 'fa-solid fa-heart text-danger'
                                    : 'icon-heart'
                                    } `}></i>
                        </a>
                    </div>
                    <div className=" views_video  mt-1">
                        {' '}
                        <i className="fa-solid fa-eye"></i>{' '}
                        <span>{views ? views : 0}</span>
                    </div>
                    <div className="video_send" style={{
                        display: `${admin ? 'none' : 'block'}`,
                    }}  >
                        <i className="fa-solid fa-share-nodes"></i>
                        ulashish
                    </div>

                    <div className="video_send">
                        {priceView}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default ModuleAudioDetailTopInformationLive;
