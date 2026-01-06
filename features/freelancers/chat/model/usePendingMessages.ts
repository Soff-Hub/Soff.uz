import { useRef, useCallback } from 'react';

type MessageType = any;

export const usePendingMessages = () => {
    const pendingMessagesRef = useRef<Map<string, string>>(new Map());
    const pendingMessageTimeoutsRef = useRef<Map<string, NodeJS.Timeout>>(
        new Map()
    );

    const isTempId = useCallback((id: string | number) => {
        return typeof id === 'string' && id.startsWith('temp-');
    }, []);

    const addPending = useCallback((content: string, tempId: string) => {
        if (!content) return;
        pendingMessagesRef.current.set(content.trim(), tempId);
    }, []);

    const removePending = useCallback((content: string, tempId: string) => {
        if (content) {
            pendingMessagesRef.current.delete(content.trim());
        }
        const timeoutId = pendingMessageTimeoutsRef.current.get(tempId);
        if (timeoutId) {
            clearTimeout(timeoutId);
            pendingMessageTimeoutsRef.current.delete(tempId);
        }
    }, []);

    const addTimeout = useCallback(
        (tempId: string, timeoutId: NodeJS.Timeout) => {
            pendingMessageTimeoutsRef.current.set(tempId, timeoutId);
        },
        []
    );

    const removeTimeout = useCallback((tempId: string) => {
        const timeoutId = pendingMessageTimeoutsRef.current.get(tempId);
        if (timeoutId) {
            clearTimeout(timeoutId);
            pendingMessageTimeoutsRef.current.delete(tempId);
        }
    }, []);

    const getPendingByContent = useCallback(
        (content: string | undefined | null) => {
            if (!content) return undefined;
            return pendingMessagesRef.current.get(content.trim());
        },
        []
    );

    const clearAll = useCallback(() => {
        pendingMessageTimeoutsRef.current.forEach((timeoutId) => {
            clearTimeout(timeoutId);
        });
        pendingMessageTimeoutsRef.current.clear();
        pendingMessagesRef.current.clear();
    }, []);

    const hasPending = useCallback(() => {
        return pendingMessagesRef.current.size > 0;
    }, []);

    const getPendingCount = useCallback(() => {
        return pendingMessagesRef.current.size;
    }, []);

    // Helper: Clean up pending refs for a specific message
    const cleanupPendingRefs = useCallback(
        (content: string | undefined | null, tempId: string) => {
            if (content) {
                pendingMessagesRef.current.delete(content.trim());
            }
            const timeoutId = pendingMessageTimeoutsRef.current.get(tempId);
            if (timeoutId) {
                clearTimeout(timeoutId);
                pendingMessageTimeoutsRef.current.delete(tempId);
            }
        },
        []
    );

    // Helper: Match pending message with API message
    const matchPendingMessage = useCallback(
        (
            pendingMsg: MessageType,
            apiMessages: MessageType[],
            userId: number
        ): MessageType | null => {
            const contentTrimmed = pendingMsg.content?.trim();
            const hasFile = !!pendingMsg.file;

            // If no content and no file, can't match
            if (!contentTrimmed && !hasFile) return null;

            return (
                apiMessages.find((apiMsg) => {
                    const senderMatch =
                        apiMsg.sender_id === pendingMsg.sender_id &&
                        apiMsg.sender_id === userId;

                    if (!senderMatch) return false;

                    const msgTime = new Date(
                        pendingMsg.created_at || 0
                    ).getTime();
                    const apiMsgTime = new Date(
                        apiMsg.created_at || 0
                    ).getTime();
                    const timeDiff = Math.abs(apiMsgTime - msgTime);
                    const isRecent = timeDiff < 5 * 60 * 1000; // 5 minutes

                    if (!isRecent) return false;

                    // Match by content if both have content
                    if (contentTrimmed && apiMsg.content?.trim()) {
                        const contentMatch =
                            apiMsg.content?.trim() === contentTrimmed;
                        if (contentMatch) return true;
                    }

                    // Match by file if both have files
                    if (hasFile && apiMsg.file) {
                        const filenameMatch =
                            pendingMsg.file.filename === apiMsg.file.filename;
                        const sizeMatch =
                            pendingMsg.file.size &&
                            apiMsg.file.size &&
                            pendingMsg.file.size === apiMsg.file.size;
                        if (filenameMatch || sizeMatch) return true;
                    }

                    // Match file messages without content
                    if (
                        hasFile &&
                        apiMsg.file &&
                        !contentTrimmed &&
                        !apiMsg.content?.trim()
                    ) {
                        return true;
                    }

                    return false;
                }) || null
            );
        },
        []
    );

    return {
        pendingMessagesRef,
        pendingMessageTimeoutsRef,
        isTempId,
        addPending,
        removePending,
        addTimeout,
        removeTimeout,
        getPendingByContent,
        clearAll,
        hasPending,
        getPendingCount,
        cleanupPendingRefs,
        matchPendingMessage,
    };
};
