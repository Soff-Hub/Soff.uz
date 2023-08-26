import axios from 'axios';
const baseDomain = 'http://alldataaa.pythonanywhere.com/api/v1/seller/'; 


export const baseUrl = `${baseDomain}`;

export default axios.create({
    baseUrl,
    headers: {
        "Authorization":`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkzODI5MjE5LCJpYXQiOjE2OTI5NjUyMTksImp0aSI6IjgxZWViNWRiOGJjNTQxZGNhZTQxNjNmNGRjNDk5NzcyIiwidXNlcl9pZCI6NTV9.gSRpAub09OEd6-AO0698n426Uf3hRAA_C4vSrZ1ui8g`
    }
    
});
