import React from 'react'
import styles from '../style/chat.module.scss';


const ChatInput = ({}) => {
    return (
        <div className={styles.chat_input_box}>
            {editingMessage && (
                <div className="text-warning mb-1">
                    <Button onClick={() => { setEditingMessage(null); setNewMessage(''); }}>
                        Bekor qilish
                    </Button>
                </div>
            )}
            <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onPressEnter={handleSend}
                placeholder="Xabar yozing..."
                className={styles.chat_input}
            />
            <Button
                style={{ background: '#00A44F' }}
                type="primary"
                onClick={handleSend}
            >
                <SendOutlined style={{ fontSize: "20px" }} />
            </Button>
        </div>
    )
}

export default ChatInput