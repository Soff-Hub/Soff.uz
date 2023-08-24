import Repository, { baseUrl, serializeQuery } from './Repository';

class PostRepo {
    // constructor(callback) {
    //     this.callback = callback;
    // }

    async getWishlistPost(payload) {
        const token = localStorage.getItem('token')
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }
        const reponse = await Repository.post(
            `${baseUrl}customer/wishlist-create/`,
            payload,
            config
        )
            .then((response) => {
                return response;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }
}

export default new PostRepo();
