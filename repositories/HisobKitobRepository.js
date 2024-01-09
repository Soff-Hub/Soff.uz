import Repository, { baseUrl } from "./Repository"


class HisobKitobRepository {
    async getCardData(){
        const endPoint = ''
        const respons = await Repository.get(baseUrl + endPoint)
        .then((respons) => {
            if (respons.data) {
                return respons.data
            }
        })
        .catch((err) => {
            return null
        })
        return respons
    }
}

export default new HisobKitobRepository()