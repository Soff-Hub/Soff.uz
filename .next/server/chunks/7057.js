exports.id = 7057;
exports.ids = [7057];
exports.modules = {

/***/ 8323:
/***/ ((module) => {

// Exports
module.exports = {
	"chat_sidebar": "chat_chat_sidebar__9YY1T",
	"chat_search": "chat_chat_search__3ZpEO",
	"sidebar_chats": "chat_sidebar_chats__jbXug",
	"sidebar_chat": "chat_sidebar_chat___aShD",
	"sidebar_chat_wrapper": "chat_sidebar_chat_wrapper__5OiMK",
	"box1": "chat_box1__5Rnob",
	"box2": "chat_box2__WRqUW",
	"chat_window": "chat_chat_window__uR12n",
	"chat_messages": "chat_chat_messages__WfSv0",
	"chat_message": "chat_chat_message__hBdQZ",
	"my_message": "chat_my_message__TE2n4",
	"other_message": "chat_other_message__YlTFz",
	"chat_input_box": "chat_chat_input_box__ko3or",
	"chat_input": "chat_chat_input__GC5NE",
	"chat_user": "chat_chat_user__Ba094",
	"user_box": "chat_user_box__3jd29",
	"user_names": "chat_user_names__xNJ1M",
	"chat_created_time": "chat_chat_created_time__eVMm7",
	"chat_down_icon": "chat_chat_down_icon__2LNja",
	"chat_header_sticky": "chat_chat_header_sticky__Iusv3",
	"chat_safety_alert_sticky": "chat_chat_safety_alert_sticky__dJmNk"
};


/***/ }),

/***/ 5637:
/***/ ((module) => {

// Exports
module.exports = {
	"messageRow": "message_messageRow__1lpWv",
	"avatar": "message_avatar__UkrEd",
	"myRow": "message_myRow__t5rpO",
	"otherRow": "message_otherRow__vd4_1",
	"chat_message": "message_chat_message__mP_je",
	"moreWrapper": "message_moreWrapper__tFwr3",
	"moreIcon": "message_moreIcon__ltDHM",
	"my_message": "message_my_message___JSSf",
	"other_message": "message_other_message__R0iqs",
	"chat_file_box": "message_chat_file_box__GEWMM",
	"chat_file_info": "message_chat_file_info__jDFyX",
	"chat_file": "message_chat_file__T6Z5T"
};


/***/ }),

/***/ 7371:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_use_websocket__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7636);
/* harmony import */ var react_use_websocket__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_use_websocket__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _useGetChatById__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6947);
/* harmony import */ var _useDeleteMessage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9998);
/* harmony import */ var _useSendMessage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4082);
/* harmony import */ var _shared_hooks_useTimeManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6598);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_7__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_useGetChatById__WEBPACK_IMPORTED_MODULE_3__, _useDeleteMessage__WEBPACK_IMPORTED_MODULE_4__, _useSendMessage__WEBPACK_IMPORTED_MODULE_5__]);
([_useGetChatById__WEBPACK_IMPORTED_MODULE_3__, _useDeleteMessage__WEBPACK_IMPORTED_MODULE_4__, _useSendMessage__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








// WebSocket readyState constants (safe for SSR)
const WS_READY_STATE = {
    CONNECTING: 0,
    OPEN: 1,
    CLOSING: 2,
    CLOSED: 3
};
const useChat = (chatId)=>{
    const { 0: messages , 1: setMessages  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    const { 0: chat , 1: setChat  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();
    const { startTimeout , stopTimeout  } = (0,_shared_hooks_useTimeManager__WEBPACK_IMPORTED_MODULE_6__/* .useTimeManager */ .h)();
    const { mutateAsync: deleteMsg  } = (0,_useDeleteMessage__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)();
    const { mutateAsync: sendFile , isPending: isMessageWithFilePending  } = (0,_useSendMessage__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z)();
    const { user  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)((state)=>state.auth);
    const { data , fetchNextPage , hasNextPage , isFetchingNextPage , isInitialLoading , refetch: refetchMessages ,  } = (0,_useGetChatById__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)(chatId);
    const unreadTimeoutRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const pendingMessageTimeoutsRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(new Map()); // tempId -> timeoutId
    // Track last message received time for connection health monitoring
    const lastMessageTimeRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(Date.now());
    const healthCheckIntervalRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const forceReconnectKeyRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0); // Used to force reconnect by changing URL
    const { 0: reconnectKey , 1: setReconnectKey  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
    const forceReconnectRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    // Build WebSocket URL - add reconnect key to force new connection when needed
    const wsUrl = chatId && user?.access ? `${"wss://freelance.soff.uz/api/v1/ws/"}chat/${chatId}/?token=${user.access}&_reconnect=${reconnectKey}` : null;
    // Use react-use-websocket for connection management
    const { sendMessage: sendWsMessage , lastMessage , readyState , getWebSocket ,  } = react_use_websocket__WEBPACK_IMPORTED_MODULE_2___default()(wsUrl, {
        onOpen: ()=>{
            console.log("✅ WebSocket opened, reconnectKey:", reconnectKey);
        },
        onClose: (event)=>{
            console.log("\uD83D\uDD34 WebSocket closed, reconnectKey:", reconnectKey, "code:", event.code);
        },
        onError: (error)=>{
            console.error("❌ Chat WebSocket error:", error, {
                chatId
            });
        },
        shouldReconnect: (closeEvent)=>{
            // Reconnect unless it's a clean close (code 1000) or no chatId/user
            return !!chatId && !!user?.access && closeEvent?.code !== 1000;
        },
        reconnectAttempts: 5,
        reconnectInterval: (attemptNumber)=>{
            // Exponential backoff: 1s, 2s, 4s, 8s, 16s
            return Math.min(1000 * Math.pow(2, attemptNumber), 16000);
        },
        share: false
    });
    // Derive connection state from readyState
    const isConnected = readyState === WS_READY_STATE.OPEN;
    // Track pending messages to match with server responses
    const pendingMessagesRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(new Map()); // content -> tempId
    // Helper function to check if an ID is a temporary ID
    // Temporary IDs are strings starting with 'temp-'
    // Server IDs are numbers, date separator IDs are strings starting with 'date-separator-'
    const isTempId = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((id)=>{
        return typeof id === "string" && id.startsWith("temp-");
    }, []);
    // Function to check and match pending messages with API data
    const checkPendingMessages = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async ()=>{
        if (!chatId || !data) return;
        // Get all messages from API (ALL pages, not just latest)
        const allApiMessages = data.pages.flatMap((p)=>p.messages || []);
        // Find messages still in "sending" status and clean them up if confirmed
        setMessages((prev)=>{
            // Map to track which pending messages should be replaced with which real messages
            const pendingToRealMessage = new Map(); // tempId -> realMessage
            const contentToRealMessage = new Map(); // content -> realMessage
            // First pass: find all matches
            prev.forEach((m)=>{
                if (m.status === "sending" && isTempId(m.id)) {
                    const contentTrimmed = m.content.trim();
                    // Try to find matching message in API data
                    const matchingMessage = allApiMessages.find((apiMsg)=>{
                        // Exact content match
                        const contentMatch = apiMsg.content?.trim() === contentTrimmed;
                        // Sender match
                        const senderMatch = apiMsg.sender_id === m.sender_id && apiMsg.sender_id === user.id;
                        // Time-based check: message should be recent (within last 5 minutes)
                        const msgTime = new Date(m.created_at);
                        const apiMsgTime = new Date(apiMsg.created_at);
                        const timeDiff = Math.abs(apiMsgTime - msgTime);
                        const isRecent = timeDiff < 5 * 60 * 1000; // 5 minutes
                        return contentMatch && senderMatch && isRecent;
                    });
                    if (matchingMessage) {
                        pendingToRealMessage.set(m.id, matchingMessage);
                        contentToRealMessage.set(contentTrimmed, matchingMessage);
                        // Clean up refs
                        pendingMessagesRef.current.delete(contentTrimmed);
                        const timeoutId = pendingMessageTimeoutsRef.current.get(m.id);
                        if (timeoutId) {
                            clearTimeout(timeoutId);
                            pendingMessageTimeoutsRef.current.delete(m.id);
                        }
                    }
                }
            });
            if (pendingToRealMessage.size === 0) {
                return prev; // No changes
            }
            // Second pass: replace pending messages and remove duplicates
            const seenRealIds = new Set();
            const updated = [];
            for (const m of prev){
                // If this is a pending message that has a match, replace it
                if (pendingToRealMessage.has(m.id)) {
                    const realMessage = pendingToRealMessage.get(m.id);
                    const { status , ...cleanMsg } = realMessage;
                    // Only add if we haven't seen this real message ID yet
                    if (!seenRealIds.has(cleanMsg.id)) {
                        updated.push(cleanMsg);
                        seenRealIds.add(cleanMsg.id);
                    }
                    continue;
                }
                // If this is a temp message with content that matches a real message, skip it
                if (isTempId(m.id) && m.status === "sending") {
                    const contentTrimmed = m.content.trim();
                    const realMessage1 = contentToRealMessage.get(contentTrimmed);
                    if (realMessage1 && seenRealIds.has(realMessage1.id)) {
                        continue;
                    }
                }
                // Track real message IDs to avoid duplicates
                if (!isTempId(m.id)) {
                    if (seenRealIds.has(m.id)) {
                        continue; // Skip duplicate real message
                    }
                    seenRealIds.add(m.id);
                }
                updated.push(m);
            }
            return updated;
        });
    }, [
        chatId,
        data,
        user?.id,
        isTempId
    ]);
    // Update last message time on any WebSocket message
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (lastMessage?.data) {
            lastMessageTimeRef.current = Date.now();
        }
    }, [
        lastMessage
    ]);
    // Process messages from WebSocket
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (!lastMessage?.data) return;
        let msg;
        try {
            msg = JSON.parse(lastMessage.data);
        } catch (e) {
            console.warn("⚠️ Invalid JSON data:", lastMessage.data);
            return;
        }
        if (msg.error) {
            antd__WEBPACK_IMPORTED_MODULE_7__.message.error(msg.error);
            setMessages((prev)=>{
                const updated = prev.filter((m)=>{
                    // Remove temp messages that match the error content
                    if (m.status === "sending" && m.content.trim() === msg.content?.trim()) {
                        pendingMessagesRef.current.delete(m.content.trim());
                        return false;
                    }
                    return true;
                });
                sendUnreadMessages(updated);
                return updated;
            });
            return;
        }
        switch(msg.event){
            case "message":
                {
                    setMessages((prev)=>{
                        // If it's my message, try to replace temp message
                        if (msg.is_mine) {
                            const contentTrimmed = msg.content?.trim();
                            const tempId = pendingMessagesRef.current.get(contentTrimmed);
                            // First, filter out ALL pending messages with matching content
                            // This is more aggressive and handles reconnection cases
                            const filtered = prev.filter((m)=>{
                                // Remove any pending messages that match this content
                                if (m.status === "sending" && m.content.trim() === contentTrimmed && m.sender_id === user.id && isTempId(m.id)) {
                                    // Clean up refs
                                    pendingMessagesRef.current.delete(contentTrimmed);
                                    const timeoutId = pendingMessageTimeoutsRef.current.get(m.id);
                                    if (timeoutId) {
                                        clearTimeout(timeoutId);
                                        pendingMessageTimeoutsRef.current.delete(m.id);
                                    }
                                    return false; // Remove this pending message
                                }
                                return true;
                            });
                            // Check if message with this real ID already exists (avoid duplicates)
                            const alreadyExists = filtered.some((m)=>m.id === msg.id && !isTempId(m.id));
                            if (alreadyExists) {
                                // Message already exists, just return filtered (pending removed)
                                sendUnreadMessages(filtered);
                                return filtered;
                            }
                            // Add the real message (without status)
                            const { status , ...cleanMsg } = msg;
                            const finalMessages = [
                                ...filtered,
                                cleanMsg
                            ];
                            sendUnreadMessages(finalMessages);
                            return finalMessages;
                        } else {
                            // Not my message, just add it (but check for duplicates first)
                            const alreadyExists1 = prev.some((m)=>m.id === msg.id && !isTempId(m.id));
                            if (alreadyExists1) {
                                return prev;
                            }
                            const updated = [
                                ...prev,
                                msg
                            ];
                            sendUnreadMessages(updated);
                            return updated;
                        }
                    });
                    break;
                }
            case "message_update":
                {
                    setMessages((prev)=>{
                        const updated = prev.map((m)=>{
                            if (m.id === msg.id) {
                                // Remove status and update with server response
                                const { status , ...cleanMsgProperties } = m;
                                const { status: msgStatus , ...cleanMsg } = msg;
                                return {
                                    ...cleanMsgProperties,
                                    ...cleanMsg
                                };
                            }
                            return m;
                        });
                        return updated;
                    });
                    break;
                }
            case "delete_message":
                setMessages((prev)=>prev.filter((m)=>m.id !== msg.id));
                break;
            default:
                console.warn("Unknown event:", msg);
        }
    }, [
        lastMessage,
        user?.id
    ]);
    // Check pending messages when data updates (after refetch or pagination)
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (data) {
            // Always check for pending messages when data changes (pagination, refetch, etc.)
            // Small delay to ensure state is updated
            const checkTimeout = setTimeout(()=>{
                checkPendingMessages();
            }, 100);
            return ()=>clearTimeout(checkTimeout);
        }
    }, [
        data,
        checkPendingMessages
    ]);
    // Process chat data and format messages with date separators
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (chatId && data) {
            setChat(data?.pages[0]?.chat);
            // Get ALL messages from ALL pages (infinite query pages)
            let allMsgs = data.pages.flatMap((p)=>p.messages || []);
            allMsgs = allMsgs.sort((a, b)=>new Date(a.created_at) - new Date(b.created_at));
            // Create a map of server messages by ID for quick lookup
            const serverMessagesMap = new Map(allMsgs.map((m)=>[
                    m.id,
                    m
                ]));
            // Proactively clean up pending refs for messages that are confirmed in server data
            // This helps catch cases where matching might have been missed
            pendingMessagesRef.current.forEach((tempId, content)=>{
                const matchingServerMsg = allMsgs.find((serverMsg)=>serverMsg.content?.trim() === content && serverMsg.sender_id === user?.id);
                if (matchingServerMsg) {
                    // Found a match, clean up the ref
                    pendingMessagesRef.current.delete(content);
                    const timeoutId = pendingMessageTimeoutsRef.current.get(tempId);
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                        pendingMessageTimeoutsRef.current.delete(tempId);
                    }
                }
            });
            // Preserve pending/temporary messages and WebSocket messages from current state
            setMessages((prevMessages)=>{
                // Get all messages that need to be preserved:
                // 1. Pending messages (sending/updating status)
                // 2. Messages that came via WebSocket but aren't in server data yet
                const messagesToPreserve = prevMessages.filter((m)=>{
                    // Skip date separators - they'll be regenerated
                    if (m.type === "date-separator") {
                        return false;
                    }
                    // If it's a pending message (temp ID or has status)
                    if (m.status === "sending" || m.status === "updating") {
                        // Check if it's been confirmed by server
                        if (isTempId(m.id)) {
                            // For temp messages, check if server has matching message
                            // Try multiple matching strategies for robustness
                            const contentTrimmed = m.content.trim();
                            const matchingServerMsg = allMsgs.find((serverMsg)=>{
                                // Exact content match
                                const contentMatch = serverMsg.content?.trim() === contentTrimmed;
                                // Sender match
                                const senderMatch = serverMsg.sender_id === m.sender_id && serverMsg.sender_id === user?.id;
                                // Time-based check: message should be recent (within last 5 minutes)
                                const msgTime = new Date(m.created_at);
                                const serverMsgTime = new Date(serverMsg.created_at);
                                const timeDiff = Math.abs(serverMsgTime - msgTime);
                                const isRecent = timeDiff < 5 * 60 * 1000; // 5 minutes
                                return contentMatch && senderMatch && isRecent;
                            });
                            if (matchingServerMsg) {
                                // Message confirmed! Clean up pending refs
                                pendingMessagesRef.current.delete(contentTrimmed);
                                const timeoutId = pendingMessageTimeoutsRef.current.get(m.id);
                                if (timeoutId) {
                                    clearTimeout(timeoutId);
                                    pendingMessageTimeoutsRef.current.delete(m.id);
                                }
                                // Don't preserve - server has it
                                return false;
                            }
                            // Still pending, preserve it
                            return true;
                        }
                        // For updating status with real ID
                        if (m.status === "updating") {
                            const serverMsg = serverMessagesMap.get(m.id);
                            if (serverMsg && serverMsg.content?.trim() === m.content.trim()) {
                                // Update confirmed, don't preserve
                                return false;
                            }
                            return true;
                        }
                    }
                    // If message is not in server data, preserve it (might be a new WebSocket message)
                    // But only if it's not a duplicate of a server message
                    if (!serverMessagesMap.has(m.id)) {
                        // Check if it's a duplicate by content (for temp messages that were confirmed)
                        if (isTempId(m.id)) {
                            // Already handled above
                            return true;
                        }
                        // Real message ID not in server - might be very new, preserve it
                        return true;
                    }
                    // Message exists in server data, don't preserve (use server version)
                    return false;
                });
                // Merge: server messages + preserved messages
                const mergedMessages = [
                    ...allMsgs,
                    ...messagesToPreserve
                ];
                // Sort by created_at
                mergedMessages.sort((a, b)=>new Date(a.created_at || 0) - new Date(b.created_at || 0));
                // Add date separators
                const messagesWithSeparators = mergedMessages.reduce((acc, msg, index)=>{
                    if (!msg.created_at) {
                        acc.push(msg);
                        return acc;
                    }
                    const msgDate = new Date(msg.created_at).toDateString();
                    const prevMsgDate = index > 0 && mergedMessages[index - 1].created_at ? new Date(mergedMessages[index - 1].created_at).toDateString() : null;
                    if (msgDate !== prevMsgDate) {
                        const dateObj = new Date(msg.created_at);
                        const uzbekMonths = [
                            "Yanvar",
                            "Fevral",
                            "Mart",
                            "Aprel",
                            "May",
                            "Iyun",
                            "Iyul",
                            "Avgust",
                            "Sentyabr",
                            "Oktyabr",
                            "Noyabr",
                            "Dekabr", 
                        ];
                        const day = dateObj.getDate();
                        const month = uzbekMonths[dateObj.getMonth()];
                        const year = dateObj.getFullYear();
                        const formattedDate = `${month} ${day}, ${year}`;
                        acc.push({
                            id: `date-separator-${msgDate}-${index}`,
                            type: "date-separator",
                            date: formattedDate
                        });
                    }
                    acc.push(msg);
                    return acc;
                }, []);
                // Remove duplicates (prioritize server messages over pending if same ID)
                const uniqueMsgsById = Array.from(new Map(messagesWithSeparators.map((m)=>[
                        m.id,
                        m
                    ])).values());
                // Additional deduplication: remove pending messages if real message with same content exists
                const seenContentToRealId = new Map(); // content -> real message ID
                const finalMessages = uniqueMsgsById.filter((m)=>{
                    const contentTrimmed = m.content?.trim();
                    // Track real messages by content
                    if (!isTempId(m.id) && contentTrimmed) {
                        seenContentToRealId.set(contentTrimmed, m.id);
                    }
                    // If this is a pending message and we have a real message with same content, remove it
                    if (isTempId(m.id) && m.status === "sending" && contentTrimmed) {
                        const realId = seenContentToRealId.get(contentTrimmed);
                        if (realId) {
                            // Real message exists with this content, remove pending
                            return false;
                        }
                    }
                    return true;
                });
                return finalMessages;
            });
        }
    }, [
        chatId,
        data,
        user?.id
    ]);
    // Send unread messages to server
    const sendUnreadMessages = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((msgs = messages)=>{
        const ws = getWebSocket();
        if (!ws || ws.readyState !== WS_READY_STATE.OPEN) {
            return;
        }
        const unreadIds = msgs?.filter((m)=>!m.is_read).map((m)=>m.id);
        if (unreadIds?.length > 0) {
            sendWsMessage(JSON.stringify({
                event: "message_read",
                message_ids: unreadIds
            }));
        }
    }, [
        getWebSocket,
        sendWsMessage,
        messages
    ]);
    // Send unread messages when connection opens
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (isConnected && messages.length > 0) {
            // Debounce sending unread messages
            if (unreadTimeoutRef.current) {
                stopTimeout(unreadTimeoutRef.current);
            }
            unreadTimeoutRef.current = startTimeout(()=>{
                sendUnreadMessages(messages);
            }, 1000);
        }
        return ()=>{
            if (unreadTimeoutRef.current) {
                stopTimeout(unreadTimeoutRef.current);
            }
        };
    }, [
        isConnected,
        messages,
        sendUnreadMessages,
        startTimeout,
        stopTimeout
    ]);
    // Function to force reconnect by changing URL
    const forceReconnect = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>{
        const newKey = forceReconnectKeyRef.current + 1;
        forceReconnectKeyRef.current = newKey;
        console.log("\uD83D\uDD04 Forcing reconnect, changing key from", reconnectKey, "to", newKey);
        setReconnectKey(newKey);
        lastMessageTimeRef.current = Date.now();
    }, [
        reconnectKey
    ]);
    // Store forceReconnect in ref so it's always accessible in intervals
    forceReconnectRef.current = forceReconnect;
    // Connection health check: Monitor if connection is stuck
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (!isConnected || !chatId) {
            // Clear health check if not connected
            if (healthCheckIntervalRef.current) {
                clearInterval(healthCheckIntervalRef.current);
                healthCheckIntervalRef.current = null;
            }
            return;
        }
        // Start health check interval
        healthCheckIntervalRef.current = setInterval(()=>{
            const timeSinceLastMessage = Date.now() - lastMessageTimeRef.current;
            const hasPendingMessages = pendingMessagesRef.current.size > 0;
            const STUCK_THRESHOLD = 15000; // 15 seconds without any messages
            // If we have pending messages AND no messages received for threshold, connection is stuck
            if (hasPendingMessages && timeSinceLastMessage > STUCK_THRESHOLD) {
                console.warn("⚠️ Connection appears stuck:", {
                    timeSinceLastMessage: `${Math.round(timeSinceLastMessage / 1000)}s`,
                    pendingMessages: pendingMessagesRef.current.size,
                    readyState: readyState
                });
                // Force reconnect by changing URL (library will handle reconnection)
                if (forceReconnectRef.current) {
                    forceReconnectRef.current();
                }
            } else if (timeSinceLastMessage > STUCK_THRESHOLD && !hasPendingMessages) {
                // Even without pending messages, if no messages for a long time, might be stuck
                // But be less aggressive - only if it's been a really long time (30s)
                if (timeSinceLastMessage > 30000) {
                    console.warn("⚠️ No messages received for 30s, connection might be stuck. Forcing reconnect...");
                    if (forceReconnectRef.current) {
                        forceReconnectRef.current();
                    }
                }
            }
        }, 5000); // Check every 5 seconds
        return ()=>{
            if (healthCheckIntervalRef.current) {
                clearInterval(healthCheckIntervalRef.current);
                healthCheckIntervalRef.current = null;
            }
        };
    }, [
        isConnected,
        chatId,
        readyState,
        forceReconnect
    ]);
    // Reset last message time when connection opens
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (isConnected) {
            lastMessageTimeRef.current = Date.now();
            // When connection opens (especially after reconnect), check for pending messages
            // that might have been sent successfully but not yet matched
            if (data && pendingMessagesRef.current.size > 0) {
                // Small delay to ensure any pending messages from the new connection are processed
                const checkTimeout = setTimeout(()=>{
                    checkPendingMessages();
                    // Also refetch to get the latest messages from server
                    refetchMessages();
                }, 2000);
                return ()=>clearTimeout(checkTimeout);
            }
        }
    }, [
        isConnected,
        data,
        checkPendingMessages,
        refetchMessages
    ]);
    // Clean up stuck messages periodically
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        const stuckMessageTimeout = setInterval(()=>{
            const now = Date.now();
            setMessages((prev)=>{
                const updated = prev.filter((m)=>{
                    if (m.status === "sending" && isTempId(m.id)) {
                        // Extract timestamp from temp ID (format: temp-1234567890)
                        const tempTime = parseInt(m.id.split("-")[1]);
                        const age = now - tempTime;
                        if (age > 30000) {
                            pendingMessagesRef.current.delete(m.content.trim());
                            return false;
                        }
                    }
                    return true;
                });
                return updated;
            });
        }, 5000);
        return ()=>clearInterval(stuckMessageTimeout);
    }, [
        isTempId
    ]);
    // Clean up pending messages when chatId changes
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        return ()=>{
            // Clear all pending message timeouts
            pendingMessageTimeoutsRef.current.forEach((timeoutId)=>{
                clearTimeout(timeoutId);
            });
            pendingMessageTimeoutsRef.current.clear();
            pendingMessagesRef.current.clear();
            // Clear health check
            if (healthCheckIntervalRef.current) {
                clearInterval(healthCheckIntervalRef.current);
                healthCheckIntervalRef.current = null;
            }
        };
    }, [
        chatId
    ]);
    const sendMessage = async (content)=>{
        if (!isConnected) {
            antd__WEBPACK_IMPORTED_MODULE_7__.message.error("Ulanish yo‘q. Iltimos, biroz kuting va qayta urinib ko‘ring.");
            return;
        }
        const tempId = `temp-${Date.now()}`;
        const contentTrimmed = content.trim();
        // Track this pending message
        pendingMessagesRef.current.set(contentTrimmed, tempId);
        const tempMessage = {
            id: tempId,
            content,
            file: null,
            read_at: null,
            sender_id: user.id,
            created_at: new Date().toISOString(),
            is_read: false,
            is_mine: true,
            status: "sending"
        };
        // Add temp message to UI
        setMessages((prev)=>[
                ...prev,
                tempMessage
            ]);
        try {
            sendWsMessage(JSON.stringify({
                event: "message",
                content
            }));
            // Set up 5-second fallback: if message is still pending, refetch and match
            const timeoutId = setTimeout(async ()=>{
                // Check if message is still in "sending" status
                setMessages((current)=>{
                    const stillPending = current.find((m)=>m.id === tempId && m.status === "sending");
                    if (stillPending) {
                        // Check connection health - if no messages received recently, force reconnect
                        const timeSinceLastMessage = Date.now() - lastMessageTimeRef.current;
                        if (timeSinceLastMessage > 10000) {
                            // No messages for 10+ seconds, connection is likely stuck
                            console.warn("⚠️ No messages received for 10s, forcing reconnect...");
                            if (forceReconnectRef.current) {
                                forceReconnectRef.current();
                            }
                        }
                        // Refetch messages from API
                        refetchMessages().then(()=>{
                            // After refetch, check for matching message
                            setTimeout(()=>{
                                checkPendingMessages();
                            }, 500); // Small delay to ensure data is updated
                        });
                    }
                    return current;
                });
                // Clean up timeout reference
                pendingMessageTimeoutsRef.current.delete(tempId);
            }, 5000); // 5 seconds
            // Store timeout ID for cleanup
            pendingMessageTimeoutsRef.current.set(tempId, timeoutId);
        } catch (error) {
            console.error("❌ Error sending message:", error);
            // Remove temp message and tracking on error
            pendingMessagesRef.current.delete(contentTrimmed);
            const timeoutId1 = pendingMessageTimeoutsRef.current.get(tempId);
            if (timeoutId1) {
                clearTimeout(timeoutId1);
                pendingMessageTimeoutsRef.current.delete(tempId);
            }
            setMessages((prev)=>prev.filter((m)=>m.id !== tempId));
            antd__WEBPACK_IMPORTED_MODULE_7__.message.error("Xabar yuborishda xatolik yuz berdi. Qayta urinib ko‘ring.");
        }
    };
    const sendMessageWithFile = async (data, options)=>{
        setMessages((prev)=>[
                ...prev,
                {
                    id: `temp-${Date.now()}`,
                    content: data.content || "",
                    file: {
                        url: URL.createObjectURL(data?.file),
                        filename: data?.file.name,
                        size: data?.file.size
                    },
                    read_at: null,
                    sender_id: user.id,
                    created_at: new Date().toISOString(),
                    is_read: false,
                    is_mine: true,
                    status: "sending"
                }, 
            ]);
        await sendFile(data, options);
    };
    const updateMessage = async (content, message_id)=>{
        if (!isConnected) {
            antd__WEBPACK_IMPORTED_MODULE_7__.message.error("Ulanish yo‘q. Iltimos, biroz kuting va qayta urinib ko‘ring.");
            return;
        }
        const tempMessage = {
            ...messages.find((m)=>m.id === message_id) || {},
            content,
            status: "updating"
        };
        setMessages((prev)=>prev.map((m)=>m.id === message_id ? tempMessage : m));
        try {
            sendWsMessage(JSON.stringify({
                event: "message_update",
                content,
                message_id
            }));
        } catch (error) {
            console.error("❌ Error updating message:", error);
            // Revert message on error
            setMessages((prev)=>prev.map((m)=>m.id === message_id ? {
                        ...m,
                        status: undefined
                    } : m));
            antd__WEBPACK_IMPORTED_MODULE_7__.message.error("Xabarni yangilashda xatolik yuz berdi. Qayta urinib ko‘ring.");
        }
    };
    const deleteMessage = async (message_id, message_status)=>{
        setMessages((prev)=>prev.filter((m)=>m.id !== message_id));
        await deleteMsg(message_id);
    };
    // Debug helper (development only)
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (false) {}
    }, [
        getWebSocket,
        isConnected,
        chatId
    ]);
    return {
        wsRef: {
            current: getWebSocket()
        },
        messages,
        chat,
        sendMessage,
        sendMessageWithFile,
        updateMessage,
        deleteMessage,
        sendUnreadMessages,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isFetching: isInitialLoading,
        isMessageWithFilePending,
        isConnected,
        checkConnectionState: ()=>{
            const ws = getWebSocket();
            return {
                exists: !!ws,
                isClosed: ws?.readyState === WS_READY_STATE.CLOSED,
                isOpen: ws?.readyState === WS_READY_STATE.OPEN,
                readyState: ws?.readyState
            };
        }
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useChat);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9998:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2417);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9752);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_3__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_1__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__]);
([_shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_1__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




const useDeleteMessage = ()=>{
    const { user  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_0__.useSelector)((state)=>state.auth);
    const axios = (0,_shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(user?.access);
    const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQueryClient)();
    return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useMutation)({
        mutationFn: async (id)=>{
            const formData = new FormData();
            formData.append("message_id", id);
            await axios.delete("chats/messages", {
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: [
                    "chat-messages"
                ]
            });
            antd__WEBPACK_IMPORTED_MODULE_3__.message.success("Xabar o'chirildi");
        }
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useDeleteMessage);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6947:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2417);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9752);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_1__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__]);
([_shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_1__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



const useGetChatById = (id)=>{
    const { user  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_0__.useSelector)((state)=>state.auth);
    const axios = (0,_shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(user?.access);
    return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useInfiniteQuery)({
        queryKey: [
            "chat-messages",
            id
        ],
        queryFn: async ({ pageParam =1  })=>{
            const { data  } = await axios.get(`chats/${id}?page=${pageParam}`);
            return data;
        },
        getNextPageParam: (lastPage, allPages)=>{
            const nextPage = lastPage?.has_next_page ? allPages.length + 1 : undefined;
            return nextPage;
        },
        enabled: !!id,
        refetchOnWindowFocus: true,
        refetchOnMount: "always"
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useGetChatById);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4082:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2417);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9752);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_1__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__]);
([_shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_1__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



const useSendMessage = ()=>{
    const { user  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_0__.useSelector)((state)=>state.auth);
    const axios = (0,_shared_api_freeleanceApi__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(user?.access);
    const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQueryClient)();
    return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useMutation)({
        mutationFn: async (data)=>{
            const formData = new FormData();
            formData.append("chat_id", data.chat_id);
            if (data.content) formData.append("content", data.content);
            if (data.file) formData.append("file", data.file);
            await axios.post("chats/message", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: [
                    "chat"
                ]
            });
            queryClient.invalidateQueries({
                queryKey: [
                    "chats"
                ]
            });
        }
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useSendMessage);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1186:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _shared_utilities_sleep__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5211);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1301);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_icons_fa__WEBPACK_IMPORTED_MODULE_4__]);
react_icons_fa__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






