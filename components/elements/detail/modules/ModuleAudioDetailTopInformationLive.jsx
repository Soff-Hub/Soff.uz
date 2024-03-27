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
    console.log('profile', product);
    // Views
    let priceView;

    if (taxminiyNarx) {
        priceView = (
            <div className="ps-product__price sale">
                {+taxminiyNarx === 0 ? (
                    <p>Bepul mahsulot</p>
                ) : (
                    <>
                        <p>
                            {addPeriodToThousands(taxminiyNarx)}
                            so'm
                        </p>
                    </>
                )}
            </div>
        );
    } else {
        priceView = (
            <h4 className="ps-product__price">
                <>
                    <p>0 so'm</p>
                </>
            </h4>
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
                    <div
                        className="product__top-information-account"
                        style={{ cursor: 'pointer' }}>
                        <div>
                            {product?.image ? (
                                <img
                                    alt="soff"
                                    src={product?.image}
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
                        {product?.first_name && (
                            <p>
                                {product?.first_name} {product?.last_name}
                            </p>
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
                                className={`${
                                    !admin
                                        ? 'fa-solid fa-heart text-danger'
                                        : 'icon-heart'
                                } `}></i>
                        </a>
                    </div>
                    <div className=" views_video  mt-1">
                        {' '}
                        <i class="fa-solid fa-eye"></i>{' '}
                        <span>{views ? views : 0}</span>
                    </div>
                    <div className="video_send">
                        <i class="fa-solid fa-share-nodes"></i>
                        ulashish
                    </div>

                    <div className="product__top-information--price">
                        {priceView}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default ModuleAudioDetailTopInformationLive;
