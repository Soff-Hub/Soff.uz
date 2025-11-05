import LastAddedProductCard from '../search-page-card/lastAddedProductCard';
import LastAddedServiceCard from '../search-page-card/lastAddedServiceCard';
import { Skeleton } from 'antd';

const SerachSide = ({
    createBtn,
    topServices,
    topServicesLoading,
    lastProducts,
    lastProductsLoading,
}) => {
    let topServicesContent = null;
    if (topServicesLoading) {
        topServicesContent = (
            <>
                {Array(12)
                    .fill(0)
                    .map((_, i) => (
                        <Skeleton
                            key={i}
                            active
                            className="Search_Results_Wrap_skeleton"
                        />
                    ))}
            </>
        );
    } else if (topServices?.items?.length) {
        topServicesContent = (
            <>
                <h3
                    style={{
                        fontSize: '20px',
                        fontWeight: 400,
                    }}
                    className="similar_title">
                    Tavsiya etiladigan xizmatlar
                </h3>
                {topServices?.items?.map((s) => (
                    <div className="mb-4" key={s?.id}>
                        <LastAddedServiceCard service={s} />
                    </div>
                ))}
            </>
        );
    }

    let lastProductsContent = null;
    if (lastProductsLoading) {
        lastProductsContent = (
            <>
                {Array(12)
                    .fill(0)
                    .map((_, i) => (
                        <Skeleton
                            key={i}
                            active
                            className="Search_Results_Wrap_skeleton"
                        />
                    ))}
            </>
        );
    } else if (lastProducts?.results?.length) {
        lastProductsContent = (
            <>
                {lastProducts?.results && (
                    <h3
                        style={{
                            fontSize: '20px',
                            fontWeight: 400,
                            borderTop: '1px solid rgba(0,0,0,0.2)',
                            paddingTop: '10px',
                        }}
                        className="similar_title">
                        So'ngi yuklangan mahsulotlar
                    </h3>
                )}
                {lastProducts?.results?.map((p, i) => (
                    <div className="mb-4" key={i}>
                        <LastAddedProductCard product={p} />
                    </div>
                ))}
            </>
        );
    }

    return (
        <div className="forAdds p-5">
            {topServicesContent}
            <div className="d-flex justify-content-center mb-3">
                {createBtn()}
            </div>
            {lastProductsContent}
        </div>
    );
};

export default SerachSide;
