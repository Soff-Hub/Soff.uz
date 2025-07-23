import React from 'react'
import RedesignProduct from '~/components/elements/products/Redesign/Redesign-Product'
import PageContainer from '~/components/layouts/PageContainer'

const LastAddedProducts = ({lastAdded}) => {
    console.log(lastAdded)
    return (
        <div className='container'>
            <h3
                style={{
                    fontSize: '25px',
                    fontWeight: 600,
                }}
                className='py-4 similar_title'>
                So'ngi yuklangan mahsulotlar
            </h3>
            <div className='row'>
                {lastAdded?.results?.map((p, i) => (
                    <div className='col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4'>
                        <RedesignProduct product={p} key={i} /> 
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LastAddedProducts