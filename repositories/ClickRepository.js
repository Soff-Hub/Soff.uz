import Repository, { baseUrl } from './Repository';

class ClickRepository {
  
    async postClick(data,payload) {
        const endPoint = `seller/click/`;
        const reponse = await Repository.post(`${baseUrl}${endPoint}`, data, payload)
            .then((response) => {
                return response
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

}

export default new ClickRepository();
