// pages/index.js
import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
var parse = require("html-react-parser");


function MyEditor() {
  const [data, setData] = useState('')
  const handleChange = (event, editor) => {
    const data = editor.getData();
    setData(parse(data))
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
      <div>{data}</div>
    </div>
  );
}

export default MyEditor;
