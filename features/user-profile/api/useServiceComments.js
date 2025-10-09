import { useInfiniteQuery } from "@tanstack/react-query"
import { SERVICE_COMMENTS } from "~/shared/api/end-points"
import axiosInstance from "~/shared/api/freeleanceApi"

export const useServiceComments = (id) => {
    const axios = axiosInstance()

    return useInfiniteQuery({
        queryKey: ["service-comments", id],
        queryFn: async ({ pageParam = 1 }) => {
            const { data } = await axios.get(`${SERVICE_COMMENTS}?user_id=${id}&page=${pageParam}`)
            return data
        },
        getNextPageParam: (lastPage, allPages) => {
            const total = lastPage.total || 0
            const loaded = allPages.flatMap(p => p.items).length
            return loaded < total ? allPages.length + 1 : undefined
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
    })
}