import React, { useEffect } from 'react';
import Link from 'next/link';
import { useState } from 'react';
import ProductRepository from '~/repositories/ProductRepository';

const FooterLinks = () => {
    const [data, setData] = useState([]);

    const getDataFunc = async () => {
        const respons = await ProductRepository.getRecords();
        if (respons?.results) {
            setData(respons?.results);
        }
    };
    // console.log('data', data);
    useEffect(() => {
        getDataFunc();
    }, []);

    return (

        // <div className="ps-footer__links">
        //     {data?.length > 0 ??
        //         data.map((item, i) => {
        //             return (
        //              <>
        //              {
        //                 <p key={i}>
        //                 <strong>{item.name}</strong>
        //                 { item.promotional_sliders?.length > 0 && item.promotional_sliders?.map((item) => (
        //                     <Link href={item.title} key={item.title}>
        //                         <a>{item.title}</a>
        //                     </Link>
        //                 ))}
        //             </p>
        //             // :
        //             // <>Loading</>
        //              }
        //              </>
        //             )
        //         })
               
        //         }
           
        // </div>
<div></div>
    );
};

export default FooterLinks;
