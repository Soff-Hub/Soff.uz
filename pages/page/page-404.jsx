import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageLoader from '~/components/elements/common/PageLoader';

const Page404 = () => {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500);
    }, [])

    return (
        <PageContainer footer={<FooterDefault />} title="Page not found.">
            {loading ?? <PageLoader />}
            <div className="ps-page--404 py-5">
                <div className="container">
                    <div className="ps-section__content">
                        <figure>
                            <img src="/static/img/404.png" alt="" />
                            <h3>Oh! sahifa topilmadi</h3>
                            <p>
                                Siz qidirayotgan narsani topa olmadik.

                                <Link href="/">
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
