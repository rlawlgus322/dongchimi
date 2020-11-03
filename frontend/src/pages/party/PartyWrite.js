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

  submit(e) {
    e.preventDefault();
    console.log('submit');
  }

  render() {
    return (
      <>
        파티 글쓰기 페이지
        <form onSubmit={this.submit}>
          <div className="row">
            {/** 대표 이미지 */}
            <div className="col-md-5 col-12">
              hihi
            </div>
            {/** 입력창 */}
            <div className="col-md-7 col-12">
              <div className="row">
                <input type="text" placeholder="파티 제목" className="col-8" />
                <input type="text" placeholder="파티 요약" className="col-8" />
                <input type="text" placeholder="파티 요약" className="col-8" />
                <input type="date" placeholder="모집 기간" className="col-8" />
                <input type="text" placeholder="모임 시간" className="col-8" />
                <input type="number" placeholder="모집 인원" className="col-8" />
              </div>
            </div>
          </div>
          {/** 글쓰기 에디터 */}
          <Editor getContents={this.getContents.bind(this)} />
          <input type="submit" value="등록하기" />
          <input type="reset" value="취소하기" />
        </form>
      </>
    )
  }
}

export default PartyWrite;