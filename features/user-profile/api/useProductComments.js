import { useQuery } from "@tanstack/react-query"
import { api } from "~/repositories/api"
import { PRODUCT_COMMENTS } from "~/shared/api/end-points"

export const useProductComments = (id, limit = 10) => {
    return useQuery({
        queryKey: ["product-comments", id, limit],
        queryFn: async () => {
            const { data } = await api.get(`${PRODUCT_COMMENTS}${id}?limit=${limit}&offset=0`)
            return data
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
        keepPreviousData: true,
        cacheTime: 1000 * 60 * 10,
    })
}
