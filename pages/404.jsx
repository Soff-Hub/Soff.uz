import React from 'react';
import Link from 'next/link';

import FooterDefault from '../components/shared/footers/FooterDefault';
import HeaderDefault from '../components/shared/headers/HeaderDefault';

function Error({ statusCode }) {
    return (
        <div className="site-content pb-5">
            <HeaderDefault />
            <div className="ps-page--404">
                <div className="container">
                    <div className="ps-section__content">
                        <figure>
                            <img src="/static/img/404.jpg" alt="" />
                            <h3>Oh! sahifa topilmadi</h3>
                            <p>
                            Siz qidirayotgan narsani topa olmadik.{' '}
                                <br />
                                ga qayting
                                <Link href="/">
                                    <a> Bosh sahifa</a>
                                </Link>
                            </p>
                        </figure>
                    </div>
                </div>
            </div>
            <FooterDefault />
        </div>
    );
}

export default Error;
