// pages/index.js
import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function MyEditor() {
  const handleChange = (event, editor) => {
    const data = editor.getData();
    console.log({ data });
  };

  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        onChange={handleChange}
      />
    </div>
  );
}

export default MyEditor;
