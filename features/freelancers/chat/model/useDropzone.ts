import { useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

type UseDropzoneProps = {
    chatId?: string;
    maxSize: number;
    edit: any;
    isBlocked: boolean;
    onFileReceived: (file: File) => void;
};

function useDropzone({
    chatId,
    maxSize,
    edit,
    isBlocked,
    onFileReceived,
}: UseDropzoneProps) {
    const [isDragging, setIsDragging] = useState(false);
    const queryClient = useQueryClient();
    const dragCounterRef = useRef(0);

    useEffect(() => {
        const handlePaste = async (e: ClipboardEvent) => {
            if (!chatId || edit) return;

            const items = e.clipboardData?.items;
            if (!items) return;

            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                e.preventDefault();
                const file = item.getAsFile();
                if (file) {
                    if (file.size > maxSize) {
                        message.error('Fayl hajmi 50MB dan oshmasligi kerak');
                        return;
                    }

                    onFileReceived(file);
                }
                break;
            }
        };

        document.addEventListener('paste', handlePaste);
        return () => {
            document.removeEventListener('paste', handlePaste);
        };
    }, [chatId, edit, onFileReceived, queryClient]);

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isBlocked) return;
        dragCounterRef.current++;
        if (e.dataTransfer.types.includes('Files')) {
            setIsDragging(true);
        }
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounterRef.current--;
        // Only hide if we've left all nested elements
        if (dragCounterRef.current === 0) {
            setIsDragging(false);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isBlocked) return;
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isBlocked) return;
        dragCounterRef.current = 0;
        setIsDragging(false);

        if (!chatId || edit) return;

        const files = Array.from(e.dataTransfer.files);
        const file = files?.[0];

        if (file.size > maxSize) {
            message.error('Fayl hajmi 50MB dan oshmasligi kerak');
            return;
        }

        onFileReceived(file);
    };

    return {
        isDragging,
        handleDragEnter,
        handleDragLeave,
        handleDragOver,
        handleDrop,
    };
}

export default useDropzone;
