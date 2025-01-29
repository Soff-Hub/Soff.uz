import { useRouter } from 'next/router';
import HeaderTitle from '~/components/blocks/header/HeaderTitle';
import PageContainer from '~/components/layouts/PageContainer';
import WebsitesProductsByCategory from '~/components/partials/category/WebsitesProductsByCategory';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Meta from '~/components/shared/headers/Meta';
import useApi, { baseUrlUseApi } from '~/repositories/useApi';
const baseUrl = 'https://api.soff.uz/api/v1/';


export default function WebsiteProducts() {
    const router = useRouter();
    const { slug, page, parentCategory, childCategory } = router.query;

    // products API uchun so'rov
    const { data, error, isLoading } = useApi(
        ["products", slug, page, parentCategory, childCategory], // queryKey dinamik
        `${baseUrlUseApi}customer/products/?type=file&category=${childCategory ? childCategory : parentCategory}&page=${page || 1}&page_size=48`,
        "GET"
    );


    // Four-child API uchun so'rov
    // const { data: fourChildData, error: fourChildError, isLoading: isFourChildLoading } = useApi(
    //     ["fourChild"], // Query key
    //     `${baseUrlUseApi}customer/four-child?type=file`,
    //     "GET"
    // );

    // Pagination tugmalari uchun funksiya
    const handlePageChange = (newPage) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, page: newPage }, // URL'ga yangi page qo'shish
        });
    };

    return (
        <PageContainer
            footer={<FooterDefault />}
            title={'Kategoriya'}
            boxed={true}>
            <Meta
                title={`${'asdf'}`}
                description={`Biz siz qidirayotgan mahsulotlarni Soff.uz saytimizning kategoriyasida topdik`}
            />

            <HeaderTitle />
            <div className='ps-page--shop container'>


                {/* <CategoriesFilterSecion
                    breacrumb={fourChildData}
                    count={data?.count}
                    isLoading={isFourChildLoading}
                /> */}


                <WebsitesProductsByCategory
                    data={data}
                    page={page}
                    handlePagination={number => {
                        handlePageChange(number);
                    }}
                    isLoading={isLoading}
                />
            </div>

        </PageContainer>
    );
}




















// export default function WebsiteProducts () {
//     const [data, setData] = useState([]);

//     async function getProducts () {
//         const endPoint = 'customer/products/?page_size=48';
//         Axios.get(baseUrl + endPoint)
//             .then(res => {
//                 console.log('success => ', res);
//                 setData(res.data);
//             })
//             .catch(err => {
//                 console.log('err -> ', err);
//             });            
//     }
    

//     useEffect(() => {
//         getProducts();
//     }, []);


//     return (
//         <PageContainer
//             footer={<FooterDefault />}
//             title={'Kategoriya'}
//             boxed={true}>
//             <Meta
//                 title={`${'asdf'}`}
//                 description={`Biz siz qidirayotgan mahsulotlarni Soff.uz saytimizning kategoriyasida topdik`}
//             />
//             <HeaderTitle
//                 title={'Veb saytga oid elektron mahsulotlardan foydalaning'}
//                 description={
//                     "Bu yerda mahalliy mutahasisslar qilgan ishlari yi'gilgan bo'lib, siz ularni pulga yoki bepulga olib ishlatishingiz mumkin."
//                 }
//             />
//             <WebsitesProductsByCategory data={data} />
//         </PageContainer>
//     );
// }
