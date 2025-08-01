import React, { useState, useCallback } from 'react';
import { Upload, Button, Slider, message } from 'antd';
import Cropper from 'react-easy-crop';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import 'react-easy-crop/react-easy-crop.css';

const ImageCropper = ({form}) => {
    const [image, setImage] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [aspect, setAspect] = useState(4 / 3);
    const [showCropper, setShowCropper] = useState(true); // Cropper ko'rinishini boshqarish

    // Rasmni kesish jarayonida ma'lumotlarni saqlash
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    // Rasmni canvas orqali kesish
    const createCroppedImage = async (imageSrc, pixelCrop, rotation = 0) => {
        const image = new Image();
        image.src = imageSrc;
        await new Promise((resolve) => {
            image.onload = resolve;
        });

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const maxSize = Math.max(image.width, image.height);
        const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

        canvas.width = safeArea;
        canvas.height = safeArea;

        ctx.translate(safeArea / 2, safeArea / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.translate(-safeArea / 2, -safeArea / 2);

        ctx.drawImage(image, safeArea / 2 - image.width / 2, safeArea / 2 - image.height / 2);

        const data = ctx.getImageData(0, 0, safeArea, safeArea);
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        ctx.putImageData(data, Math.round(0 - safeArea / 2 + image.width / 2 - pixelCrop.x), Math.round(0 - safeArea / 2 + image.height / 2 - pixelCrop.y));

        return new Promise((resolve) => {
            canvas.toBlob(
                (blob) => {
                    resolve(blob);
                },
                'image/jpeg',
                0.95 // Sifatni optimallashtirish
            );
        });
    };

    // Rasmni kesib olish va backendga yuborish
    const handleCrop = async () => {
        try {
            const croppedImageBlob = await createCroppedImage(image, croppedAreaPixels, rotation);
            setCroppedImage(URL.createObjectURL(croppedImageBlob));
            setShowCropper(false); // Cropperni yashirish

            // Backendga yuborish
            const formData = new FormData();
            formData.append('file', croppedImageBlob, 'cropped-image.jpg');
            
            // Backend API endpoint'ini o'zingizga moslashtiring
            const response = await axios.post('http://176.96.241.219:8005/api/v1/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            message.success('Rasm muvaffaqiyatli yuborildi!');
            form.setFieldsValue({ poster: response.data.url });
        } catch (error) {
            message.error('Xatolik yuz berdi!');
        }
    };

    // Yangi rasm yuklashda cropperni qayta ko'rsatish
    const handleNewUpload = () => {
        setImage(null);
        setCroppedImage(null);
        setShowCropper(true);
        setZoom(1);
        setRotation(0);
        setCrop({ x: 0, y: 0 });
    };

    // Upload komponenti uchun sozlamalar
    const uploadProps = {
        beforeUpload: (file) => {
            const isImage = file.type.includes('image');
            if (!isImage) {
                message.error('Faqat rasm fayllarini yuklash mumkin!');
                return false;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
                setShowCropper(true); // Yangi rasm yuklanganda cropper ko'rinadi
                setCroppedImage(null); // Oldingi kesilgan rasmni o'chirish
            };
            reader.readAsDataURL(file);
            return false; // Avtomatik yuklashni to'xtatish
        },
        showUploadList: false,
        accept: "image/*"
    };

    return (
        <div style={{ margin: '0 auto' }}>
            <Upload {...uploadProps} style={{ width: '100%', height: "45px" }}>
                <Button style={{width: '100%',  height: "45px"}} icon={<UploadOutlined />} onClick={handleNewUpload}>
                    {croppedImage ? 'Yangi rasm tanlash' : 'Rasm tanlash'}
                </Button>
            </Upload>

            {image && showCropper && (
                <div style={{ marginTop: '20px' }}>
                    <div
                        style={{
                            position: 'relative',
                            width: '100%',
                            height: '400px',
                            border: '2px solid #d9d9d9',
                            borderRadius: '8px',
                            overflow: 'hidden',
                        }}
                    >
                        <Cropper
                            image={image}
                            crop={crop}
                            zoom={zoom}
                            rotation={rotation}
                            aspect={aspect}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onRotationChange={setRotation}
                            onCropComplete={onCropComplete}
                            cropShape="rect"
                            showGrid={true}
                        />
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <h4>Zoom</h4>
                        <Slider
                            min={1}
                            max={10}
                            step={0.1}
                            value={zoom}
                            onChange={(value) => setZoom(value)}
                        />
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <h4>Burish (gradus)</h4>
                        <Slider
                            min={0}
                            max={360}
                            step={1}
                            value={rotation}
                            onChange={(value) => setRotation(value)}
                        />
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <h4>Nisbat</h4>
                        <Button.Group>
                            <Button onClick={() => setAspect(4 / 3)}>4:3</Button>
                            <Button onClick={() => setAspect(1 / 1)}>1:1</Button>
                            <Button onClick={() => setAspect(16 / 9)}>16:9</Button>
                        </Button.Group>
                    </div>

                    <Button
                        type="primary"
                        onClick={handleCrop}
                        style={{ marginTop: '20px', width: '100%' }}
                    >
                        yuklash
                    </Button>
                </div>
            )}

            {croppedImage && (
                <div style={{ marginTop: '20px' }}>
                    <img
                        src={croppedImage}
                        alt="Cropped"
                        style={{ width: '100%', maxHeight: '500px', borderRadius: '8px' }}
                    />
                </div>
            )}
        </div>
    );
};

export default ImageCropper;