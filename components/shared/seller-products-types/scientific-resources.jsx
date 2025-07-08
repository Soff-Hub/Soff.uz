import RedesignProduct from '~/components/elements/products/Redesign/Redesign-Product';

export default function ScientificResources (product) {
    const data = product?.data?.file;

    console.log('ScientificResources', data);

    return (
        <div className='sellerpage'>
            {product && (
                <>
                    <div className='sellerpageTitleBox'>
                        <p className='sellerpageTitle'>Ilmiy ishlar</p>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='8'
                            height='10'
                            viewBox='0 0 8 10'
                            fill='none'>
                            <path
                                d='M1.875 1.5L6.12488 4.63195L2 8.5'
                                stroke='#312F30'
                                stroke-width='2'
                                stroke-linecap='round'
                            />
                        </svg>
                    </div>
                    <div className='scientificResourcesWrap'>
                        {data?.map((item, index) => (
                            <div className='' key={index}>
                                <RedesignProduct product={item} />
                            </div>
                        ))}
                    </div>
                </>
            )}
            {product?.length + 1 < 8 && (
                <div className='showMoreBox'>
                    <p className='showMore'>Yana ko’rsatish</p>
                </div>
            )}
        </div>
    );
}
