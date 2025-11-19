import { v4 as uuidv4 } from 'uuid';
import * as cookie from 'cookie';

export function getOrCreateDeviceId({ req, res } = {}) {
    try {
        const cookies = cookie.parse(req.headers.cookie || '');
        let deviceId = cookies.device_id;

        if (!deviceId) {
            deviceId = uuidv4();
            res.setHeader(
                'Set-Cookie',
                cookie.serialize('device_id', deviceId, {
                    path: '/',
                    maxAge: 365 * 24 * 60 * 60, // 1 year
                })
            );
        }

        return deviceId;
    } catch (error) {
        console.error('Error getting or creating device ID:', error);
        return null;
    }
}
