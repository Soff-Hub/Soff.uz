import React, { useEffect, useRef } from 'react';

export default function CKeditor({ onChange, editorLoaded, name, value }) {
    const editorRef = useRef();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            editorRef.current = {
                CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
                ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
            };
        }
    }, []);

    return (
        <>
            {editorLoaded && editorRef.current ? (
                <editorRef.current.CKEditor
                    type=""
                    name={name}
                    editor={editorRef.current.ClassicEditor}
                    data={value}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        onChange(data);
                    }}
                />
            ) : (
                <div>Editor loading</div>
            )}
        </>
    );
}