const containerStyle = {
    position: "relative",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    overflow: "hidden"
};
const commonTransition = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    objectFit: "cover",
    transition: "opacity 0.3s ease"
};
function AvatarTransitioned({ msg , image  }) {
    const isLoading = msg.status === "sending" || msg.status === "updating";
    const { 0: showSpinner , 1: setShowSpinner  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const spinnerContainerStyle = {
        ...commonTransition,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: isLoading ? 1 : 0,
        zIndex: 2
    };
    const imgStyle = {
        ...commonTransition,
        opacity: isLoading ? 0 : 1
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const handleSpinner = async ()=>{
            if (isLoading) {
                await (0,_shared_utilities_sleep__WEBPACK_IMPORTED_MODULE_5__/* .sleep */ ._)(300);
                setShowSpinner(true);
            }
        };
        handleSpinner();
        return ()=>{
            setShowSpinner(false);
        };
    }, [
        isLoading
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        style: containerStyle,
        children: [
            showSpinner && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                style: spinnerContainerStyle,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Spin, {
                    style: {
                        marginBottom: "3px"
                    }
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Avatar, {
                size: 32,
                src: image,
                icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_4__.FaRegUserCircle, {}),
                className: imgStyle
            })
        ]
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AvatarTransitioned);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1992:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);



