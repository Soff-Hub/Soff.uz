import { memo } from 'react';
import Conversation from './conversation';

type ChatWindowProps = {
    chatId: string;
    goBack: () => void;
    isModerator: boolean;
    isDirector: boolean;
    hideCreateOrderButton: boolean;
    children?: React.ReactNode;
};

const ChatWindow = (props: ChatWindowProps) => {
    return (
        <Conversation {...props}>
            <Conversation.Header />
            <Conversation.DropOverlay />
            <Conversation.Messages />
            <Conversation.Input />
            <Conversation.Modals />
        </Conversation>
    );
};

export default memo(ChatWindow);
