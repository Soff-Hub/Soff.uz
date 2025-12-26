// import React, { useState, useRef } from 'react';
// import dynamic from 'next/dynamic';
// import { Input, Popover, Button } from 'antd';
// import { SmileOutlined } from '@ant-design/icons';
// import styles from './emoji-textarea.module.scss';

// // 1. Heavy component loaded only on the client side
// const Picker = dynamic(() => import('emoji-picker-react'), {
//     ssr: false,
//     loading: () => <div className={styles.loadingPlaceholder}>Loading...</div>,
// });

// const { TextArea } = Input;

// const EmojiTextArea = ({ placeholder = 'Type a message...', ...props }) => {
//     const [text, setText] = useState('');
//     const textAreaRef = useRef<any>(null);

//     // 2. Handle Emoji Insertion at Cursor Position
//     const onEmojiClick = (emojiData: any) => {
//         console.log('Full Emoji Object:', emojiData);
//         alert('You clicked: ' + emojiData.emoji);
//         const textarea = textAreaRef.current?.resizableTextArea?.textArea;
//         const start = textarea.selectionStart;
//         const end = textarea.selectionEnd;

//         const newText =
//             text.substring(0, start) + emojiData.emoji + text.substring(end);

//         setText(newText);

//         // Optional: Bring focus back to the textarea after picking an emoji
//         setTimeout(() => {
//             textarea.focus();
//             textarea.setSelectionRange(
//                 start + emojiData.emoji.length,
//                 start + emojiData.emoji.length
//             );
//         }, 0);
//     };

//     const pickerContent = (
//         <Picker
//             onEmojiClick={onEmojiClick}
//             skinTonesDisabled
//             searchPlaceholder="Search emojis..."
//             width={350}
//             height={400}
//         />
//     );

//     return (
//         <div style={{ position: 'relative', width: '100%' }}>
//             <TextArea
//                 {...props}
//                 rows={3}
//                 ref={textAreaRef}
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//                 placeholder={placeholder}
//                 style={{
//                     paddingBottom: '45px',
//                     borderRadius: '8px',
//                     fontFamily:
//                         '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
//                 }}
//             />

//             {/* 3. The Absolute Positioned Trigger */}
//             <div
//                 style={{
//                     position: 'absolute',
//                     right: '12px',
//                     bottom: '8px',
//                     zIndex: 5,
//                 }}>
//                 <Popover
//                     content={pickerContent}
//                     trigger="click"
//                     placement="topRight"
//                     overlayInnerStyle={{ padding: 0 }} // Removes default white padding around the picker
//                     destroyTooltipOnHide>
//                     <Button
//                         type="text"
//                         shape="circle"
//                         icon={
//                             <SmileOutlined
//                                 style={{ fontSize: '22px', color: '#888' }}
//                             />
//                         }
//                         className="emoji-trigger-btn"
//                     />
//                 </Popover>
//             </div>
//         </div>
//     );
// };

// const RichEmojiInput = ({ onEmojiSelect }: { onEmojiSelect: any }) => {
//     const editableRef = useRef(null);

//     const insertEmoji = (imageUrl: string) => {
//         const img = `<img src="${imageUrl}" style="width: 20px; height: 20px; vertical-align: middle;" />`;

//         // This inserts the image HTML directly into the editable area
//         document.execCommand('insertHTML', false, img);
//     };

//     return (
//         <div
//             ref={editableRef}
//             contentEditable
//             style={{
//                 border: '1px solid #d9d9d9',
//                 borderRadius: '8px',
//                 padding: '12px',
//                 minHeight: '100px',
//                 backgroundColor: '#fff',
//                 outline: 'none',
//                 overflowY: 'auto',
//             }}
//             placeholder="Type here..."
//         />
//     );
// };

// export default EmojiTextArea;

'use client';

import React, { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Popover, Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

const EmojiComposer = () => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);
    const lastSelection = useRef<Range | null>(null);

    // 1. Function to remember WHERE the cursor was
    const saveSelection = () => {
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
            lastSelection.current = sel.getRangeAt(0);
        }
    };

    const onEmojiClick = (emojiData: any) => {
        if (!editorRef.current) return;

        const imgHtml = `<img src="${emojiData.imageUrl}" alt="${emojiData.emoji}" style="width: 22px; height: 22px; margin: 0 2px; vertical-align: middle;" data-emoji="${emojiData.emoji}" />`;

        // 2. Restore the cursor position
        const sel = window.getSelection();
        if (lastSelection.current && sel) {
            sel.removeAllRanges();
            sel.addRange(lastSelection.current);
        } else {
            editorRef.current.focus();
        }

        // 3. Insert the emoji
        document.execCommand('insertHTML', false, imgHtml);

        // 4. Update the "last selection" to be right AFTER the new emoji
        saveSelection();

        setIsPlaceholderVisible(false);
    };

    return (
        <div style={{ position: 'relative', width: '100%' }}>
            <div
                ref={editorRef}
                contentEditable
                // Save selection whenever the user clicks or types
                onKeyUp={saveSelection}
                onMouseUp={saveSelection}
                onInput={(e) => {
                    const text = e.currentTarget.textContent || '';
                    const hasImages =
                        e.currentTarget.getElementsByTagName('img').length > 0;
                    setIsPlaceholderVisible(text.length === 0 && !hasImages);
                    saveSelection();
                }}
                style={{
                    border: '1px solid #d9d9d9',
                    borderRadius: '8px',
                    padding: '12px 12px 45px 12px',
                    minHeight: '100px',
                    outline: 'none',
                    backgroundColor: '#fff',
                    fontSize: '16px',
                    lineHeight: '1.5',
                    whiteSpace: 'pre-wrap', // Preserves spaces and line breaks
                    wordBreak: 'break-word',
                }}
            />

            {isPlaceholderVisible && (
                <span
                    style={{
                        position: 'absolute',
                        left: '13px',
                        top: '12px',
                        color: '#bfbfbf',
                        pointerEvents: 'none',
                    }}>
                    Type a message...
                </span>
            )}

            <div style={{ position: 'absolute', right: '12px', bottom: '8px' }}>
                <Popover
                    content={<Picker onEmojiClick={onEmojiClick} />}
                    trigger="click"
                    placement="topRight"
                    onOpenChange={(open) => {
                        // If the user clicks the popover button, save selection one last time
                        if (open) saveSelection();
                    }}>
                    <Button
                        type="text"
                        shape="circle"
                        icon={
                            <SmileOutlined
                                style={{ fontSize: '22px', color: '#888' }}
                            />
                        }
                    />
                </Popover>
            </div>
        </div>
    );
};

export default EmojiComposer;
