import React from 'react'
import { GetProducts } from '~/features/search/products/api/get-products'
import { GetServices } from '~/features/search/services/api/get-services'
import { GetSpecialists } from '~/features/search/specialists/api/get-specialists'

const SearchPage = () => {
    return (
        <div>SearchPage</div>
    )
}

export default SearchPage


export async function getServerSideProps(ctx) {
    const { tab = "products", keyword = '', page = 1, limit = 20, offset = 0 } = ctx.query

    let initialdata = null
    if (tab === "products") {
        initialdata = await GetProducts({ keyword, page })
    } else if (tab === 'services') {
        initialdata = await GetServices({ keyword, limit, offset })
    } else if (tab === 'specialists') {
        initialdata = await GetSpecialists({ keyword, limit, offset })
    }
    console.log("initialdata", initialdata)

    return {
        props: {
            tab,
            keyword,
            page,
            limit,
            offset,
            initialdata
        }
    }
}