function ChatDateSeperator({ chatDate  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        style: {
            position: "sticky",
            top: "10px",
            zIndex: 20,
            left: 0,
            right: 0,
            margin: "10px auto",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px"
        },
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Tag, {
            style: {
                backgroundColor: "#f0f0f0",
                fontSize: "14px"
            },
            children: chatDate.date
        })
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChatDateSeperator);


/***/ }),

/***/ 4904:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7066);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_message_module_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5637);
/* harmony import */ var _style_message_module_scss__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_style_message_module_scss__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1635);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _shared_utilities_TruncateTitle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(696);
/* harmony import */ var _AvatarTransitioned__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1186);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1301);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_AvatarTransitioned__WEBPACK_IMPORTED_MODULE_6__, react_icons_fa__WEBPACK_IMPORTED_MODULE_7__]);
([_AvatarTransitioned__WEBPACK_IMPORTED_MODULE_6__, react_icons_fa__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);









const { confirm  } = antd__WEBPACK_IMPORTED_MODULE_2__.Modal;
const ChatMessage = ({ msg , onEdit , onDelete , pushUser , myImg , recipientImg ,  })=>{
    const isMyMessage = msg.is_mine;
    const isMessageLoading = msg.status === "sending" || msg.status === "updating";
    const handleEdit = (0,react__WEBPACK_IMPORTED_MODULE_4__.useCallback)(()=>{
        onEdit(msg);
    }, [
        msg,
        onEdit
    ]);
    const handleDeleteConfirm = (0,react__WEBPACK_IMPORTED_MODULE_4__.useCallback)(()=>{
        confirm({
            title: "Xabarni o‘chirishni tasdiqlang",
            icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1__.ExclamationCircleOutlined, {}),
            content: "Rostdan ham ushbu xabarni o‘chirmoqchimisiz?",
            okText: "Ha, o‘chirish",
            okType: "danger",
            cancelText: "Bekor qilish",
            onOk () {
                onDelete(msg.id, msg.status);
            }
        });
    }, [
        onDelete,
        msg.id
    ]);
    const handleCopy = (0,react__WEBPACK_IMPORTED_MODULE_4__.useCallback)((text)=>{
        navigator.clipboard.writeText(text).then(()=>antd__WEBPACK_IMPORTED_MODULE_2__.message.success("Xabar nusxalandi")).catch(()=>antd__WEBPACK_IMPORTED_MODULE_2__.message.error("Nusxalashda xatolik yuz berdi"));
    }, []);
    const myMenuItems = (0,react__WEBPACK_IMPORTED_MODULE_4__.useMemo)(()=>{
        if (msg.file && !msg.content) {
            return [
                {
                    key: "delete",
                    label: "O‘chirish",
                    icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1__.DeleteOutlined, {}),
                    danger: true,
                    onClick: handleDeleteConfirm
                }, 
            ];
        } else {
            return [
                {
                    key: "edit",
                    label: "Tahrirlash",
                    icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1__.EditOutlined, {}),
                    disabled: isMessageLoading,
                    onClick: handleEdit
                },
                {
                    key: "copy",
                    label: "Nusxalash",
                    icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1__.CopyOutlined, {}),
                    onClick: ()=>handleCopy(msg.content)
                },
                {
                    key: "delete",
                    label: "O‘chirish",
                    icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1__.DeleteOutlined, {}),
                    danger: true,
                    onClick: handleDeleteConfirm
                }, 
            ];
        }
    }, [
        msg.content,
        handleEdit,
        handleDeleteConfirm,
        handleCopy,
        isMessageLoading, 
    ]);
    const opponentMenuItems = (0,react__WEBPACK_IMPORTED_MODULE_4__.useMemo)(()=>{
        if (msg.file) {
            return [
                {
                    key: "dowload",
                    label: "Yuklab olish",
                    icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1__.DownloadOutlined, {}),
                    onClick: ()=>window.open(msg.file.url, "_blank")
                }, 
            ];
        } else {
            return [
                {
                    key: "copy",
                    label: "Nusxalash",
                    icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1__.CopyOutlined, {}),
                    onClick: ()=>handleCopy(msg.content)
                }, 
            ];
        }
    }, [
        msg.content,
        handleCopy
    ]);
    const readStatus = (0,react__WEBPACK_IMPORTED_MODULE_4__.useMemo)(()=>{
        if (!isMyMessage) return null;
        if (isMessageLoading) {
            return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Tooltip, {
                title: "Yuborilmoqda...",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                    src: "/static/svg/svg-spinners--clock.svg",
                    alt: "loading",
                    style: {
                        fongSize: "10px",
                        width: "10px",
                        height: "10px",
                        marginLeft: 4
                    }
                })
            });
        }
        return msg.is_read ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_2__.Tooltip, {
            title: "O‘qildi",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1__.CheckOutlined, {
                    style: {
                        fontSize: "8px",
                        color: "white",
                        marginLeft: 4
                    }
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1__.CheckOutlined, {
                    style: {
                        fontSize: "8px",
                        color: "white",
                        marginLeft: -4
                    }
                })
            ]
        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Tooltip, {
            title: "Yetib bordi",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1__.CheckOutlined, {
                style: {
                    fontSize: "8px",
                    color: "white",
                    marginLeft: 4
                }
            })
        });
    }, [
        isMyMessage,
        msg.is_read,
        isMessageLoading
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: `${(_style_message_module_scss__WEBPACK_IMPORTED_MODULE_8___default().messageRow)} ${isMyMessage ? (_style_message_module_scss__WEBPACK_IMPORTED_MODULE_8___default().myRow) : (_style_message_module_scss__WEBPACK_IMPORTED_MODULE_8___default().otherRow)}`,
        children: [
            !isMyMessage && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Avatar, {
                size: 32,
                src: recipientImg,
                icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_7__.FaRegUserCircle, {})
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: `${(_style_message_module_scss__WEBPACK_IMPORTED_MODULE_8___default().chat_message)} ${isMyMessage ? (_style_message_module_scss__WEBPACK_IMPORTED_MODULE_8___default().my_message) : (_style_message_module_scss__WEBPACK_IMPORTED_MODULE_8___default().other_message)}`,
                style: {
                    wordBreak: "break-word",
                    whiteSpace: "pre-wrap"
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        style: {
                            display: "grid",
                            gridTemplateColumns: "1fr auto",
                            justifyContent: "space-between",
                            alignItems: "end",
                            gap: "5px",
                            width: "100%"
                        },
                        children: [
                            msg.file && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: (_style_message_module_scss__WEBPACK_IMPORTED_MODULE_8___default().chat_file_box),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1__.FileTextOutlined, {
                                        onClick: ()=>window.open(msg.file.url, "_blank"),
                                        className: (_style_message_module_scss__WEBPACK_IMPORTED_MODULE_8___default().chat_file)
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: (_style_message_module_scss__WEBPACK_IMPORTED_MODULE_8___default().chat_file_info),
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: (_style_message_module_scss__WEBPACK_IMPORTED_MODULE_8___default().chat_file_name),
                                                children: (0,_shared_utilities_TruncateTitle__WEBPACK_IMPORTED_MODULE_5__/* .truncateTitle */ .e)(msg.file.filename, 15)
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: (_style_message_module_scss__WEBPACK_IMPORTED_MODULE_8___default().chat_file_size),
                                                children: [
                                                    (msg.file.size / (1024 * 1024)).toFixed(2),
                                                    " ",
                                                    "MB"
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }),
                            msg.content && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                style: {
                                    gridColumn: "1 / 2",
                                    whiteSpace: "pre-wrap",
                                    wordWrap: "break-word",
                                    overflowWrap: "break-word",
                                    minWidth: 0
                                },
                                children: msg.content
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                style: {
                                    textAlign: "right",
                                    fontSize: "9.5px",
                                    color: isMyMessage ? "white" : "black",
                                    opacity: 0.7,
                                    whiteSpace: "nowrap"
                                },
                                children: [
                                    msg.created_at ? dayjs__WEBPACK_IMPORTED_MODULE_3___default()(msg.created_at).format("HH:mm") : "--:--",
                                    readStatus
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        style: {
                            ...isMyMessage ? {
                                left: "-20px"
                            } : {
                                right: "-20px"
                            },
                            position: "absolute",
                            top: "4px",
                            zIndex: 10
                        },
                        className: (_style_message_module_scss__WEBPACK_IMPORTED_MODULE_8___default().moreWrapper),
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Dropdown, {
                            menu: isMyMessage ? {
                                items: myMenuItems
                            } : {
                                items: opponentMenuItems
                            },
                            trigger: [
                                "click"
                            ],
                            placement: isMyMessage ? "bottomRight" : "bottomLeft",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1__.EllipsisOutlined, {
                                className: (_style_message_module_scss__WEBPACK_IMPORTED_MODULE_8___default().moreIcon)
                            })
                        })
                    })
                ]
            }),
            isMyMessage && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_AvatarTransitioned__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                msg: msg,
                image: myImg
            })
        ]
    }, msg.id);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().memo(ChatMessage, areEqual));
