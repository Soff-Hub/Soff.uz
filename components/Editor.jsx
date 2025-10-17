import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Create a wrapper component that handles the imports properly
const CKEditorWrapper = dynamic(
    async () => {
        const { CKEditor } = await import('@ckeditor/ckeditor5-react');
        const ClassicEditor = (
            await import('@ckeditor/ckeditor5-build-classic')
        ).default;

        return function EditorComponent({
            onChange,
            value,
            name,
            placeholder,
        }) {
            return (
                <div className="editor-wrapper">
                    <CKEditor
                        editor={ClassicEditor}
                        name={name}
                        data={value || ''}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            onChange(data);
                        }}
                        config={{
                            placeholder: placeholder || 'Start typing...',
                            toolbar: [
                                'heading',
                                '|',
                                'bold',
                                'italic',
                                'link',
                                'bulletedList',
                                'numberedList',
                                '|',
                                'outdent',
                                'indent',
                                '|',
                                'blockQuote',
                                '|',
                                'undo',
                                'redo',
                            ],
                        }}
                        onReady={(editor) => {
                            // Set height for the editor content area
                            const editable = editor.ui.getEditableElement();
                            if (editable) {
                                editable.style.minHeight = '200px';
                                editable.style.maxHeight = '350px';
                                editable.style.overflowY = 'auto';
                            }
                        }}
                    />
                    <style jsx>{`
                        .editor-wrapper :global(.ck-editor) {
                            width: 100%;
                        }

                        .editor-wrapper :global(.ck-editor__editable) {
                            min-height: 200px !important;
                            max-height: 350px !important;
                            overflow-y: auto !important;
                        }

                        .editor-wrapper :global(.ck-placeholder) {
                            margin: 0px !important;
                        }

                        .editor-wrapper :global(.ck-content p) {
                            margin: 0px !important;
                        }

                        .editor-wrapper :global(.ck-content) {
                            min-height: 200px !important;
                            max-height: 350px !important;
                            overflow-y: auto !important;
                            padding: 16px !important;
                            font-size: 14px !important;
                            line-height: 1.5 !important;
                        }
                    `}</style>
                </div>
            );
        };
    },
    {
        ssr: false,
        loading: () => (
            <div
                style={{
                    height: '200px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '6px',
                    padding: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fafafa',
                    color: '#666',
                }}>
                Loading editor...
            </div>
        ),
    }
);

function Editor({ onChange, value, name, placeholder }) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Don't render anything on server side
    if (!isClient) {
        return (
            <div
                style={{
                    height: '200px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '6px',
                    padding: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fafafa',
                    color: '#666',
                }}>
                Loading editor...
            </div>
        );
    }

    return (
        <CKEditorWrapper
            onChange={onChange}
            value={value}
            name={name}
            placeholder={placeholder}
        />
    );
}

export default Editor;
