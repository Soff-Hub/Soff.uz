import React from 'react';
import Link from 'next/link';
// import useResponsive from '~/shared/utilities/useResponsive';
import { cn } from '~/shared/utilities/cn';

const BreadCrumb = ({ breacrumb, fixedToHeader }) => {
    // const { isMobile, isTablet } = useResponsive();

    return (
        <div
            className={cn(
                'ps-breadcrumb py-3 bg-white'
                // isMobile || isTablet ? 'mt-4' : 'mt-2'
            )}
            style={
                fixedToHeader
                    ? {
                          position: 'sticky',
                          top: 0,
                          right: 10,
                          left: 10,
                          zIndex: 100,
                      }
                    : null
            }>
            <div>
                <div className="container">
                    <ul className="breadcrumb">
                        {breacrumb.map((item, index) => {
                            if (!item.url) {
                                return <li key={item.text}>{item.text}</li>;
                            } else {
                                return (
                                    <li key={item.text}>
                                        <Link href={item.url} as={item.url}>
                                            <a
                                                onClick={(e) =>
                                                    item?.action(e, item.url)
                                                }>
                                                {item.text}
                                            </a>
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
