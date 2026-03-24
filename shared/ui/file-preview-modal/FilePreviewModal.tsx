import React from 'react';
import { Modal, Button, Empty } from 'antd';
import { DownloadOutlined, CloseOutlined, EyeOutlined, LockOutlined, WarningOutlined } from '@ant-design/icons';
import { downloadFile } from '~/shared/utilities/utils';

interface FilePreviewModalProps {
    visible: boolean;
    onClose: () => void;
    fileUrl: string;
    fileName: string;
    canDownload?: boolean;
}

/**
 * FilePreviewModal component for premium and SECURE file previewing experience.
 * Implements multiple layers of protection to prevent unauthorized asset access in review mode.
 */
const FilePreviewModal: React.FC<FilePreviewModalProps> = ({
    visible,
    onClose,
    fileUrl,
    fileName,
    canDownload = true,
}) => {
    const ext = fileUrl?.split('.').pop()?.split('?')[0].toLowerCase() || '';

    // Advanced Clipping strategy: Increases based on viewer type
    // Office and Google Toolbar heights vary
    const clipAmount = !canDownload ? 76 : 0; 
    
    // Watermark style
    const watermarkStyle: React.CSSProperties = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(-30deg)',
        fontSize: '100px',
        fontWeight: 900,
        color: 'rgba(0, 0, 0, 0.04)', // Very subtle but visible when squinting or taking screenshots
        pointerEvents: 'none',
        zIndex: 50,
        whiteSpace: 'nowrap',
        userSelect: 'none',
        textTransform: 'uppercase',
        letterSpacing: '10px'
    };

    // Warning banner shown at the top when restricted
    const ProtectionBanner = !canDownload ? (
        <div style={{
            backgroundColor: '#fffbe6',
            border: '1px solid #ffe58f',
            padding: '12px 20px',
            marginBottom: '16px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: '#856404',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
            <WarningOutlined style={{ color: '#faad14', fontSize: '20px' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '15px', fontWeight: 600 }}>Ko'rib chiqish rejimi faol</span>
                <span style={{ fontSize: '13px', opacity: 0.85 }}>
                    Buyurtmani tasdiqlash uchun barcha fayllar bu yerda ko'rsatiladi. 
                    Natija sizni qoniqtirgach, "Ishni qabul qilish" tugmasini bosing va to'lov mutaxassisga o'tkaziladi. 
                    Shundan so'ng barcha fayllarni to'liq ko'chirib olishingiz mumkin.
                </span>
            </div>
        </div>
    ) : null;

    // Solid opaque cover for toolbar area when clipped
    const ToolbarCover = !canDownload ? (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '24px', // Opaque seal for the very top to prevent any toolbar slivers
            backgroundColor: '#ffffff',
            zIndex: 100,
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }} />
    ) : null;

    const getPreviewContent = () => {
        if (!fileUrl) return <Empty description="Fayl topilmadi" />;

        // PDF Preview
        if (ext === 'pdf') {
            return (
                <div 
                    style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid #f0f0f0', height: '78vh' }}
                    onContextMenu={!canDownload ? (e) => e.preventDefault() : undefined}
                >
                    {ToolbarCover}
                    {!canDownload && <div style={watermarkStyle}>SOFF.UZ REVIEW</div>}
                    <iframe
                        src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                        style={{ 
                            width: '100%', 
                            height: `calc(78vh + ${clipAmount}px)`, 
                            marginTop: `-${clipAmount}px`,
                            border: 'none',
                            backgroundColor: '#fff'
                        }}
                        title={fileName}
                    />
                </div>
            );
        }

        // Office Documents and others via Google Docs Viewer (More restrictive and cleaner)
        const documentExtensions = ['pptx', 'ppt', 'docx', 'doc', 'xlsx', 'xls', 'txt'];
        if (documentExtensions.includes(ext)) {
            const encodedUrl = encodeURIComponent(fileUrl);
            const viewerUrl = `https://docs.google.com/viewer?url=${encodedUrl}&embedded=true`;
            
            return (
                <div 
                    style={{ 
                        position: 'relative', 
                        borderRadius: '12px', 
                        overflow: 'hidden', 
                        border: '1px solid #f0f0f0', 
                        backgroundColor: '#fff',
                        height: '78vh'
                    }}
                    onContextMenu={!canDownload ? (e) => e.preventDefault() : undefined}
                >
                    {ToolbarCover}
                    {!canDownload && <div style={watermarkStyle}>SOFF.UZ REVIEW</div>}
                    <iframe
                        src={viewerUrl}
                        style={{ 
                            width: '100%', 
                            height: `calc(78vh + ${clipAmount + 10}px)`, 
                            marginTop: `-${clipAmount + 10}px`, // Google header is taller
                            border: 'none' 
                        }}
                        title={fileName}
                    />
                </div>
            );
        }

        // Image Preview
        const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'];
        if (imageExtensions.includes(ext)) {
            return (
                <div 
                    style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        height: '78vh', 
                        backgroundColor: '#fafafa',
                        borderRadius: '12px',
                        border: '1px solid #f0f0f0',
                        padding: '24px',
                        position: 'relative',
                        userSelect: 'none',
                        overflow: 'hidden'
                    }}
                    onContextMenu={!canDownload ? (e) => e.preventDefault() : undefined}
                >
                    {!canDownload && <div style={{ ...watermarkStyle, fontSize: '80px' }}>SOFF.UZ REVIEW</div>}
                    <img
                        src={fileUrl}
                        alt={fileName}
                        style={{ 
                            maxWidth: '100%', 
                            maxHeight: '100%', 
                            objectFit: 'contain', 
                            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                            borderRadius: '8px',
                            pointerEvents: !canDownload ? 'none' : 'auto'
                        }}
                    />
                </div>
            );
        }

        return (
            <div style={{ 
                height: '400px', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center',
                backgroundColor: '#fafafa',
                borderRadius: '12px'
            }}>
                <Empty 
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                        <span style={{ textAlign: 'center' }}>
                            Ushbu fayl turini ({ext.toUpperCase()}) preview qilib bo'lmaydi. <br/>
                            {canDownload 
                                ? 'Iltimos, faylni yuklab olib ko\'rib chiqing.' 
                                : <span style={{ color: '#ff4d4f', fontWeight: 600 }}>Ushbu faylni yuklab olish uchun buyurtmani yakunlang.</span>}
                        </span>
                    } 
                />
            </div>
        );
    };

    return (
        <Modal
            title={
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <EyeOutlined style={{ color: '#1890ff', fontSize: '18px' }} />
                    <span style={{ fontWeight: 700, fontSize: '16px' }}>{fileName}</span>
                    {!canDownload && (
                        <div style={{ 
                            backgroundColor: '#fff1f0', 
                            color: '#cf1322', 
                            border: '1px solid #ffa39e',
                            padding: '3px 12px',
                            borderRadius: '12px',
                            fontSize: '11px',
                            marginLeft: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontWeight: 600
                        }}>
                            <LockOutlined style={{ fontSize: '10px' }} />
                            REVIEW REJIMI
                        </div>
                    )}
                </div>
            }
            open={visible}
            onCancel={onClose}
            width={1300} // Extra wide for professional viewing
            centered
            footer={[
                <Button 
                    key="close" 
                    icon={<CloseOutlined />} 
                    onClick={onClose}
                    size="large"
                    style={{ borderRadius: '8px', minWidth: '120px' }}
                >
                    Orqaga
                </Button>,
                canDownload && (
                    <Button
                        key="download"
                        type="primary"
                        icon={<DownloadOutlined />}
                        onClick={() => downloadFile(fileUrl)}
                        size="large"
                        style={{ 
                            backgroundColor: '#00a44f', 
                            borderColor: '#00a44f',
                            borderRadius: '8px',
                            minWidth: '160px'
                        }}>
                        To'liq yuklab olish
                    </Button>
                ),
            ]}
            maskStyle={{ backdropFilter: 'blur(8px)' }}
            bodyStyle={{ padding: '20px', backgroundColor: '#fcfcfc' }}
        >
            {ProtectionBanner}
            {getPreviewContent()}
        </Modal>
    );
};

export default FilePreviewModal;


