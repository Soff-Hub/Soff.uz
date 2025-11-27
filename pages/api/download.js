import axios from 'axios';

export default async function handler(req, res) {
    try {
        const fileUrl = req.query.url;

        if (!fileUrl) {
            return res.status(400).json({ error: 'Missing URL' });
        }

        const response = await axios.get(fileUrl, {
            responseType: 'arraybuffer',
        });

        const filename = fileUrl.split('/').pop().split('?')[0] || 'file';

        // Set headers to FORCE download
        res.setHeader(
            'Content-Type',
            response.headers['content-type'] || 'application/octet-stream'
        );
        res.setHeader(
            'Content-Disposition',
            `attachment; filename="${filename}"`
        );

        res.status(200).send(response.data);
    } catch (error) {
        console.error('Download error:', error.message);
        res.status(500).json({ error: 'Unable to download file' });
    }
}
