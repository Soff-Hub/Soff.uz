import axios from 'axios';
const baseDomain = 'http://alldataaa.pythonanywhere.com/api/v1/seller/'; 


export const baseUrl = `${baseDomain}`;

export default axios.create({
    baseUrl,
    headers: {
        "Authorization":`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkzNTcwMTU2LCJpYXQiOjE2OTI3MDYxNTYsImp0aSI6IjRlZGY2YTRiNDdmMDRiZDZhMjhkMzRlYzNkZmI5MjM5IiwidXNlcl9pZCI6NTV9.oa-29nqMmts6oEgVgFp2IV3DOxxgK1OwDDSHx7706m8`
    }
    
});
