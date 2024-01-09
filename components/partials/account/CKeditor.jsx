import React from 'react';

export default function CKeditor({ onChange, editorLoaded, name, value }) {
    const CKEditor = require('@ckeditor/ckeditor5-react').CKEditor;
    const ClassicEditor = require('@ckeditor/ckeditor5-build-classic');

    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //        setTimeout(() => {
    //         editorRef.current = {
    //             CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
    //             ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
    //         };
    //        }, 0)

    //     }
    // }, [editorRef?.current]);

    return (
        <>
            {/* {editorLoaded && editorRef?.current?.CKEditor && editorRef?.current?.ClassicEditor ? (
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
            )} */}
            <CKEditor
                editor={ClassicEditor}
                name={name}
                data={value}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange(data);
                }}
            />
        </>
    );
}
