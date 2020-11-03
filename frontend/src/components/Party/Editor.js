import React, { Component } from "react";
import ReactQuill, { Quill } from "react-quill";
import 'react-quill/dist/quill.snow.css';

// #1 import quill-image-uploader
import ImageUploader from "quill-image-uploader";

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
          formData.append("image", file);

          fetch(
            "https://api.imgbb.com/1/upload?key=d36eb6591370ae7f9089d85875e56b22",
            {
              method: "POST",
              body: formData
            }
          )
            .then(response => response.json())
            .then(result => {
              console.log(result);
              resolve(result.data.url);
            })
            .catch(error => {
              reject("Upload failed");
              console.error("Error:", error);
            });
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
