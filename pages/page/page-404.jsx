import React from 'react';
import Link from 'next/link';
import PageContainer from '~/widgets/layouts/PageContainer';

const Page404 = () => {
    return (
        <PageContainer title="Sahifa topilmadi">
            <div className="ps-page--404">
                <div className="container">
                    <div className="ps-section__content">
                        <img src="/static/img/noinfo.svg" alt="Sahifa topilmadi" />
                        <h3>Sahifa topilmadi</h3>
                        <p>
                            Siz qidirayotgan narsani topa olmadik.
                        </p>
                        <p>
                            <Link href="/">
                                <a> Bosh sahifa</a>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default Page404;
