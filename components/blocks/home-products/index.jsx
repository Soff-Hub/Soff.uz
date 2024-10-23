import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import FileCard from '~/components/product/file/FileCard'

export default function HomeProducts() {
    const [data, setData] = useState([])

    const getf = async () => {
        const resp = await Axios.get('https://api.soff.uz/api/v1/customer/similar/psixologiya-psixologiyada-eksperiment-metodi-2/')
        setData(resp.data)
    }

    useEffect(() => {
        // getf()
    }, [])

    return (
        <div className='products'>
            <div className="container">
                <div className="product-list">
                    {
                        data.map(el => <FileCard key={el.id} {...el} />)
                    }
                </div>
            </div>
        </div>
    )
}
