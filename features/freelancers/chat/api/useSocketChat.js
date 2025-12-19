// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import useGetChatById from './useGetChatById';
// import { useWebSocket } from '@shined/react-use';

// const useWebSocketChat = (chatId) => {
//   const { user } = useSelector(state => state.auth)
//   const [messages, setMessages] = useState([]);
//   const [chat, setChat] = useState();
//   const { data } = useGetChatById(chatId);


//   useEffect(() => {
//     if (chatId && data) {
//       setChat(data.chat);
//       setMessages(data.messages);
//     }
//   }, [chatId, data]);

//   const sendUnreadMessages = (ws, currentMessages) => {
//     if (!ws || ws.readyState !== WebSocket.OPEN) return;
//     const unreadIds = currentMessages.filter(m => !m.is_read).map(m => m.id);
//     if (unreadIds.length > 0) {
//       ws.send(JSON.stringify({
//         event: "message_read",
//         message_ids: unreadIds
//       }));
//     }
//   };

//   const ws = useWebSocket(`${process.env.NEXT_PUBLIC_WS_FREELEANCE_URL}${chatId}/?token=${user?.access}`, {
//     heartbeat: true,
//     // reconnect: true,
//     immediate: true,
//     onMessage: (event) => {
//       if (!chatId || !user?.access) return;
//       if (!event.data) {
//         console.warn("⚠️ WS event.data bo‘sh:", event);
//         return;
//       }

//       let msg;
//       try {
//         msg = JSON.parse(event.data);
//       } catch (e) {
//         console.warn("⚠️ JSON emas data:", event.data);
//         return;
//       }

//       switch (msg.event) {
//         case "message":
//           setMessages(prev => {
//             const updated = [...prev, msg];
//             // yangi kelganida ham unreadlarni tekshirib yuboramiz
//             sendUnreadMessages(ws, updated);
//             return updated;
//           });
//           break;
//         case "message_update":
//           setMessages(prev => prev.map(m =>
//             m.id === msg.id ? { ...m, ...msg } : m
//           ));
//           break;
//         case "delete_message":
//           setMessages(prev => prev.filter(m => m.id !== msg.id));
//           break;
//         default:
//           console.warn("Unknown event:", msg);
//       }
//     }
//   })



//   // Xabar yuborish
//   const sendMessage = (content) => {
//     if (ws.readyState === WebSocket.OPEN) {
//       ws.send(JSON.stringify({
//         event: "message",
//         content
//       }));
//     }
//   };

//   const updateMessage = (content, message_id) => {
//     if (ws.readyState === WebSocket.OPEN) {
//       ws.send(JSON.stringify({
//         event: "message_update",
//         content,
//         message_id,
//       }));
//     }
//   };

//   const sendUnreads = (messages) => {
//     sendUnreadMessages(ws, messages)
//   }

//   return {
//     messages,
//     chat,
//     sendMessage,
//     sendUnreads,
//     updateMessage
//   };
// }

// export default useWebSocketChat