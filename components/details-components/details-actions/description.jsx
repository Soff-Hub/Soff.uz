import React from 'react'

function Description({ description }) {
    return (
        <div className='ps-product__thumbnail_seller_secound'>
            <h3 style={{
                fontSize: "25px",
                fontWeight: 500,
                lineHeight: "37.5px",
                color: "#312F30",
                marginBottom: "30px"
            }} >Mahsulot tavsifi</h3>

            <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
    )
}

export default Description