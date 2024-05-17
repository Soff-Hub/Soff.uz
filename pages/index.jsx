// import React, { useEffect, useRef, useState } from 'react';
// import Router from 'next/router';
// import { Spin } from 'antd';
// import SearchHeadersPages from '~/components/shared/headers/SearchHeadersPages';

// // import PostRepository from '~/repositories/PostRepository';
// // import ProductSearchResult from '~/components/elements/products/ProductSearchResult';

// function useDebounce(value, delay) {
//     const [debouncedValue, setDebouncedValue] = useState(value);


//     useEffect(() => {
//         const handler = setTimeout(() => {
//             setDebouncedValue(value);
//         }, delay);

//         return () => {
//             clearTimeout(handler);
//         };
//     }, [value, delay]);

//     return debouncedValue;
// }


// const NewSearchHomePages = () => {

//     const inputEl = useRef(null);
//     const [keyword, setKeyword] = useState('');
//     const [loading, setLoading] = useState(false);

//     // const [isSearch, setIsSearch] = useState(false);
//     // const [resultItems, setResultItems] = useState(null);
//     const debouncedSearchTerm = useDebounce(keyword, 1000);


//     function handleClearKeyword() {
//         setKeyword('');
//         // setIsSearch(false);
//         setLoading(false);
//     }

//     function handleSubmit(e) {
//         e.preventDefault();
//         if (keyword) {
//             Router.push(`/search-page?keyword=${keyword}`);
//         }
//     }



//     // useEffect(() => {
//     //     if (debouncedSearchTerm) {
//     //         setLoading(true);
//     //         if (keyword) {
//     //             const products = PostRepository.postSearchFilterNews(keyword);
//     //             products.then((result) => {
//     //                 setLoading(false);
//     //                 setIsSearch(true);
//     //                 setResultItems(result);
//     //             });
//     //         } else {
//     //             setIsSearch(false);
//     //             setKeyword('');
//     //         }
//     //         if (loading) {
//     //             setIsSearch(false);
//     //         }
//     //     } else {
//     //         setLoading(false);
//     //         setIsSearch(false);
//     //     }
//     // }, [debouncedSearchTerm]);


//     useEffect(() => {
//         if (keyword) {
//             Router.push(`/search-page?keyword=${keyword}`);
//         }
//     }, [debouncedSearchTerm])


//     let productItemsView,
//         clearTextView,
//         loadingView
//     if (!loading) {
//         // (resultItems?.results?.length < 0)
//         //     ? (productItemsView = <div className='d-flex align-items-center justify-content-center pt-5'>
//         //         <p> Mahsulot topilmadi </p>
//         //     </div>) :
//         //     productItemsView = resultItems?.results?.map((product) => (
//         //         <ProductSearchResult product={product} key={product.id} />
//         //     ))

//         if (keyword !== '') {
//             clearTextView = (
//                 <span className="ps-form__action" onClick={handleClearKeyword}>
//                     <i className="icon icon-cross2"></i>
//                 </span>
//             );
//         }
//         if (keyword === '' || keyword === undefined) {
//             (clearTextView = <span className="ps-form__action">
//                 <i className='fa-solid fa-search button_search_icon text-success'></i>
//             </span>)
//         }
//     } else {
//         loadingView = (
//             <span className="ps-form__action">
//                 <Spin size="small" />
//             </span>
//         );
//     }


//     return (
//         <div>
//             <SearchHeadersPages />
//             <div className="search_home_pages">
//                 <div className="container">
//                     <div className="search_home_box">
//                         <h1 > <span className='span_saecrh ' style={{ color: "#333" }}>Soff.uz - </span>
//                             <span className="span_saecrh ">
//                                 qidiruv tizimi
//                             </span>

//                         </h1>
//                         <h1 >  Uzbek tilida saralanib borilayotgan
//                             sifatli ma'lumotlar jamlanmasini, faylar, tasvirlar,  videolar, audiolar ko'rinishida qidirib topish imkonini beradi.


//                         </h1>
//                         {/* <form
//                             className="ps-form--quick-search"
//                             method="get"
//                             action="/"
//                             onSubmit={handleSubmit}
//                         >
//                             <div className={keyword === '' ? "ps-form__input" : "ps-form__input active_search_input"}>
//                                 <input
//                                     ref={inputEl}
//                                     className={keyword === '' ? "form-control input2" : "input1 form-control active_search_input"}
//                                     type="text"
//                                     value={keyword}
//                                     placeholder="Qidiruv..."
//                                     onInput={(e) => {
//                                         const value = e.target.value.trim();
//                                         setKeyword(value);
//                                     }}
//                                 />
//                                 {clearTextView}
//                                 {loadingView}
//                             </div>
//                             <button className={keyword === '' ? 'button_search shadow' : " button_search active_search_button"}>Qidiruv</button>
//                             <div
//                                 className={`ps-panel--search-result ${isSearch ? ' active ' : ''
//                                     }`}>
//                                 <div className="ps-panel__content">{productItemsView}</div>
//                             </div>

//                         </form> */}

//                         <form
//                             className="ps-form--quick-search"
//                             method="get"
//                             action="/"
//                             onSubmit={handleSubmit}
//                         >
//                             <div className={"ps-form__input"}>
//                                 <input
//                                     ref={inputEl}
//                                     className={"form-control input2"}
//                                     type="text"
//                                     value={keyword}
//                                     placeholder="Qidiruv..."
//                                     onInput={(e) => {
//                                         const value = e.target.value.trim();
//                                         setKeyword(value);
//                                     }}
//                                 />
//                                 {clearTextView}
//                                 {loadingView}
//                             </div>
//                             <button className={'button_search shadow'}>Qidiruv</button>

//                         </form>

//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default NewSearchHomePages


import React from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import Meta from '~/components/shared/headers/Meta';
import { useMemo } from 'react';
import HomeElectronicsPage from '~/pages/home_pages/electronic';

const HomepageDefaultPage = () => {

    const memoValue = useMemo(() => {
        return (
            <HomeElectronicsPage />
        )
    }, [])

    return (
        <PageContainer title="Soff - barcha ma'lumotlar bazasi">
            <Meta title="Soff - barcha ma'lumotlar bazasi" image="/static/img/soff/soff_green_white.png" />
            {memoValue}
        </PageContainer>
    );
};

export default HomepageDefaultPage;




