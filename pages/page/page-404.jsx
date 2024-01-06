import React from 'react';
import Link from 'next/link';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';

const Page404 = () => {
    return (
        <PageContainer footer={<FooterDefault />} title="Page not found.">
            <div className="ps-page--404 py-5">
                <div className="container">
                    <div className="ps-section__content">
                        <figure>
                            <img src="/static/img/404.jpg" alt="" />
                            <h3>Oh! sahifa topilmadi</h3>
                            <p>
                            Siz qidirayotgan narsani topa olmadik.
                            
                                <Link href="/main">
                                    <a> Bosh sahifa</a>
                                </Link>
                            </p>
                        </figure>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default Page404;
