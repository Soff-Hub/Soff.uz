// import React, { useEffect, useState } from 'react';
// import Router from 'next/router';
// import Link from 'next/link';
// import ProductSearchResult from '~/components/elements/products/ProductSearchResult';
// import { Spin } from 'antd';
// import PostRepository from '~/repositories/PostRepository';

// function useDebounce(value, delay) {
//     const [debouncedValue, setDebouncedValue] = useState(value);

//     useEffect(() => {
//         // Update debounced value after delay
//         const handler = setTimeout(() => {
//             setDebouncedValue(value);
//         }, delay);

//         return () => {
//             clearTimeout(handler);
//         };
//     }, [value, delay]);

//     return debouncedValue;
// }

// const PanelSearch = () => {
//     const [keyword, setKeyword] = useState('');
//     const [isSearch, setIsSearch] = useState(false);
//     // const [SearchResultData, setSetSearchResultData] = useState([]);
//     const [SearchResult, setSetSearchResult] = useState([]);
//     const [SearchResult2, setSetSearchResult2] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const debouncedSearchTerm = useDebounce(keyword, 300);


//     function handleSubmit(e) {
//         e.preventDefault();
//     }

//     function handleClearKeyword() {
//         setKeyword('');
//         setIsSearch(false);
//         setLoading(false);
//     }

//     useEffect(() => {
//         if (debouncedSearchTerm) {
//             setLoading(true);
//             if (keyword) {
//                 const queries = {
//                     _limit: 5,
//                     title_contains: keyword,
//                 };

//                 const products = PostRepository.postSearchFilter(keyword);

//                 products.then((result) => {
//                     setLoading(false);
//                     setIsSearch(true);
//                     setSetSearchResult(result);
//                 });
//             } else  {
//                 setIsSearch(false);
//                 setLoading(true)
//                 setKeyword('');
//             }
//             if (loading) {
//                 setIsSearch(false);
//             }
//         } else {
//             setLoading(false);
//             setIsSearch(false);
//         }
//     }, [debouncedSearchTerm]);

//     let productItemsView,
//         clearTextView,
//         selectOptionView,
//         loadingView,
//         loadMoreView;
//     if (!loading) {
//         if (SearchResult && SearchResult.length > 0) {
//             if (SearchResult.length > 5) {
//                 loadMoreView = (
//                     <div className="ps-panel__footer text-center">
//                         <Link href="/search">
//                             <a>Hamma natijalarni ko'rish</a>
//                         </Link>
//                     </div>
//                 );
//             }
//             productItemsView = SearchResult.map((product) => (
//                 <ProductSearchResult product={product} key={product.id} />
//             ));
//         } else {
//             productItemsView = <p>Hujjat topilmadi</p>;
//         }
       
//     } else {
//         loadingView = (
//             <span className="ps-form__action">
//                 <Spin size="small" />
//             </span>
//         );
//     }

//     return (
//         <div className="ps-panel__search-results">
//             <form
//                 className="ps-form--search-mobile"
//                 action="/"
//                 method="get"
//                 onSubmit={(e) => handleSubmit(e)}>
//                 <div className="form-group--nest">
//                     <input
//                         className="form-control"
//                         type="text"
//                         value={keyword}
//                         placeholder="Qidiruv..."
//                         onChange={(e) => setKeyword(e.target.value)}
//                     />
//                     {clearTextView}
//                     {loadingView}
//                     <button>
//                         <i className="icon-magnifier"></i>
//                     </button>
//                 </div>
//                 <div
//                     className={`ps-panel--search-result${
//                         isSearch ? ' active ' : ''
//                     }`}>
//                     <div className="ps-panel__content">{productItemsView}</div>
//                     {loadMoreView}
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default PanelSearch;







import React, { useState } from 'react';
import Router from 'next/router';

const PanelSearch = () => {
    const [keyword, setKeyword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (keyword !== '') {
            Router.push(`/search?keyword=${keyword}`);
        }
    }

    return (
        <div className="ps-panel__search-results">
            <form
                className="ps-form--search-mobile"
                action="/"
                method="get"
                onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group--nest">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Hujjatlarni izlang..."
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button>
                        <i className="icon-magnifier"></i>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PanelSearch;
