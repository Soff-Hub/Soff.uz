import axios from 'axios';
const baseDomain = 'http://alldataaa.pythonanywhere.com/api/v1/seller/'; 


export const baseUrl = `${baseDomain}`;

export default axios.create({
    baseUrl,

    // headers: {
    //     "Authorization":`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk0MTgwMDk1LCJpYXQiOjE2OTMzMTYwOTUsImp0aSI6Ijg4YzgyZTViMDk5ODRhY2VhNmU4MGYyMzc4MTZjNmZkIiwidXNlcl9pZCI6NTV9.nOxHOHJgnw1DwJ5SpJ4nXT0dPCcDF2Mkdu8xAOpIcQE`
    // }





    
});
