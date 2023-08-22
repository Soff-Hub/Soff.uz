
import React, { useEffect, useState } from 'react';
import ProductRepository from '~/repositories/ProductRepository';

const SiteFeatures = () => {
    const [card, setCard] = useState([])
    async function getProducts() {
        const responseData = await ProductRepository.getCardData();
        if (responseData) {
            // console.log( 'sdrfcvghbjnkml333' , responseData);
            setCard(responseData);
           
        }
    }

    useEffect(() => {
        getProducts();
    }, []);
    return (
        <section className="ps-site-features">
        <div className="container">
            <div className="ps-block--site-features ps-block--site-features-2">
               {
                card ? card?.map((item, i) => {
                    return(
                        <div key={i} className="ps-block__item">
                        <div className="ps-block__left">
                            <i className={item.icon}></i>
                        </div>
                        <div className="ps-block__right">
                            <h4>{item?.title}</h4>
                            <p>{item?.description}</p>
                        </div>
                    </div>
                    )
                }) : 
                <>Loading...</>
               }

                {/* <div className="ps-block__item">
                    <div className="ps-block__left">
                        <i className="icon-sync"></i>
                    </div>
                    <div className="ps-block__right">
                        <h4>90 Days Return</h4>
                        <p>If goods have problems</p>
                    </div>
                </div>
                <div className="ps-block__item">
                    <div className="ps-block__left">
                        <i className="icon-credit-card"></i>
                    </div>
                    <div className="ps-block__right">
                        <h4>Secure Payment</h4>
                        <p>100% secure payment</p>
                    </div>
                </div>
                <div className="ps-block__item">
                    <div className="ps-block__left">
                        <i className="icon-bubbles"></i>
                    </div>
                    <div className="ps-block__right">
                        <h4>24/7 Support</h4>
                        <p>Dedicated support</p>
                    </div>

                </div> */}

            </div>
        </div>
    </section>
    )
}

export default SiteFeatures;
