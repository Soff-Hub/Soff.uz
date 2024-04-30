import React from 'react';

const ModuleAudioDetailShoppingActionsLive = ({ admin, free }) => {
    if (true) {
        return (
            <>
                <div className={`ps-product__shopping ${'audio_action '}  `}>
                    <div className={`btn--container ${'audio_btn'} `}>
                        {!free ? (
                            <>
                                <a
                                    style={{
                                        cursor: `${
                                            admin ? 'not-allowed' : 'pointer'
                                        }`,
                                        color: '#fff',
                                        backgroundColor:'#000'
                                    }}
                                    className="ps-btn  max-class"
                                    href="#">
                                    Savatga qo'shish
                                </a>
                                <a
                                    style={{
                                        cursor: `${
                                            admin ? 'not-allowed' : 'pointer'
                                        }`,
                                        color: '#fff',
                                    }}
                                    className="ps-btn max-class"
                                    href="#">
                                    Hoziroq xarid qilish
                                </a>
                            </>
                        ) : (
                            <a
                                style={{
                                    cursor: `${
                                        admin ? 'not-allowed' : 'pointer'
                                    }`,
                                    color: '#fff',
                                }}
                                className="ps-btn ps-btn--black max-class"
                                href="#">
                                Bepul yuklab olish
                            </a>
                        )}
                    </div>
                </div>
            </>
        );
    }
};

export default ModuleAudioDetailShoppingActionsLive;