function areEqual(prevProps, nextProps) {
    return prevProps.msg === nextProps.msg;
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7057:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_chat_module_scss__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(8323);
/* harmony import */ var _style_chat_module_scss__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_style_chat_module_scss__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7066);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ChatMessage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4904);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _api_useChat__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7371);
/* harmony import */ var react_infinite_scroll_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4336);
/* harmony import */ var react_infinite_scroll_component__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_infinite_scroll_component__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8176);
/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_spinners__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9752);
/* harmony import */ var _shared_components_modals_CreateOrderModal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(1703);
/* harmony import */ var _SafetyAlert__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(2123);
/* harmony import */ var _shared_hooks_useTimeManager__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(6598);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(1301);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _ChatDateSeperator__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(1992);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_ChatMessage__WEBPACK_IMPORTED_MODULE_4__, _api_useChat__WEBPACK_IMPORTED_MODULE_6__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_9__, _shared_components_modals_CreateOrderModal__WEBPACK_IMPORTED_MODULE_10__, react_icons_fa__WEBPACK_IMPORTED_MODULE_13__]);
([_ChatMessage__WEBPACK_IMPORTED_MODULE_4__, _api_useChat__WEBPACK_IMPORTED_MODULE_6__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_9__, _shared_components_modals_CreateOrderModal__WEBPACK_IMPORTED_MODULE_10__, react_icons_fa__WEBPACK_IMPORTED_MODULE_13__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);

















const { TextArea  } = antd__WEBPACK_IMPORTED_MODULE_2__.Input;
const maxSize = 50 * 1024 * 1024;
const ChatWindow = ({ chatId , goBack , containerHeight  })=>{
    const { 0: edit , 1: setEdit  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { user  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_14__.useSelector)((state)=>state.profile);
    const { 0: openDownIcon , 1: setOpenDownIcon  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: isDragging , 1: setIsDragging  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const dragCounterRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(0);
    const messagesContainerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const scrollPositionRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(0);
    const chatWindowRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_5__.useRouter)();
    const { messages , chat , sendMessage , sendMessageWithFile , updateMessage , deleteMessage , fetchNextPage , hasNextPage , isFetching , isMessageWithFilePending , wsRef ,  } = (0,_api_useChat__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(chatId);
    const recipient = chat?.opponent;
    const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_9__.useQueryClient)();
    // Handle paste image
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const handlePaste = async (e)=>{
            if (!chatId || edit) return;
            const items = e.clipboardData?.items;
            if (!items) return;
            for(let i = 0; i < items.length; i++){
                const item = items[i];
                if (item.type.indexOf("image") !== -1) {
                    e.preventDefault();
                    const file = item.getAsFile();
                    if (file) {
                        // Check file size
                        if (file.size > maxSize) {
                            antd__WEBPACK_IMPORTED_MODULE_2__.message.error("Fayl hajmi 50MB dan oshmasligi kerak");
                            return;
                        }
                        // Upload the pasted image
                        sendMessageWithFile({
                            chat_id: chatId,
                            file: file,
                            content: ""
                        }, {
                            onSuccess: ()=>{
                                queryClient.invalidateQueries({
                                    queryKey: [
                                        "chat-messages",
                                        chatId
                                    ]
                                });
                                antd__WEBPACK_IMPORTED_MODULE_2__.message.success("Rasm muvaffaqiyatli yuborildi");
                            },
                            onError: (err)=>{
                                antd__WEBPACK_IMPORTED_MODULE_2__.message.error(err?.response?.data?.detail || "Rasmni yuborishda xatolik yuz berdi");
                            }
                        });
                    }
                    break;
                }
            }
        };
        document.addEventListener("paste", handlePaste);
        return ()=>{
            document.removeEventListener("paste", handlePaste);
        };
    }, [
        chatId,
        edit,
        sendMessageWithFile,
        queryClient
    ]);
    // Handle drag and drop
    const handleDragEnter = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        dragCounterRef.current++;
        if (e.dataTransfer.types.includes("Files")) {
            setIsDragging(true);
        }
    };
    const handleDragLeave = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        dragCounterRef.current--;
        // Only hide if we've left all nested elements
        if (dragCounterRef.current === 0) {
            setIsDragging(false);
        }
    };
    const handleDragOver = (e)=>{
        e.preventDefault();
        e.stopPropagation();
    };
    const handleDrop = async (e)=>{
        e.preventDefault();
        e.stopPropagation();
        dragCounterRef.current = 0;
        setIsDragging(false);
        if (!chatId || edit) return;
        const files = Array.from(e.dataTransfer.files);
        const imageFile = files.find((file)=>file.type.startsWith("image/"));
        if (imageFile) {
            // Check file size
            if (imageFile.size > maxSize) {
                antd__WEBPACK_IMPORTED_MODULE_2__.message.error("Fayl hajmi 50MB dan oshmasligi kerak");
                return;
            }
            // Upload the dropped image
            sendMessageWithFile({
                chat_id: chatId,
                file: imageFile,
                content: ""
            }, {
                onSuccess: ()=>{
                    queryClient.invalidateQueries({
                        queryKey: [
                            "chat-messages",
                            chatId
                        ]
                    });
                    antd__WEBPACK_IMPORTED_MODULE_2__.message.success("Rasm muvaffaqiyatli yuborildi");
                },
                onError: (err)=>{
                    antd__WEBPACK_IMPORTED_MODULE_2__.message.error(err?.response?.data?.detail || "Rasmni yuborishda xatolik yuz berdi");
                }
            });
        } else if (files.length > 0) {
            antd__WEBPACK_IMPORTED_MODULE_2__.message.warning("Faqat rasm fayllari qo‘llab-quvvatlanadi");
        }
    };
    const handleFetchNext = async ()=>{
        if (!messagesContainerRef.current) return;
        const el = messagesContainerRef.current;
        const scrollFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
        await fetchNextPage();
        if (messagesContainerRef.current) {
            const newScrollTop = el.scrollHeight - el.clientHeight - scrollFromBottom;
            el.scrollTop = newScrollTop;
        }
    };
    const handlScroll = ()=>{
        if (messagesContainerRef.current && messagesContainerRef.current.scrollTop < -500) {
            setOpenDownIcon(true);
        } else {
            setOpenDownIcon(false);
        }
    };
    if (!chatId) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: `${(_style_chat_module_scss__WEBPACK_IMPORTED_MODULE_16___default().chat_window)} d-flex align-items-center justify-content-center`,
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Empty, {
                description: "Chatni tanlang",
                image: antd__WEBPACK_IMPORTED_MODULE_2__.Empty.PRESENTED_IMAGE_SIMPLE
            })
        });
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        ref: chatWindowRef,
        className: (_style_chat_module_scss__WEBPACK_IMPORTED_MODULE_16___default().chat_window),
        onDragEnter: handleDragEnter,
        onDragOver: handleDragOver,
        onDragLeave: handleDragLeave,
        onDrop: handleDrop,
        style: {
            position: "relative",
            height: containerHeight ? `${containerHeight}px` : "100%"
        },
        children: [
            isDragging && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    zIndex: 1000,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    pointerEvents: "none"
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_2__.Card, {
                    style: {
                        backgroundColor: "white",
                        padding: "40px 60px",
                        borderRadius: "12px",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                        textAlign: "center"
                    },
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__.CloudUploadOutlined, {
                            style: {
                                fontSize: "64px",
                                color: "#1890ff",
                                marginBottom: "16px"
                            }
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                            style: {
                                margin: 0,
                                color: "#1890ff"
                            },
                            children: "Rasmni yuklash"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            style: {
                                margin: "8px 0 0 0",
                                color: "#666"
                            },
                            children: "Rasmni bu yerga tashlang"
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_style_chat_module_scss__WEBPACK_IMPORTED_MODULE_16___default().chat_user),
                children: [
                    goBack && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__.ArrowLeftOutlined, {
                        style: {
                            cursor: "pointer"
                        },
                        onClick: ()=>{
                            goBack();
                            wsRef.current.close();
                        }
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Avatar, {
                        size: 50,
                        src: recipient?.photo_url,
                        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_13__.FaRegUserCircle, {}),
                        onClick: ()=>router.push(`seller/${chat?.opponent?.id}`),
                        style: {
                            cursor: "pointer"
                        }
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_style_chat_module_scss__WEBPACK_IMPORTED_MODULE_16___default().user_box),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: (_style_chat_module_scss__WEBPACK_IMPORTED_MODULE_16___default().user_names),
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                                    onClick: ()=>router.push(`seller/${chat?.opponent?.id}`),
                                    style: {
                                        cursor: "pointer"
                                    },
                                    children: chat?.opponent?.name
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                children: chat?.opponent?.last_seen
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_SafetyAlert__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {}),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                onScroll: handlScroll,
                ref: messagesContainerRef,
                id: "scrollableDiv",
                style: {
                    width: "100%",
                    height: `100%`,
                    overflowY: "scroll",
                    display: "flex",
                    flexDirection: "column-reverse",
                    margin: "auto",
                    overflowX: "hidden",
                    position: "relative"
                },
                className: `${(_style_chat_module_scss__WEBPACK_IMPORTED_MODULE_16___default().chat_messages)} p-3`,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_infinite_scroll_component__WEBPACK_IMPORTED_MODULE_7___default()), {
                    dataLength: messages.length,
                    next: handleFetchNext,
                    hasMore: hasNextPage,
                    loader: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(InfiniteLoaderComponent, {}),
                    style: {
                        display: "flex",
                        flexDirection: "column-reverse",
                        overflow: "visible",
                        position: "relative"
                    },
                    scrollableTarget: "scrollableDiv",
                    inverse: true,
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        children: isFetching ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            style: {
                                height: "30vh",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            },
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Spin, {})
                        }) : messages?.length ? messages.map((msg)=>msg.type === "date-separator" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ChatDateSeperator__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .Z, {
                                chatDate: msg
                            }, msg.id) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ChatMessage__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                                pushUser: ()=>router.push(`seller/${chat?.chat?.opponent?.id}`),
                                recipientImg: recipient?.photo_url,
                                myImg: user?.image,
                                msg: msg,
                                onEdit: setEdit,
                                onDelete: deleteMessage
                            }, msg.id)) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Empty, {
                            description: "Hozircha xabarlar yo'q",
                            image: antd__WEBPACK_IMPORTED_MODULE_2__.Empty.PRESENTED_IMAGE_SIMPLE
                        })
                    })
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ChatInputParts, {
                edit: edit,
                chatId: chatId,
                chat: chat,
                sendMessage: sendMessage,
                sendMessageWithFile: sendMessageWithFile,
                updateMessage: updateMessage,
                setEdit: setEdit,
                isFetching: isFetching,
                isMessageWithFilePending: isMessageWithFilePending,
                messagesContainerRef: messagesContainerRef,
                scrollPositionRef: scrollPositionRef,
                openDownIcon: openDownIcon
            })
        ]
    });
};
const InfiniteLoaderComponent = ()=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "d-flex justify-content-center align-items-center py-2",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_spinners__WEBPACK_IMPORTED_MODULE_8__.ClipLoader, {
            color: "#00A44F",
            size: 20
        })
    });
