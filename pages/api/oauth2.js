// pages/api/oauth2.js

import { baseUrlProfie } from '~/reositoriy-admin/Repository';
import { decryptEmail } from '~/utilities/shifr';

export default async function handler(req, res) {
    const { method } = req;
    const KEYWORD = process.env.NEXT_PUBLIC_KEYWORD;

    if (method === 'POST') {
        const allowedOrigin = [
            'http://localhost:2024',
            'http://localhost:2024/oauth',
        ]; // O'z domeningiz
        const origin = req.headers.referer;

        const shifredEmail = req.headers?.['content-origin'];

        // Originni tekshirish
        if (!allowedOrigin.includes(origin)) {
            return res.status(404).json({ error: 'Not Found' });
        }

        if (!req.body?.email && !shifredEmail) {
            return res.status(400).json({ error: 'Email is required' });
        }

        // Shifrlangan emailni deshifrlash
        const decryptedEmail = decryptEmail(shifredEmail, KEYWORD);
        if (decryptedEmail !== req.body?.email) {
            return res.status(400).json({ error: 'Access Denied!!!' });
        }

        // Yangi API ga yuborish
        try {
            const response = await fetch(
                `${baseUrlProfie}auth/google-login/customer`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: decryptedEmail, // Shifrlangan emailni yuborish
                    }),
                }
            );

            // Javobni tekshirish
            if (!response.ok) {
                const errorData = await response.json();
                return res.status(response.status).json({ error: errorData });
            }

            const data = await response.json();
            res.status(200).json(data);
        } catch (error) {
            // console.log(error);
            res.status(500).json({
                error: 'Server xatosi: ' + error.message,
            });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${method} not allowed`);
    }
}
