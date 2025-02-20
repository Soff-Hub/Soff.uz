import React from 'react';
import Link from 'next/link';



const BreadCrumb = ({ breacrumb }) => {
    return (
        <div className="ps-breadcrumb py-3">
            <div
                >
               <div className="container">
               <ul className="breadcrumb">
                    {breacrumb.map((item, index) => {
                        if (!item.url) {
                            return <li key={index}>{item.text}</li>;
                        } else {
                            return (
                                <li key={item.text}>
                                    <Link href={item.url} as={item.url}>
                                        <a>{item.text}</a>
                                    </Link>
                                </li>
                            );
                        }
                    })}
                </ul>
               </div>
            </div>
        </div>
    );
};

export default BreadCrumb;
