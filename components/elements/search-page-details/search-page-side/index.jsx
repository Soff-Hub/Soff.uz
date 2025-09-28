import { useFGet } from "~/shared/hooks/useFApi";
import LastAddedProductCard from "../search-page-card/lastAddedProductCard"
import LastAddedServiceCard from "../search-page-card/lastAddedServiceCard";

const SerachSide = ({ lastProducts, createBtn }) => {
    const { data, isLoading } = useFGet(
        'top-services',
        'customer/popular-services?limit=6'
    );


    return (
        <div className='forAdds p-5'>
            {data?.items &&
                <h3
                    style={{
                        fontSize: '20px',
                        fontWeight: 400,
                    }}
                    className='similar_title'>
                    Ommabop xizmatlar
                </h3>
            }

            {data?.items?.map(s => 
                <div className="mb-4" key={s?.id}>
                    <LastAddedServiceCard service={s}/>
                </div>
            )}
            <div className='d-flex justify-content-center mb-3'>
                {createBtn()}
            </div>
            {lastProducts?.results &&
                <h3
                    style={{
                        fontSize: '20px',
                        fontWeight: 400,
                        borderTop: "1px solid rgba(0,0,0,0.2)",
                        paddingTop: "10px"
                    }}
                    className='similar_title'>
                    So'ngi yuklangan mahsulotlar
                </h3>
            }
            {lastProducts?.results?.map((p, i) =>
                <div className='mb-4' key={i}>
                    <LastAddedProductCard
                        product={p} />
                </div>
            )}
        </div>
    )
}

export default SerachSide