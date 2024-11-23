export const config = {
    api: {
        bodyParser: false, // Formidable bilan ishlash uchun bodyParser o'chiriladi
    },
};

export default async function handler(req, res) {
    res.status(200).json({
        success: true,
    });
}
