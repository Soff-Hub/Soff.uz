import { useQuery } from '@tanstack/react-query'
import { api } from '~/repositories/api'
import { SELLER_PRODUCTS } from '~/shared/api/end-points'

export const useSellerProducts = (id, page = 1, type = 'file', search = '', onlySubscription = false) => {
    return useQuery({
        queryKey: ['seller-products', id, page, type, search, onlySubscription],
        queryFn: async () => {
            const params = { page, type, search }
            if (onlySubscription) params.in_platform_sub = 'true'
            const query = new URLSearchParams(params).toString()
            const res = await api.get(`${SELLER_PRODUCTS}${id}/?${query}`)
            return res.data
        },
        enabled: !!id,
        keepPreviousData: true,
        staleTime: 1000 * 60 * 5,
    })
}