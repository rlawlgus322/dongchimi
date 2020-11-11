import React, { Component } from "react";
import ReactQuill, { Quill } from "react-quill";
import 'react-quill/dist/quill.snow.css';

// #1 import quill-image-uploader
import ImageUploader from "quill-image-uploader";
import multipart from "../../utils/multipart";

// #2 register module
Quill.register("modules/imageUploader", ImageUploader);

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  modules = {
    // #3 Add "image" to the toolbar
    toolbar: [
      ["bold", "italic"],
      ['link', 'blockquote', 'image'],
      [{ list: 'ordered' }, { list: 'bullet' }]
    ],
    // # 4 Add module and upload function
    imageUploader: {
      upload: file => {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append("file", file);

          multipart.post('/hobby/chimi/image', formData)
            .then(({ data }) => {
              const url = "https://k3a409.p.ssafy.io" + data;
              resolve(url);
            }).catch((err) => {
              reject("Upload failed");
              console.log(err);
            })
        });
      }
    }
  };

  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  handleChange(value) {
    this.setState({ text: value });
    // console.log('handleChange', this.state.text);
    this.props.getContents(this.state.text);
  }

  render() {
    return (
      <ReactQuill
        style={{ height: "100%" }}
        theme="snow"
        modules={this.modules}
        formats={this.formats}
        value={this.state.text}
        onChange={this.handleChange.bind(this)}
      >
      </ReactQuill>
    );
  }
}

export default Editor;

