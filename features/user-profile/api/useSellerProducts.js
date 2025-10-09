import { useQuery } from '@tanstack/react-query'
import { api } from '~/repositories/api'
import { SELLER_PRODUTS } from '~/shared/api/end-points'

export const useSellerProducts = (id, page = 1, type = 'file') => {
    return useQuery({
        queryKey: ['seller-products', id, page, type],
        queryFn: async () => {
            const res = await api.get(`${SELLER_PRODUTS}${id}/?page=${page}&type=${type}`)
            return res.data
        },
        enabled: !!id,
        keepPreviousData: true,
        staleTime: 1000 * 60 * 5,
    })
}
