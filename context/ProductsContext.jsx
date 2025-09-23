import Axios from 'axios';
import { createContext, useState } from 'react';
import { orginalUrl } from '~/reositoriy-admin/Repository';

// ** Defaults
const defaultProvider = {
    homeProdutcs: [],
    getHomeProducts: () => {},
    homeCategories: [],
    homeLoading: false,
    getHomeProductsByCategory: () => {},
};

const ProductContext = createContext(defaultProvider);

const ProductProvider = ({ children }) => {
    const [homeProdutcs, setHomeProducts] = useState([]);
    const [homeCategories, setHomeCategories] = useState([]);
    const [homeLoading, setHomeLoading] = useState(false);

    const getHomeProducts = async params => {
        setHomeLoading(true);
        const res = await Axios.get(
            orginalUrl + `customer/products/?${params || ''}`
        );
        const resp = await Axios.get(
            orginalUrl + `customer/categories/?${params}`
        );
        const offset = !res.data?.results?.[0]
            ? 0
            : res.data?.results?.[0]?.content_type === 'file'
            ? 15
            : res.data?.results?.[0]?.content_type === 'video'
            ? 9
            : res.data?.results?.[0]?.content_type === 'audio'
            ? 18
            : 8;

        setHomeCategories(resp.data?.results);
        setHomeProducts(res.data?.results?.slice(0, offset));
        setHomeLoading(false);
    };

    const getHomeProductsByCategory = async params => {
        setHomeLoading(true);
        const res = await Axios.get(
            orginalUrl + `customer/products/?${params || ''}`
        );
        const offset = !res.data?.results?.[0]
            ? 0
            : res.data?.results?.[0]?.content_type === 'file'
            ? 15
            : res.data?.results?.[0]?.content_type === 'video'
            ? 9
            : res.data?.results?.[0]?.content_type === 'audio'
            ? 18
            : 8;
        setHomeProducts(res.data?.results?.slice(0, offset));
        setHomeLoading(false);
    };

    const values = {
        homeProdutcs,
        getHomeProducts,
        homeCategories,
        homeLoading,
        getHomeProductsByCategory,
    };

    return (
        <ProductContext.Provider value={values}>
            {children}
        </ProductContext.Provider>
    );
};

export { ProductContext, ProductProvider };
