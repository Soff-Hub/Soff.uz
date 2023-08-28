import axios from 'axios';
const baseDomain = 'http://alldataaa.pythonanywhere.com/api/v1/seller/'; 


export const baseUrl = `${baseDomain}`;

export default axios.create({
    baseUrl,
    headers: {

        "Authorization":`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk0MDgzOTUzLCJpYXQiOjE2OTMyMTk5NTMsImp0aSI6IjNkYjAxNDA1NGJkNDRhMDZiYWRmOTM0YjdiNTI0OWVjIiwidXNlcl9pZCI6OTh9.A2bpoAH4MuDls_5pzic4uezdFUK7JlkrxBBZcAGAlAU`
    }
    
});
