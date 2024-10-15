import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { Modal, Tooltip, Input } from 'antd';
import Axios from 'axios'
import { baseUrl } from '~/reositoriy-admin/Repository';


const VideoFirstPosts = ({
    setliveProduct,
    setLivePosterFile,
    setLoading,
    setOpenFile,
    

}) => {
    const { user } = useSelector((state) => state.auth);
    const [videosize, setVideoSize] = useState(null);


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
            await uploadVideoFirst(selectedFile);
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

    const uploadVideoFirst = async (file) => {
        const formData = new FormData();
        formData.append('file', file); // Faylni formData ga qo'shish
        const endPoint = 'video-file-create/'

        try {
            setLoading(true)
            const response = await Axios.post(baseUrl + endPoint, formData, {
                headers: {
                    Authorization: `Bearer ${user?.access}`,
                },
            });

            setLivePosterFile(response.data);

        } catch (error) {
            Modal.error({
                centered: true,
                title: 'Xatolik!',
                footer: null,
                content: <div>
                    <p> {
                        `Xatolik yuz berdi: ${error.message}`
                    }</p>
                    <div className='d-flex justify-content-end'>
                        <button
                            onClick={() =>
                            (setliveProduct(null),
                                Modal.destroyAll())
                            }
                            className='btn btn-success fs-5 rounded-5 px-4'>
                            <i className="fa-solid fa-rotate fa-spin  mr-1"></i> Qayta yuklash</button>
                    </div>
                </div>,
            });
        }
        finally {
            setLoading(false)
            setOpenFile(false);
        }
    };


    // getVideoFunk 

    useEffect(() => {
        if (user?.access) {
            getVideoFunk();
        }
    }, [user?.access]);


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
                                <i className="fa-solid fa-upload fa-4x text-success"></i>
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