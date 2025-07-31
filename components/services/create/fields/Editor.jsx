import React from 'react';

export default function Editor({ onChange, editorLoaded, name, value, error, placeholder }) {
    const CKEditor = require('@ckeditor/ckeditor5-react').CKEditor;
    const ClassicEditor = require('@ckeditor/ckeditor5-build-classic');


    return (
        editorLoaded ? <div style={{ border: `1px solid ${error ? 'red' : 'transparent'}`, height: '100%' }}>
            <CKEditor
                editor={ClassicEditor}
                name={name}
                data={value}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange(data);
                }}
                onReady={(editor) => {
                        editor.editing.view.change(writer => {
                            writer.setStyle("min-height", "200px", editor.editing.view.document.getRoot());
                        });
                    }}
                style={{ height: '200px' }}
                config={{
                    placeholder,
                }}
            />
        </div> : 'Loading...'
    );
}