import React from 'react';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import VedioCart from '~/components/partials/faqs/Vedio-cart';
import { useState } from 'react';
import { useEffect } from 'react';
import vedioLinks from '~/utilities/vedio-link-api';

const VedioList = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        setData(vedioLinks);
    }, []);
    console.log(data);
    return (
        <PageContainer footer={<FooterDefault />} title="FAQ page">
            <div className="ps-page--singlee">
                <div className="container-faqs mt-4">
                    <h3>Video qo'llanma</h3>
                    <div className="row">
                        {data?.map((el) => (
                            <div className="col-6 col-lg-4 col-md-6 col-sm-6 mt-2" key={el.id}>
                                <VedioCart
                                    title={el.title}
                                    url={el.image}
                                    vedioUrl={el.vedioUrl}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default VedioList;
