import React from 'react';
import Link from 'next/link';
import useResponsive from '~/shared/utilities/useResponsive';
import { cn } from '~/shared/utilities/cn';

const BreadCrumb = ({ breacrumb }) => {
    const { isMobile, isTablet } = useResponsive();

    return (
        <div
            className={cn(
                'ps-breadcrumb py-3 bg-white',
                isMobile || isTablet ? 'mt-4' : 'mt-2'
            )}>
            <div>
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
