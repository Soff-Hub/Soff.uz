import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PostsRepository from '~/reositoriy-admin/PostsRepository';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { Modal, Tooltip, Input } from 'antd';
import Axios from 'axios'

const VideoFirstPosts = ({
    setliveProduct,
    setLivePosterFile,

}) => {
    const { user } = useSelector((state) => state.auth);
    const [videosize, setVideoSize] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    // Video Ta'riflarini olib kelish uchun getFunksiya

    async function getVideoFunk() {
        const ItemsData = await GetRepository.getVideoSize(user?.access);
        if (ItemsData) {
            setVideoSize(ItemsData);
        }
    }


    //   Inputdagi qiymat olinadi va funksiyalarga qiymat beriladi
    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        const fileSizeMB = Math.ceil(selectedFile.size / 1024 / 1024);
        if (fileSizeMB < videosize?.empty_storage_size) {
            const videoURL = window.URL.createObjectURL(selectedFile);
            setliveProduct({ name: selectedFile.name, video: videoURL });
            setLivePosterFile('');
            await handleUpload(selectedFile);
        } else {
            showWarningModal();
        }
    };

    //  Agar xatirasi yetmasi chiqadiga modal
    const showWarningModal = () => {
        Modal.warning({
            centered: true,
            title: 'Ogohlantirish!',
            footer: null,
            content: (
                <div>
                    <p>{videosize?.empty_storage_size} MB dan katta hajmli Video yuklay olmaysiz!</p>
                    <p>Agar qo'shimcha joy sotib olishni istasangiz Xotira sotib olish tugmasiga bosing!</p>
                    <div className="d-flex justify-content-end gap-3 align-items-center">
                        <p className="btn btn-secondary fs-5 m-0 rounded-4" onClick={() => Modal.destroyAll()}>Yopish</p>
                        <p className="btn btn-success fs-5 m-0 rounded-4" style={{ cursor: 'pointer' }} onClick={() => {
                            Router.push('/account/buying_traffic');
                            Modal.destroyAll();
                        }}>Sotib olish</p>
                    </div>
                </div>
            ),
        });
    };

    // Asosiy vidoeni post qilish

    const uploadChunk = async (chunk, totalChunks, uploadId) => {
        const formData = new FormData();
        formData.append('chunk', chunk); // Chunkni formData ga qo'shish

        // Agar upload_id mavjud bo'lsa, qo'shib yuborish
        if (uploadId) {
            formData.append('upload_id', uploadId);
        }

        try {
            const response = await Axios.post('http://192.168.1.26:8000/api/v1/seller/video-file-create/', formData, {
                headers: {
                    Authorization: `Bearer ${user?.access}`,
                },
                onUploadProgress: (progressEvent) => {
                    const progress = (progressEvent.loaded / progressEvent.total) * 100; // Yuklash progressini hisoblash
                    setUploadProgress((prev) => prev + progress / totalChunks); // Umumiy progressni yangilash
                },
            });

            // Agar birinchi chunk yuborilgan bo'lsa, upload_id ni saqlash
            if (!uploadId) {
                uploadId = response.data.upload_id; // upload_id ni birinchi chunkdan olish
            }

            return uploadId; // upload_id ni qaytarish
        } catch (error) {
            console.error('Error uploading chunk:', error);
            throw error; // Xatoni tashlash
        }
    };

    // Inputdan qaytgan videoni bo'laklarga bo'lish

    const handleUpload = async (file) => {
        const chunkSize =  1024; // 
        const totalChunks = Math.ceil(file.size / chunkSize);
        let uploadId = null; // upload_id ni saqlash uchun

        
        // Har bir chunkni yuklash
        for (let i = 0; i < totalChunks; i++) {
            const start = i * chunkSize;
            const end = Math.min(start + chunkSize, file.size);
            const chunk = file.slice(start, end); // Faylni chunkga bo'lish

            try {
                uploadId = await uploadChunk(chunk, totalChunks, uploadId); // Chunkni yuborish va upload_id ni olish
            } catch (error) {
                console.error('Error during upload:', error);
                break; // Agar xato yuz bersa, siklni to'xtatish
            }

            // Agar upload_id yo'q bo'lsa, davom ettirmaslik
            if (!uploadId) {
                console.error('Upload ID is missing, stopping upload.');
                break;
            }
        }

        setUploadProgress(100); // Yuklash tugagach progressni 100% qilish
    };


    // getVideoFunk 

    useEffect(() => {
        if (user?.access) {
            getVideoFunk();
        }
    }, [user?.access]);


    console.log(uploadProgress);

    return (
        <div className="container " >
            <div className='border rounded-5 bg-white my-5 pb-4' >
                <div className='p-4 border-bottom'>
                    <div className='d-flex align-items-center gap-3'>
                        <h3 className='m-0'>Video yuklash</h3>
                        <Tooltip title="Mijozlar to’lov qiglanidan so’ng, ko'rishi mumkin bo’lgan video. Mahsulotingiz quyidagi turdagi video bo’lishi mumkin: .mp4 , .mov , .avi">
                            <i
                                style={{
                                    cursor: 'pointer',
                                    fontSize: '20px'
                                }}
                                className="fa-regular fa-circle-question "></i>
                        </Tooltip>
                    </div>
                </div>

                <div
                    className="d-flex align-items-center justify-content-between p-4"

                >
                    <div
                        className='d-flex
                    flex-column
                     justify-content-center
                      align-items-center
                      w-100
                      pt-5
                        '
                    >

                        <label
                            className='bg-body-secondary
                         border-0 d-flex align-items-center justify-content-center'
                            style={{
                                width: '140px',
                                height: '140px',
                                padding: '10px 15px',
                                boxSizing: 'border-box',
                                textAlign: 'center',
                                cursor: 'pointer',
                                borderRadius: "50%"
                            }}
                        >

                            <span>
                                <i class="fa-solid fa-upload fa-4x text-success"></i>
                            </span>
                            <Input
                                accept="video/*"
                                onChange={handleFileChange}
                                type='file'
                                style={{
                                    position: 'absolute',
                                    width: '1px',
                                    height: '1px',
                                    overflow: 'hidden',
                                    clip: 'rect(0, 0, 0, 0)',
                                    border: '0'
                                }}
                            />
                        </label>

                        <span className='mb-1 mt-4 fw-bold fs-3 text-center'>Yuklanadigan videolarni shu yerga tashlang</span>
                        <p className='text-center'>Videolaringiz chop etilguniga qadar yopiq sifatida turadi</p>
                        <label
                            style={{
                                borderRadius: "30px",
                                fontSize: "16px",
                                padding: "11px 30px"

                            }}
                            className='btn btn-outline-success    mt-4 '

                        >
                            <span className='fw-medium'>Fayllarni tanlang </span>
                            <Input
                                accept="video/*"
                                onChange={handleFileChange}
                                type='file'
                                style={{
                                    position: 'absolute',
                                    width: '1px',
                                    height: '1px',
                                    overflow: 'hidden',
                                    clip: 'rect(0, 0, 0, 0)',
                                    border: '0'
                                }}
                            />
                        </label>
                        <p className='m-0 mt-4 text-center'>
                            Mijozlar to’lov qiglanidan so’ng, ko'rishi mumkin bo’lgan video. Mahsulotingiz quyidagi turdagi video bo’lishi mumkin: .mp4 , .mov , .avi
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default VideoFirstPosts