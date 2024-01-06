import React from 'react';
import Link from 'next/link';
import FooterDefault from '../components/shared/footers/FooterDefault';

function Error() {
    return (
        <div className="site-content pb-5">
            {/* <HeaderDefault /> */}
            <div className="ps-page--404">
                <div className="container">
                    <div className="ps-section__content">
                        <figure>
                            <img src="/static/img/404.jpg" alt="" />
                            <h3>Afsuski sahifa topilmadi</h3>
                            <p>
                                <Link href="/">
                                    <a> Bosh sahifaga qayting</a>
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
