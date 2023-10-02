import React from 'react';
import Link from 'next/link';
import { PropagateLoader } from 'react-spinners';

const Menu = ({ source, className }) => {
    // Views
    let menuView;
    if (source) {
        menuView =
            source?.length > 0 ? (
                source?.map((item) => {
                    return (
                        <li key={item.id}>
                            <Link
                                href={`/category/${item.id}`}
                                as={`/category/${item.id}`}>
                                <a>
                                    {item.icon && <i className={item.icon}></i>}
                                    {item.name}
                                </a>
                            </Link>
                        </li>
                    );
                })
            ) : (
                <>
                    {
                        (menuView = (
                            <li  className='ps-5' style={{paddingLeft:'40px'}}>
                                <a href="#" onClick={(e) => e.preventDefault()} >
                                <PropagateLoader className='progres-color' />
                                </a>
                            </li>
                        ))
                    }
                </>
            );
    } else {
        menuView = (
            <li className='ps-5' style={{paddingLeft:'20px'}}>
                <a href="#" onClick={(e) => e.preventDefault()}>
                    <PropagateLoader className='progres-color' />
                </a>
            </li>
        );
    }
    return <ul className={className}>{menuView}</ul>;
};

export default Menu;
