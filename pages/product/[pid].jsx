import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ProductDetailFullwidth from '~/components/elements/detail/ProductDetailFullwidth';
import RelatedProduct from '~/components/partials/product/RelatedProduct';
import PageContainer from '~/components/layouts/PageContainer';

import Meta from '~/components/shared/headers/Meta';
import SkeletonProductDetail from '~/components/elements/skeletons/SkeletonProductDetail';
import { baseUrl } from '~/repositories/Repository';
import { useEffect } from 'react';

const ProductDefaultPage = ({ product, similar }) => {
    // const router = useRouter();
    // const { pid } = router.query;
    // const [product, setProduct] = useState(null);
    // const [similar, setSimilar] = useState([]);
    // const [loading, setLoading] = useState(false);

    // async function getProduct() {
    //     setLoading(true);
    //     const responseData = await ProductRepository.getProductsById(pid);
    //     if (responseData) {
    //         setProduct(responseData);
    //     }
    // }
    // async function getSimilar() {
    //     setLoading(true);
    //     const responsSimilar = await ProductRepository.getProductSimilarSlug(pid)
    //     if (responsSimilar) {
    //         setSimilar(responsSimilar);
    //     }
    // }

    // useEffect(() => {
    //     getProduct();
    //     getSimilar()
    // }, [pid]);


    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: product.title
                ? product.title
                : 'Loading...',
        },
    ];
    
    useEffect(()=>{
        document.addEventListener('selectstart', function (e) {
            e.preventDefault();
        });
    
    },[])

    return (
        <>
            <PageContainer title={product ? product.title : 'Loading...'}>
                <Meta
                    title={`Soff | ${product.title}`}
                    image={product?.document?.images?.[0]?.image_url}
                    description={`${product.title} mahsulotni saytimizdan Soff.uz bepul yuklab yoki sotib olishingiz mumkin`}
                />

                <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />

                <div className="container">
                    <div className="ps-page--product">
                        <div className="ps-container">
                            <div className="ps-page__container">
                                <div className="ps-page__left">
                                    {product ? (
                                        <ProductDetailFullwidth
                                            product={product}
                                        />
                                    ) : (
                                        <SkeletonProductDetail />
                                    )}
                                </div>
                            </div>

                            {similar?.length > 0 ? (
                                <RelatedProduct
                                    data={similar}
                                    collectionSlug="shop-recommend-items"
                                />
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                </div>
            </PageContainer>
        </>
    );
};

// export async function getStaticPaths() {
//     const res = await fetch(baseUrl + 'customer/documents/');
//     const documentSlug = await res.json();
//     console.log('doc slug', documentSlug);
//     const path = documentSlug.results.map((item) => ({
//         params: { pid: item.slug },
//     }));
//     return { path, fallback: false };
// }

export async function getServerSideProps(context) {
    try {
        const request = await fetch(baseUrl + `customer/documents/${context.query.pid}/`);
        const product = await request.json();

        const SimilarRes = await fetch(baseUrl + `customer/similar/${context.query.pid}/`);
        const similar = await SimilarRes.json();

        return {
            props: {
                product,
                similar
            }
        };
    } catch (error) {
        console.error("Error fetching data:", error);

        return {
            props: {
                product: null,
                similar: null
            }
        };
    }
}


export default ProductDefaultPage;
