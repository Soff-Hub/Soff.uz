import axios from 'axios';
const baseDomain = 'http://allldataaa.pythonanywhere.com/api/v1/seller/'; 


export const baseUrl = `${baseDomain}`;

export default axios.create({
    baseUrl,

    headers: {
        "Authorization":`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk0MDkwNDAxLCJpYXQiOjE2OTMyMjY0MDEsImp0aSI6ImIxZGE4MTUwNjZkNTQ1M2Y5YzIyYzNkYzhjOGYxZGVkIiwidXNlcl9pZCI6OTh9.FA1PO-FzORGRY2a4vrqEY9sn7blGBIndSTiBAgf3BDo`
    }
    
});
