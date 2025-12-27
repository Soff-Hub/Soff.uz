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
    return (
        <>
            <CreateOrderModal
                open={createOrderModalOpen}
                onClose={() => setCreateOrderModalOpen(false)}
                id={chat?.opponent?.id}
                seller={chat?.opponent?.name}
                sellerInfo={chat?.opponent}
                defaultDirection={undefined}
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
