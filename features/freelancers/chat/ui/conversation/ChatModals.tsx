import React from 'react';
import OrderApproveFiles from '~/features/order-approve-files';
import CreateOrderModal from '~/shared/components/modals/CreateOrderModal';
import { useConversation } from './Conversation';
import { useQueryClient } from '@tanstack/react-query';

type ChatModalsProps = {};

function ChatModals({}: ChatModalsProps) {
    const queryClient = useQueryClient();
    const {
        chatId,
        chat,
        createOrderModalOpen,
        setCreateOrderModalOpen,
        selectedOrder,
        res,
        setRes,
        feedbackOpen,
        setFeedbackOpen,
    } = useConversation();

    const sellerInfo = {
        id: chat?.opponent?.id,
        image: chat?.opponent?.photo_url,
        name: chat?.opponent?.name,
        position: chat?.opponent?.position?.title,
    };

    return (
        <>
            <CreateOrderModal
                open={createOrderModalOpen}
                onClose={() => setCreateOrderModalOpen(false)}
                id={chat?.opponent?.id}
                seller={chat?.opponent?.name}
                sellerInfo={sellerInfo}
                defaultDirection={chat?.opponent?.position?.direction}
                onSuccess={undefined}
            />
            <OrderApproveFiles
                order={selectedOrder}
                res={res}
                setRes={setRes}
                feedbackOpen={feedbackOpen}
                setFeedbackOpen={setFeedbackOpen}
                onSuccess={() => {
                    queryClient.invalidateQueries({
                        queryKey: ['chat-messages', chatId],
                    });
                }}
            />
        </>
    );
}

export default ChatModals;
