// pages/index.js
import React, { useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function MyEditor() {
  const handleChange = (event, editor) => {
    const data = editor.getData();
    console.log('wordGenerator', { data } );
  };
  // useEffect(() => {
  //   import('@ckeditor/ckeditor5-react').then(({ CKEditor }) => {
  //     CKEditor.create(document.querySelector('#editor')); // Replace 'editor' with your own element ID
  //   });
  // },[])

  return (
    <div id="editor">
      <CKEditor
        editor={ClassicEditor}
        onChange={handleChange}
      />
    </div>
  );
}

export default MyEditor;
