// import React from 'react';
// import PageContainer from '~/components/layouts/PageContainer';
// import Meta from '~/components/shared/headers/Meta';
// import { useMemo } from 'react';
// import HomeElectronicsPage from '~/pages/home_pages/electronic';

// const HomepageDefaultPage = () => {

//     const memoValue = useMemo(() => {
//         return (
//             <HomeElectronicsPage />
//         )
//     }, [])

//     return (
//         <PageContainer title="Soff - barcha ma'lumotlar bazasi">
//             <Meta title="Soff - barcha ma'lumotlar bazasi" image="/static/img/soff/soff_green_white.png" />
//             {memoValue}
//         </PageContainer>
//     );
// };

// export default HomepageDefaultPage;


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
                            <img src="/static/img/404.png" alt="" />
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
