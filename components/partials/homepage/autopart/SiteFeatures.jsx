
import React, { useEffect, useState } from 'react';
import { PropagateLoader } from 'react-spinners';
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
                card?.length > 0 ? card.map((item, i) => {
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
                <div style={{display:'flex', justifyContent:'center', marginLeft:'50%', marginTop:'5%'}}>
                <PropagateLoader color="#FFC107" />
                </div>
               }

              
            </div>
        </div>
    </section>
    )
}

export default SiteFeatures;
