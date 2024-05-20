import React, { useEffect, useRef, useState } from 'react';
import Router from 'next/router';
import { Select, Spin } from 'antd';

import ProductSearchResult from '~/components/elements/products/ProductSearchResult';
import PostRepository from '~/repositories/PostRepository';


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
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}


const SearchHeader = ({ setSearch }) => {
    // const inputEl = useRef(null);
    // const [isSearch, setIsSearch] = useState(false);
    // const [keyword, setKeyword] = useState('');
    // const [resultItems, setResultItems] = useState(null);
    // const [loading, setLoading] = useState(false);
    // const debouncedSearchTerm = useDebounce(keyword, 1000);
    // const [selectFile, setSelectFile] = useState('')

    // function handleClearKeyword() {
    //     setKeyword('');
    //     setSearch('')
    //     setIsSearch(false);
    //     setLoading(false);
    // }

    // function handleSubmit(e) {
    //     e.preventDefault();
    //     if (keyword) {
    //         Router.push(`/search?keyword=${keyword}&type=${selectFile}`);
    //     }
    // }


    // useEffect(() => {
    //     if (debouncedSearchTerm) {
    //         setLoading(true);
    //         if (keyword || selectFile) {
    //             const products = PostRepository.postSearchFilter(keyword, selectFile);

    //             products.then((result) => {
    //                 setLoading(false);
    //                 setIsSearch(true);
    //                 setResultItems(result);
    //             });
    //         } else {
    //             setIsSearch(false);
    //             setKeyword('');
    //         }
    //         if (loading) {
    //             setIsSearch(false);
    //         }
    //     } else {
    //         setLoading(false);
    //         setIsSearch(false);
    //     }
    // }, [debouncedSearchTerm, selectFile]);

    // Views
    // let productItemsView,
    //     clearTextView,
    //     loadingView
    // if (!loading) {
    //     if (!resultItems || (resultItems?.file?.length === 0 && resultItems?.audio?.length === 0 && resultItems?.template?.length === 0 && resultItems?.video?.length === 0)) {
    //         productItemsView = <p>Mahsulot topilmadi</p>;
    //     }
    //     else {
    //         resultItems?.file?.length > 0 || resultItems?.audio?.length > 0 || resultItems?.template?.length > 0 || resultItems?.video?.length > 0 ? productItemsView = [...resultItems?.file || [], ...resultItems?.audio || [], ...resultItems?.template ||[], ...resultItems?.video || []].map((product) => (
    //             <ProductSearchResult product={product} key={product.id} /> 
    //         )) : productItemsView = <p>Mahsulot topilmadi</p>
    //     }

    //     if (keyword !== '') {
    //         clearTextView = (
    //             <span className="ps-form__action" onClick={handleClearKeyword}>
    //                 <i className="icon icon-cross2"></i>
    //             </span>
    //         );
    //     }
    // } else {
    //     loadingView = (
    //         <span className="ps-form__action">
    //             <Spin size="small" />
    //         </span>
    //     );
    // }



    const inputEl = useRef(null);
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(false);

    // const [isSearch, setIsSearch] = useState(false);
    // const [resultItems, setResultItems] = useState(null);
    const debouncedSearchTerm = useDebounce(keyword, 1000);

    function handleClearKeyword() {
        setKeyword('');
        // setIsSearch(false);
        setLoading(false);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (keyword) {
            Router.push(`/search-page?keyword=${keyword}`);
        }
    }

    // useEffect(() => {
    //     if (debouncedSearchTerm) {
    //         setLoading(true);
    //         if (keyword) {
    //             const products = PostRepository.postSearchFilterNews(keyword);
    //             products.then((result) => {
    //                 setLoading(false);
    //                 setIsSearch(true);
    //                 setResultItems(result);
    //             });
    //         } else {
    //             setIsSearch(false);
    //             setKeyword('');
    //         }
    //         if (loading) {
    //             setIsSearch(false);
    //         }
    //     } else {
    //         setLoading(false);
    //         setIsSearch(false);
    //     }
    // }, [debouncedSearchTerm]);

    useEffect(() => {
        if (keyword) {
            Router.push(`/search-page?keyword=${keyword}`);
        }
    }, [debouncedSearchTerm]);

    let productItemsView, clearTextView, loadingView;
    if (!loading) {
        // (resultItems?.results?.length < 0)
        //     ? (productItemsView = <div className='d-flex align-items-center justify-content-center pt-5'>
        //         <p> Mahsulot topilmadi </p>
        //     </div>) :
        //     productItemsView = resultItems?.results?.map((product) => (
        //         <ProductSearchResult product={product} key={product.id} />
        //     ))

        if (keyword !== '') {
            clearTextView = (
                <span className="ps-form__action" onClick={handleClearKeyword}>
                    <i className="icon icon-cross2"></i>
                </span>
            );
        }
        if (keyword === '' || keyword === undefined) {
            clearTextView = (
                <span className="ps-form__action">
                    <i className="fa-solid fa-search button_search_icon text-success"></i>
                </span>
            );
        }
    } else {
        loadingView = (
            <span className="ps-form__action">
                <Spin size="small" />
            </span>
        );
    }


    return (
        // <form
        //     className="ps-form--quick-search"
        //     method="get"
        //     action="/"
        //     onSubmit={handleSubmit}
        // >

        //     <Select
        //         defaultValue={[selectFile]}
        //         placeholder="Barchasi"
        //         className='searchFilterSelect'
        //         onChange={(e) => setSelectFile(e)}

        //         style={{
        //             flex: 1,
        //             minWidth: "100px",
        //             height: "42px",

        //         }}
        //         options={[
        //             {
        //                 value: '',
        //                 label: 'Barchasi',
        //             },
        //             {
        //                 value: 'file',
        //                 label: 'Hujjat',
        //             },
        //             {
        //                 value: 'audio',
        //                 label: 'Audio',
        //             },
        //             {
        //                 value: 'template',
        //                 label: 'Shablon',
        //             },
        //             {
        //                 value: 'video',
        //                 label: 'Video',
        //             },
        //         ]}
        //     />


        //     <div className="ps-form__input">
        //         <input
        //             ref={inputEl}
        //             className={keyword === '' ? "form-control input2" : "input1 form-control "}
        //             type="text"
        //             value={keyword}
        //             placeholder="Qidiruv..."
        //             onChange={(e) => (setKeyword(e.target.value), setSearch(e.target.value))}
        //         />
        //         {clearTextView}
        //         {loadingView}
        //     </div>
        //     <button className={keyword === '' ? 'button_search ' : "d-block button_serach_color"}>Qidiruv</button>
        //     <div
        //         className={`ps-panel--search-result${isSearch ? ' active ' : ''
        //             }`}>
        //         <div className="ps-panel__content">{productItemsView}</div>
        //     </div>

        // </form>
        <form
        className="ps-form--quick-search mobile-none"
        method="get"
        action="/"
        onSubmit={handleSubmit}>
        <div className={'ps-form__input'}>
            <input
                ref={inputEl}
                className={'form-control input2'}
                type="text"
                value={keyword}
                placeholder="Qidiruv..."
                onInput={(e) => {
                    const value = e.target.value.trim();
                    setKeyword(value);
                }}
            />
            {clearTextView}
            {loadingView}
        </div>
        <button className={'button_search shadow'}>
            Qidiruv
        </button>
    </form>
    );
};

export default SearchHeader;
