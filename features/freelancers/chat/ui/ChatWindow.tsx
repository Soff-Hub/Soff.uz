import Conversation from './conversation/Conversation';

type ChatWindowProps = {
    chatId?: string;
    goBack: () => void;
    isModerator: boolean;
    isDirector: boolean;
    hideCreateOrderButton?: boolean;
    children?: React.ReactNode;
    fullHeight?: boolean;
};

const ChatWindow: React.FC<ChatWindowProps> = (props) => {
    return (
        <Conversation {...props}>
            <Conversation.Header />
            <Conversation.DropOverlay />
            <Conversation.Messages />
            {/* <Conversation.FAQ /> */}
            <Conversation.Input />
            <Conversation.Modals />
        </Conversation>
    );
};

export default ChatWindow;
