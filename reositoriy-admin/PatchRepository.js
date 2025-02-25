import Repository, { baseUrlCustomer} from './Repository';

class PatchRepository {

    async patchDealUpdateApplicaitonCommit(id, data, token) {
        const endPoint = `seller/document-review/${id}`;
        const reponse = await Repository({
            url: baseUrlCustomer + endPoint,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        })
            .then((response) => {
                if (response.status === 201) {
                    return response;
                } else {
                    return null;
                }
            })
            .catch((error) => error.response);
        return reponse;
    }

    async patchDealUpdateApplicaitonStatus(id, data, token) {
        const endPoint = `deals/application-status/${id}`;
        const reponse = await Repository({
            url: baseUrlCustomer + endPoint,
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        })
            .then((response) => {
                if (response.status === 200) {
                    return response;
                } else {
                    return null;
                }
            })
            .catch((error) => error.response);
        return reponse;
    }

}

export default new PatchRepository();
