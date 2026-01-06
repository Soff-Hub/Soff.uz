import Conversation from './conversation/Conversation';

type ChatWindowProps = {
    chatId?: string;
    goBack: () => void;
    isModerator: boolean;
    isDirector: boolean;
    hideCreateOrderButton?: boolean;
    children?: React.ReactNode;
};

const ChatWindow: React.FC<ChatWindowProps> = (props) => {
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

export default ChatWindow;
