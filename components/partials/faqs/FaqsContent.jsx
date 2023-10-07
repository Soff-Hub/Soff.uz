<<<<<<< HEAD
import React from 'react';

const FaqsContent = () => {
=======
import React, { useState } from 'react';
import FaqsAccardion from './FaqsAccardion';
import { useEffect } from 'react';
import PostRepository from '~/repositories/PostRepository';

const FaqsContent = () => {
    const [categoryData, setCategoryData] = useState(null);
    const [descriptionData, setDescriptionData] = useState(null);
>>>>>>> dd22480eb5ebc9745f93b3621e789f3afdbccdb1

    const handleClick = () => {};

<<<<<<< HEAD
 
=======
    const getFAQCategorysData = async () => {
        const respons = await PostRepository.getFAQCategorys();
        if (respons) {
            setCategoryData(respons?.results);
        }
    };
>>>>>>> dd22480eb5ebc9745f93b3621e789f3afdbccdb1

    const getFAQDescriptionData = async (id) => {
        const respons = await PostRepository.getFAQDescription(id);
        if (respons) {
            setDescriptionData(respons);
        }
    };

    useEffect(() => {
        getFAQCategorysData();
        // getFAQDescriptionData()
    }, []);
    return (
        <div>
            <div className="faqs-category">
                <h3>Kategoriyalar bo'yicha savollar</h3>
                <div className="row ">
                    {categoryData?.length > 0 &&
                        categoryData?.map((item) => {
                            return (
                                <div
                                    key={item.id}
                                    className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 my-3"
                                    onClick={() => handleClick(item.id)}>
                                    <div className="faqs-category__card">
                                        <i class={`${item.icon} faq-icon`}></i>
                                        <span className="faq-category-name">
                                            {item.name}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
<<<<<<< HEAD
=======
            <FaqsAccardion data={descriptionData} />
>>>>>>> dd22480eb5ebc9745f93b3621e789f3afdbccdb1
        </div>
    );
};

export default FaqsContent;
