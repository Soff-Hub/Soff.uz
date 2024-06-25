import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { baseUrl } from '~/repositories/Repository';

const Progress = ({
    setDocument,
    accept,
    setLoading,
    inputText,
    loadingText,
    content_type,
}) => {



    const { user } = useSelector((state) => state.auth);
    const formRef = useRef(null);
    const fileInputRef = useRef(null);
    const [inputName, setInputName] = useState('')
    const [loaded, setLoaded] = useState('')
    const [fileTotals, setFileTotal] = useState('')
    const [total, setTotal] = useState(1)
    const [totalLoad, setTotaLoad] = useState(0)
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);
    const [loading, setLoading2] = useState(false);

    function handleProgress() {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    function onChange(e) {
        const file = e.target.files[0];
        if (file) {
            let fileName = file.name;
            if (fileName.length >= 42) {
                let splitName = fileName.split(".");
                fileName = splitName[0].substring(0, 42) + "... ." + splitName[1];
            }
            uploadFile(fileName, file);
        }
    };


    function uploadFile(name, file) {
        setInputName(name)
        setLoading2(true)
        setLoading(true)
        let xhr = new XMLHttpRequest();
        xhr.open(
            "POST",
            baseUrl + "seller/product-create-first/"
        );
        xhr.setRequestHeader("Authorization", `Bearer ${user.access}`);
        xhr.upload.addEventListener("progress", ({ loaded, total }) => {
            setTotal(total);
            setTotaLoad(loaded)
            let fileLoaded = Math.floor((loaded / total) * 100);
            setLoaded(fileLoaded)
            let fileTotal = Math.floor(total / 1024);
            setFileTotal(fileTotal)
        });

        xhr.onload = function () {
            setLoading(false);
            setLoading2(false);

            if (xhr.status === 201) {
                let response = JSON.parse(xhr.responseText);
                setDocument(response);
                setStatus(xhr.status)
            } else {
                let error = xhr.responseText;
                setError(error);
                setStatus(xhr?.status);
                setLoading(false);
                setLoading2(false);
            }
        };

        let formData = new FormData();
        formData.append('file', file);
        formData.append("content_type", content_type);
        xhr.send(formData);
        console.log(xhr);
    }

    console.log(status);
    console.log(error);


    return (
        <div className="wrapper bg-white">


            <form ref={formRef} action="#" onClick={handleProgress}
                className={!loading ? "form" : "form form_border"} >
                {
                    !loading ?
                        <>
                            <input name="file" type="file" onChange={(e) => onChange(e)} className="file-input"
                                hidden ref={fileInputRef}
                                accept={accept}
                            />
                            <i className="fas fa-cloud-upload-alt"></i>
                            <p className='mt-2 text-truncate w-100 px-3 text-center'>{inputText}</p>
                        </> :
                        <div className='d-flex align-items-center gap-3 '>
                            <div className="spinner-border spnniers" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p> {loadingText}</p>
                        </div>

                }
            </form>

            <section className="progress-area">
                {
                    (totalLoad !== total && inputName) ?
                        <li class="row_cols">
                            <i class="fas fa-file-alt"></i>
                            <div class="content">
                                <div class="details">
                                    <span class="name">{inputName}   <span className='text-primary mx-3'>Yuklanmoqda...</span> </span>
                                    <span class="percent">{loaded}% </span>
                                </div>
                                <div class="progress-bar">
                                    <div class="progress" style={{ width: loaded + "%" }} >
                                    </div>
                                </div>
                            </div>
                        </li>
                        : <></>
                }

            </section>

            <section className="uploaded-area">
                {
                    ((total == totalLoad) && (status === 201) && !loading) ?
                        <li className="row_cols">
                            <div className="content">
                                <i className="fas fa-file-alt"></i>
                                <div className="details">
                                    <span className="name ">{inputName}  <span className='text-success mx-3'>Yuklandi</span></span>
                                    <span className="size">{
                                        fileTotals < 1024
                                            ? (fileTotals + ' ' + "KB")
                                            : ((totalLoad / (1024 * 1024)).toFixed(2) + ' ' + "MB")

                                    }</span>
                                </div>
                            </div>
                            <i className="fas fa-check"></i>
                        </li> :
                        <p className='mt-0 text-danger'>
                            {error}</p>
                }
            </section>
        </div>
    )
}

export default Progress
