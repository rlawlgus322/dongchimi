import React, { Component } from 'react';
import Editor from '../../components/Party/Editor';

class PartyWrite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorData: '',
    }
  }

  getContents(text) {
    console.log('text', text);
    this.setState({ editorData: text });
  }

  render() {
    return (
      <>
        파티 글쓰기 페이지
        <form>
          <div className="row">
            {/** 대표 이미지 */}
            <div className="col-md-5 col-12">
              hihi
          </div>
            {/** 입력창 */}
            <div className="col-md-7 col-12">
              hihi
          </div>
          </div>
          {/** 글쓰기 에디터 */}
          <Editor getContents={this.getContents.bind(this)} />
          <button>등록하기</button>
        </form>
      </>
    )
  }
}

export default PartyWrite;