import { useState } from 'react';
import { useRouter } from 'next/router';

export const useFastApprove = (user) => {
    const router = useRouter();
    const routerId = router.query?.id;

    // State management
    const [loading, setLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [products, setProducts] = useState(null);
    const [dataCategory, setDataCategory] = useState([]);
    const [tagItems, setTagItems] = useState([]);
    const [tegProductsLists, setTegProdcutsLists] = useState([]);

    // Form states
    const [title, setTitle] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [category_id, setCategory_ID] = useState(null);
    const [dataCatStatus, setDataCatStatus] = useState(null);
    const [Fulldata, setFullData] = useState(null);
    const [textAreaItems, setTextAreaItems] = useState(null);
    const [page_count, setPageCount] = useState(0);
    const [demoLink, setDemoLink] = useState(null);
    const [posters, setPosters] = useState([]);
    const [poster, setPoster] = useState(null);
    const [tagSearchResult, setTagSearchResult] = useState(null);
    const [tagSearchResult1, setTagSearchResult2] = useState(null);

    return {
        loading,
        setLoading,
        submitLoading,
        setSubmitLoading,
        products,
        setProducts,
        dataCategory,
        setDataCategory,
        tagItems,
        setTagItems,
        tegProductsLists,
        setTegProdcutsLists,
        title,
        setTitle,
        categoryName,
        setCategoryName,
        category_id,
        setCategory_ID,
        dataCatStatus,
        setDataCatStatus,
        Fulldata,
        setFullData,
        textAreaItems,
        setTextAreaItems,
        page_count,
        setPageCount,
        demoLink,
        setDemoLink,
        posters,
        setPosters,
        poster,
        setPoster,
        tagSearchResult,
        setTagSearchResult,
        tagSearchResult1,
        setTagSearchResult2,
        routerId,
    };
};
