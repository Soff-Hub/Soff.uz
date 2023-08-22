import Repository, { baseUrl } from "./Repository";

class DeleteRepositoriyLists {
    async getUsersListsDelete(id) {
        const endPoint = `admin/customer-list/${id}/`;
        const reponse = await Repository.delete(baseUrl+endPoint)
            .then((response) => {
                if (response.status===200) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }
    async getCategoryDelete(id) {
        const endPoint = `admin/category-list/${id}/`;
        const reponse = await Repository.delete(baseUrl+endPoint)
            .then((response) => {
                if (response.status===200) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }
}
export default new DeleteRepositoriyLists();
