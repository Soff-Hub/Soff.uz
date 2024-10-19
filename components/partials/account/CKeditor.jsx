import React from 'react';

export default function CKeditor({ onChange, editorLoaded, name, value, error }) {
    const CKEditor = require('@ckeditor/ckeditor5-react').CKEditor;
    const ClassicEditor = require('@ckeditor/ckeditor5-build-classic');


    return (
        <>
            <div style={{ border: `1px solid ${error ? 'red' : 'transparent'}` }}>
                <CKEditor
                    editor={ClassicEditor}
                    name={name}
                    data={value}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        onChange(data);
                    }}
                />
            </div>
        </>
    );
}
