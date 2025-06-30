import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Pagination, Spin } from 'antd';
import PostRepository from '~/repositories/PostRepository';
import Link from 'next/link';
import NextImageCard from '~/components/nextImagecard';
import ProductSearchGoogle from '~/components/elements/products/ProductSearchGoogle';
import useDebounce from '~/hooks/useDebounce';
import Head from 'next/head';
import Meta from '~/components/shared/headers/Meta';
import AISoffiaPresentation, { AISoffiaPresentationNotFoundProduct } from '~/components/elements/AISoffiaPresentation';

const Products_Search_Results = () => {
    const inputEl = useRef(null);
    const [keyword, setKeyword] = useState('');
    const [resultItems, setResultItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [typeSelect, setTypeSelect] = useState('all');
    const [pageCountPlay, setPageCountPlay] = useState(0);
    const [currPagePlay, setCurrPagePlay] = useState(1);
    const { query, push } = useRouter();

    // Debounce qilingan qidiruv so'zi
    const debouncedSearchTerm = useDebounce(keyword, 1500);

    // Qidiruv natijalarini olish
    const fetchResults = async () => {
        if (!keyword.trim()) {
            setLoading(false);
            return;
        }
        setLoading(true);
        try {
            const result = await PostRepository.postSearchFilterNews(currPagePlay, keyword, typeSelect);
            setResultItems(result?.results || []);
            setPageCountPlay(result?.count || 0);
        } catch (error) {
            console.error('Qidiruvda xatolik:', error);
        } finally {
            setLoading(false);
        }
    };

    // Faqat sahifa yoki type o‘zgarsa so‘rov yuborish
    useEffect(() => {
        if (query.keyword) setKeyword(query.keyword);
        if (query.type) setTypeSelect(query.type);
        setLoading(true);
    }, [query]);

    useEffect(() => {
        if (debouncedSearchTerm) {
            fetchResults();
        }
    }, [debouncedSearchTerm, currPagePlay, typeSelect]);

    const itemsType = [
        { id: 1, name: "Barchasi", icon: "fa-solid fa-search", value: "all" },
        { id: 2, name: "Hujjatlar", icon: "fa-solid fa-file", value: "file" },
        { id: 3, name: "Videolar", icon: "fa-solid fa-video", value: "video" },
        { id: 4, name: "Audiolar", icon: "fa-solid fa-music", value: "audio" },
        { id: 5, name: "Shablonlar", icon: "fa-solid fa-file-lines", value: "template" },
        { id: 6, name: "Playlistlar", icon: "fa-solid fa-play", value: "playlist" }
    ];

    return (
        <div className='global_search_results'>
            <Meta
                title={`${keyword} bo‘yicha qidiruv natijalari | Soff.uz`}
                description={`${keyword} bilan bog‘liq fayllar, videolar, xizmatlar va boshqa raqamli mahsulotlarni toping.`}
            />
            <nav className='global_navbar'>
                <div className='container d-flex align-items-center'>
                    <div className='d-flex align-items-center gap-5 width_full_screen'>
                        <Link href="/">
                            <a className="ps-logo">
                                <NextImageCard
                                    url="/static/img/soff/logo-dark.png"
                                    className="logoo"
                                    width="120px"
                                    height="50px"
                                />
                            </a>
                        </Link>
                        <div className="ps-form--quick-search">
                            <div className="ps-form__input">
                                <input
                                    ref={inputEl}
                                    autoFocus
                                    className="form-control"
                                    type="text"
                                    value={keyword}
                                    placeholder="Qidiruv..."
                                    onChange={(e) => setKeyword(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <nav className='global_navbar_bottom'>
                <div className="container ">
                    <div className='navbar-container'>
                        <ul className='d-flex align-items-end p-0 gap-5'>
                             {itemsType.map(item => (
                                <li onClick={() => setTypeSelect(item.value)} key={item.id} className={`d-flex align-items-center gap-3 ${typeSelect === item.value && "active_type"}`}>
                                    <i style={{ fontSize: "18px" }} className={item.icon}></i>
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="results mt-3">
                <div className="container">
                    {loading ? (
                        <div className='d-flex align-items-center justify-content-center pt-5'>
                            <Spin size="large" />
                        </div>
                    ) : resultItems.length > 0 ? (
                        <>
                            <p style={{ fontWeight: "600", color: "#00a44f" }}>
                                Qidiruv natijasida {pageCountPlay} ta ma'lumot topildi
                            </p>
                            {resultItems.map((product) => (
                                <ProductSearchGoogle product={product} key={product.id} />
                            ))}
                            <Pagination
                                className="mt-3"
                                defaultCurrent={currPagePlay}
                                total={pageCountPlay}
                                onChange={(page) => setCurrPagePlay(page)}
                            />
                        </>
                    ) : (
                        <AISoffiaPresentationNotFoundProduct/>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Products_Search_Results;
// import React, { useEffect, useRef, useState } from 'react';
// import Router, { useRouter } from 'next/router';
// import { Spin } from 'antd';
// import Link from 'next/link';
// import NextImageCard from '~/components/nextImagecard';
// import Head from 'next/head';
// import Search_Results_Products from '~/components/elements/search-page-details/products';
// import Search_Results_Specialists from '~/components/elements/search-page-details/specialists';
// import Search_Results_Services from '~/components/elements/search-page-details/services';
// import Search_Results_NotFound from '~/components/elements/search-page-details/notFound';
// import SearchAllProducts from '~/components/elements/search-page-details/searchAllProducts';
// import useApi, { baseUrlUseApi } from '~/repositories/useApi';
// import useDebounce from '~/hooks/useDebounce';

// const Search_Results = ({fourChildData,childCategoryData,}) => {
//     const inputEl = useRef(null);
//     const [loading, setLoading] = useState(false); // Initially true\
//     const [searchTerm, setSearchTerm] = useState('');

//     const debouncedSearchTerm = useDebounce(searchTerm, 1000);
//     const router = useRouter();
//     const { page, keyword, type } = router.query;

//     const queryKey = ['searchedItem', keyword, page, type];
//     const queryUrl = `${baseUrlUseApi}customer/same-google-search/?page=${page}&search=${
//         keyword || ''}&type=${type || 'all' }`;
//     const { data, error, isLoading } = useApi(queryKey, queryUrl, 'GET');


//     useEffect(() => {
//         if (debouncedSearchTerm) {
//             router.push({
//                 pathname: router.pathname,
//                 query: { ...router.query, keyword: debouncedSearchTerm, page: 1, type: 'all', tab: 'all'},
//             });
//         }
//     }, [debouncedSearchTerm]);


    
//     // Views
//     let clearTextView, loadingView;
//     if (!loading) {
//         clearTextView = (
//             <span className='ps-form__action'>
//                 <p className='ps-form__action_search_btn m-auto'>                   
//                     <svg
//                         xmlns='http://www.w3.org/2000/svg'
//                         width='12'
//                         height='13'
//                         viewBox='0 0 12 13'
//                         fill='none'>
//                         <path
//                             d='M9.47006 9.13465L12 11.6646L11.1646 12.5L8.63465 9.97006C7.72497 10.6978 6.57133 11.1332 5.31661 11.1332C2.38184 11.1332 0 8.75138 0 5.81661C0 2.88184 2.38184 0.5 5.31661 0.5C8.25138 0.5 10.6332 2.88184 10.6332 5.81661C10.6332 7.07133 10.1978 8.22497 9.47006 9.13465ZM8.28487 8.69632C9.00722 7.95188 9.45175 6.93641 9.45175 5.81661C9.45175 3.53194 7.60127 1.68147 5.31661 1.68147C3.03194 1.68147 1.18147 3.53194 1.18147 5.81661C1.18147 8.10127 3.03194 9.95175 5.31661 9.95175C6.43641 9.95175 7.45188 9.50722 8.19632 8.78487L8.28487 8.69632Z'
//                             fill='#7B7B7B'
//                         />
//                     </svg></p>
//             </span>
//         );
//     } else {
//         loadingView = (
//             <span className='ps-form__action'>
//                 <Spin size='small' />
//             </span>
//         );
//     }

//     const { asPath } = useRouter();

//     const activeIndex = router.query.tab
//     console.log('data---->', data)
//     const notFound = () => {
//         if(!data || data?.results.length == 0){
//             return <Search_Results_NotFound />
//         }
//         return  <SearchAllProducts data={data?.results} isLoading={isLoading} />
//     }
    
    

//     const sellerTabItems = {
//         all:   notFound(),
//         // specialists: (
//         //     <Search_Results_Specialists
//         //         data={data?.results}
//         //         isLoading={isLoading}
//         //     />
//         // ),

//         products: (
//             <Search_Results_Products
//                 childData={fourChildData}
//                 parentData={childCategoryData}
//                 data={data?.results}
//                 page={page}
//                 total={data?.count}
//                 isLoading={isLoading}
//             />
//         ),
//         // services: (
//         //     <Search_Results_Services
//         //         vices
//         //         data={data?.results}
//         //         isLoading={isLoading}
//         //     />
//         // ),
//         notFound: <Search_Results_NotFound />,
//     };



//     const menuItems = [
//         {
//             title: 'Barchasi',
//             path: 'all',
//         },
//         {
//             title: 'Mahsulotlar',
//             path: 'products',
//         },
//         // {
//         //     title: 'Mutaxasislar',
//         //     path: 'specialists',
//         // },
//         // {
//         //     title: 'Xizmatlar',
//         //     path: 'services',
//         // },
//         // {
//         //     title: "Don't found",
//         //     path: 'notFound',
//         // },
//     ];

//     return (
//         <div className='global_search_results'>
//             <Head>
//                 <title>Soff.uz - Qidiruv natijalar</title>
//                 <meta name='robots' content='index, follow' />
//                 <meta
//                     name='description'
//                     content="Soff.uz qidiruv tizimi orqali o'zingizga kerakli bo'lgan istalgan turdagi intellektual mulklaringizni toping"
//                 />
//             </Head>
//             <nav className='global_navbar'>
//                 <div className='container d-flex align-items-center'>
//                     <div className='d-flex align-items-center gap-5  width_full_screen'>
//                         <Link href='/'>
//                             <a className='ps-logo'>
//                                 <NextImageCard
//                                     url='/static/img/soff/logo-dark.png'
//                                     className='logoo'
//                                     width='120px'
//                                     height='50px'
//                                 />
//                             </a>
//                         </Link>
//                         <div className='ps-form--quick-search'>
//                             <div
//                                 className={
//                                     keyword === ''
//                                         ? 'ps-form__input'
//                                         : 'ps-form__input active_search_input'
//                                 }>
//                                 <input
//                                     ref={inputEl}
//                                     autoFocus
//                                     className={
//                                         keyword === ''
//                                             ? 'form-control input2'
//                                             : 'input1 form-control active_search_input'
//                                     }
//                                     type='text'
//                                     defaultValue={keyword}
//                                     placeholder='Izlayotgan mahsulotingizni toping...'
//                                     onInput={e => {
//                                         const value = e.target.value.trim();
//                                         setSearchTerm(e.target.value.trim());
//                                     }}
//                                 />
//                                 {clearTextView}
//                                 {loadingView}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </nav>

//             <div className=''>
//                 <div className='Search_Results'>
//                     <div className='Search_Results_container container'>
//                         <ul className='Search_ResultsMenu'>
//                             {menuItems.map((item, index) => (
//                                 <Link
//                                     href={  
//                                             {
//                                                 pathname: router.pathname,
//                                                 query: {...router.query, tab: item.path}
//                                             }
//                                         }
//                                         key={index}
//                                 >
//                                     <li 
//                                         className={`activeTab ${
//                                             activeIndex === item.path
//                                                 ? 'active_type'
//                                                 : ''
//                                         }`}>
//                                         {item.title}
//                                     </li>
//                                 </Link>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
               
//                 <div className='container'>{sellerTabItems[activeIndex]}</div>  
          
            
//             </div>
//         </div>
//     );
// };

// export default Search_Results;




// export async function getServerSideProps (context) {
//     const {
//         parentCategory = '',
//         childCategory = '',
//         type
//     } = context.query;

//     const fetchJson = async url => {
//         const res = await fetch(url);
//         if (!res.ok) {
//             return null;
//         }
//         return res.json();
//     };


//     const fourChildUrl = `${baseUrlUseApi}customer/four-child?direction=${type}`;
//     const childCategoryUrl = `${baseUrlUseApi}customer/four-child?direction=${type}&parent__slug=${parentCategory}`;

//     const [fourChildData, childCategoryData] = await Promise.all([
//         fetchJson(fourChildUrl),
//         fetchJson(childCategoryUrl),
//     ]);

//     return {
//         props: {
//             fourChildData: fourChildData || null,
//             childCategoryData: childCategoryData || null,
//             parentCategory,
//             childCategory,
//         },
//     };
// }