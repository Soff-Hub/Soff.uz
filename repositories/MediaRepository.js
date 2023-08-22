import Repository, { baseUrl } from './Repository';

class MediaRespository {

    async getBannersBySlug(payload) {
        const endPoint = `customer/banner/`;

        const reponse = await Repository.get(`${baseUrl}/${endPoint}`)
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

    async getTwoBannersData() {
        const endPoint = `customer/reklama/`;
        const reponse = await Repository.get(`${baseUrl}${endPoint}`)
            .then((response) => {
                if (response.data) {
                    console.log(response);
                    return response.data.results;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }

}

export default new MediaRespository();
