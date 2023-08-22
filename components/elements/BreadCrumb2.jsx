import React from 'react';
import Link from 'next/link';

const BreadCrumb = ({ breacrumb }) => {
    return (
        <div className="ps-breadcrumb 2">
            <ul className="breadcrumb">
                {breacrumb.map((item, index) => {
                    if (!item.url) {
                        return <li key={index}>{item.text}</li>;
                    } else {
                        return (
                            <li key={index}>
                                <Link href={item.url}>
                                    <a>{item.text}</a>
                                </Link>
                            </li>
                        );
                    }
                })}
            </ul>
        </div>
    );
};

export default BreadCrumb;