const ChatInputParts = ({ edit , chat , chatId , messagesContainerRef , openDownIcon , sendMessage , sendMessageWithFile , isMessageWithFilePending , updateMessage , setEdit ,  })=>{
    const { 0: newMessage , 1: setNewMessage  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: fileList , 1: setFileList  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const { startTimeout  } = (0,_shared_hooks_useTimeManager__WEBPACK_IMPORTED_MODULE_12__/* .useTimeManager */ .h)();
    const fileMapRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(new Map()); // Store actual files separately
    const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_9__.useQueryClient)();
    const fileInputRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const { 0: open , 1: setOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const scrollToBottom = ()=>{
        if (messagesContainerRef.current) {
            const container = messagesContainerRef.current;
            container.scrollTop = container.scrollHeight - container.clientHeight;
        }
    };
    const handleClickAttach = ()=>{
        if (fileInputRef.current) fileInputRef.current?.click();
    };
    const clearStates = ()=>{
        setFileList([]);
        fileMapRef.current.clear();
        setNewMessage("");
    };
    const handleSend = ()=>{
        const trimmedMessage = newMessage.trim();
        if (fileList.length) {
            const file = fileMapRef.current.get(fileList[0].uid);
            sendMessageWithFile({
                chat_id: chatId,
                file: file,
                content: trimmedMessage
            }, {
                onSuccess: ()=>{
                    queryClient.invalidateQueries({
                        queryKey: [
                            "chat-messages",
                            chatId
                        ]
                    });
                    startTimeout(scrollToBottom, 100);
                    antd__WEBPACK_IMPORTED_MODULE_2__.message.success("Fayl muvaffaqiyatli yuborildi");
                },
                onError: (err)=>{
                    antd__WEBPACK_IMPORTED_MODULE_2__.message.error(err?.response?.data?.detail || "Faylni yuborishda xatolik yuz berdi");
                }
            });
            clearStates();
            return;
        }
        if (!trimmedMessage) return;
        if (edit) {
            updateMessage(newMessage, edit.id);
            setEdit(null);
        } else {
            sendMessage(newMessage);
            startTimeout(scrollToBottom, 100);
        }
        clearStates();
    };
    const customRequest = ({ file , onSuccess , onProgress  })=>{
        const uid = file.uid;
        setFileList([
            {
                uid: uid,
                name: file.name,
                status: "uploading",
                percent: 0,
                size: file.size
            }, 
        ]);
        // Defer file storage to avoid blocking
        requestIdleCallback(()=>{
            fileMapRef.current.set(uid, file);
            simulateUpload(uid, onSuccess, onProgress);
        }, {
            timeout: 100
        });
    };
    const simulateUpload = (uid, onSuccess, onProgress)=>{
        let progress = 0;
        const interval = setInterval(()=>{
            progress += 10;
            onProgress({
                percent: progress
            });
            setFileList((prev)=>prev.map((f)=>f.uid === uid ? {
                        ...f,
                        percent: progress,
                        status: progress >= 100 ? "done" : "uploading"
                    } : f));
            if (progress >= 100) {
                clearInterval(interval);
                onSuccess("ok");
            }
        }, 150);
    };
    const handleRemove = (file)=>{
        setFileList((prev)=>prev.filter((f)=>f.uid !== file.uid));
        fileMapRef.current.delete(file.uid);
    };
    const handleKeyPress = (e)=>{
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (edit) {
            setNewMessage(edit.content);
        }
    }, [
        edit
    ]);
    const canSubmit = edit ? newMessage.trim() !== edit.content && newMessage.trim() !== "" : fileList.length && fileList[0]?.status === "done" || newMessage.trim() !== "";
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                onClick: scrollToBottom,
                className: (_style_chat_module_scss__WEBPACK_IMPORTED_MODULE_16___default().chat_down_icon),
                style: {
                    transform: openDownIcon ? "translateX(0)" : "translateX(100px)"
                },
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__.ArrowDownOutlined, {
                    size: 20
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Upload, {
                listType: "picture",
                customRequest: customRequest,
                fileList: fileList,
                onRemove: handleRemove,
                multiple: false,
                maxCount: 1,
                showUploadList: {
                    showPreviewIcon: false,
                    showDownloadIcon: false
                },
                beforeUpload: (file)=>{
                    if (file.size > maxSize) {
                        antd__WEBPACK_IMPORTED_MODULE_2__.message.error("Fayl hajmi 50MB dan oshmasligi kerak");
                        return antd__WEBPACK_IMPORTED_MODULE_2__.Upload.LIST_IGNORE;
                    }
                    return true;
                },
                className: `chat-file-uploader ${fileList.length ? "has-files" : "no-files"}`,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
                    type: "primary",
                    icon: "\uD83C\uDF1B",
                    ref: fileInputRef,
                    style: {
                        display: "none"
                    },
                    children: "Upload"
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_style_chat_module_scss__WEBPACK_IMPORTED_MODULE_16___default().chat_input_box),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Tooltip, {
                        title: "Maxsus buyurtma berish",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
                            type: "primary",
                            icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__.ShoppingCartOutlined, {}),
                            iconPosition: "end",
                            onClick: ()=>setOpen(true)
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Tooltip, {
                        title: "Fayl yuborish",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
                            icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__.PaperClipOutlined, {}),
                            type: "primary",
                            shape: "circle",
                            onClick: handleClickAttach,
                            disabled: edit != null,
                            loading: fileList?.[0]?.status == "uploading"
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(TextArea, {
                        value: newMessage,
                        disabled: isMessageWithFilePending,
                        onChange: (e)=>setNewMessage(e.target.value),
                        onKeyDown: handleKeyPress,
                        autoSize: {
                            minRows: 1,
                            maxRows: 6
                        },
                        placeholder: edit ? "Xabarni tahrir qilyapsiz..." : "Xabar yozing...",
                        className: (_style_chat_module_scss__WEBPACK_IMPORTED_MODULE_16___default().chat_input)
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
                        type: "primary",
                        disabled: !canSubmit,
                        onClick: handleSend,
                        children: fileList?.[0]?.status == "uploading" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Spin, {
                            percent: fileList?.[0]?.percent || 0,
                            className: "chat-file-upload-indicator"
                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__.SendOutlined, {
                            style: {
                                fontSize: "20px"
                            }
                        })
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_shared_components_modals_CreateOrderModal__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {
                open: open,
                onClose: ()=>setOpen(false),
                id: chat?.opponent?.id,
                seller: chat?.opponent?.name,
                sellerInfo: chat?.opponent
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.memo)(ChatWindow));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2123:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _shared_utilities_TextSlicer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3396);
/* harmony import */ var _shared_utilities_useResponsive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6603);





const SafetyAlert = ()=>{
    const { 0: visible , 1: setVisible  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { isMobile  } = (0,_shared_utilities_useResponsive__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const dismissed = localStorage.getItem("safetyAlertDismissed");
        if (!dismissed) {
            setVisible(true);
        }
    }, []);
    const handleClose = ()=>{
        setVisible(false);
        localStorage.setItem("safetyAlertDismissed", "true");
    };
    if (!visible) return null;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Alert, {
        className: "mb-3 w-100",
        description: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_shared_utilities_TextSlicer__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
            bio: "Ogohlantirish! Sayt tashqarisida to‘lov yoki ma’lumot almashish xavfli. Platforma bunday holatlar uchun mas’ul emas. Har doim suhbat va to‘lovlarni platforma ichida bajaring.",
            len: isMobile ? 50 : 100000
        }),
        type: "warning",
        showIcon: true,
        closable: true,
        onClose: handleClose
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SafetyAlert);


/***/ }),

/***/ 696:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "e": () => (/* binding */ truncateTitle)
/* harmony export */ });
/* unused harmony export TruncateText */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const truncateTitle = (title, maxLength = 7)=>{
    if (!title) return "";
    return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
};
const TruncateText = ({ text , lines =1 , as: Component = "span" , className ="" , ...props })=>{
    const baseStyle = lines === 1 ? {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        wordBreak: "break-all",
        overflowWrap: "anywhere"
    } : {
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: String(lines),
        overflow: "hidden",
        wordBreak: "break-all",
        overflowWrap: "anywhere"
    };
    return /*#__PURE__*/ _jsx(Component, {
        className: className,
        style: baseStyle,
        title: text,
        ...props,
        children: text
    });
};


/***/ }),

/***/ 5211:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_": () => (/* binding */ sleep)
/* harmony export */ });
async function sleep(ms = 1000) {
    let timing;
    return new Promise((resolve)=>{
        timing = setTimeout(()=>{
            clearTimeout(timing);
            resolve();
        }, ms);
    });
}


/***/ })

};
;
//# sourceMappingURL=7057.js.map