import React from 'react'

function Description({ description }) {
    
    return (
        <div className='ps-product__thumbnail_seller_secound product-description'>
            <h3 style={{
                fontSize: "25px",
                fontWeight: 500,
                lineHeight: "37.5px",
                color: "#312F30",
                marginBottom: "30px"
            }} >Mahsulot tavsifi</h3>

            {
                description?.length > 0 ? (
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                ) : (
                    <div className="text-center">
                        <img
                            src='/static/img/noinfo.svg  '
                            alt="Batafsil ma'lumot yo'q"
                            width="35%"
                        />
                        <p>Hozircha muallif ushbu mahsuloti uchun tavsif qo‘shmagan.</p>
                    </div>
                )
            }
        </div>
    )
}

export default Description