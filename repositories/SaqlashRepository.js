import Repository, { baseUrl } from './Repository';

class SaqlashRepository {

    async postWishlistData(id) {
        const endPoint = `customer/wishlist-create/`;
        const data = {
            'document' : id
        }
        const reponse = await Repository.post(`${baseUrl}${endPoint}`, data)
            .then((response) => {
                if (response.data) {
                    return response.data.results    
                } else {
                    return null;
                }
            })
            .catch((error) => {

                return null;
            });
        return reponse;
    }




}

export default new SaqlashRepository();
