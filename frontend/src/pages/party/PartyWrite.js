import React, { Component } from 'react';
import Editor from '../../components/Party/Editor';
// import api from '../../utils/api';
import multipart from '../../utils/multipart';

class PartyWrite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorData: '',
      token: sessionStorage.getItem('token'),
      image: '',
    }
  }

  getContents(text) {
    // console.log('text', text);
    this.setState({ editorData: text });
  }

  submit(e) {
    e.preventDefault();
    console.log(e);
    console.log('token', this.state.token);
    console.log('editor data', this.state.editorData);
    console.log('submit');
  }

  uploadImage(e) {
    console.log(e);
    console.log(e.target.files[0]);
    console.log(e.target.image);
    const formDate = new FormData();
    formDate.append('file', e.target.files[0]);
    multipart.post('/hobby/chimi/image', formDate)
      .then(({ data }) => {
        console.log(data);
        this.setState({ image: data });
      }).catch((err) => {
        console.log(err);
      });
    // this.setState({ image: URL.createObjectURL(e.target.files[0]) });
  }

  render() {
    return (
      <>
        파티 글쓰기 페이지
        <form onSubmit={this.submit.bind(this)}>
          <div className="row">
            {/** 대표 이미지 */}
            <div className="col-md-5 col-12">
              <img src={this.state.image} />
              <input type="file" name="image"
                onChange={this.uploadImage.bind(this)}
              />
            </div>
            {/** 입력창 */}
            <div className="col-md-7 col-12">
              <div className="row">
                <input type="text" name="name" placeholder="파티 제목" className="col-8" />
                <input type="text" name="summary" placeholder="파티 요약" className="col-8" />
                <input type="date" placeholder="모집 기간" className="col-8" />
                <input type="text" placeholder="모임 시간" className="col-8" />
                <input type="number" name="totalnum" placeholder="모집 인원" className="col-8" />
              </div>
            </div>
          </div>
          {/** 글쓰기 에디터 */}
          <Editor getContents={this.getContents.bind(this)} />
          <input type="submit" value="등록하기" />
          <input type="reset" value="취소하기"
            onClick={() => this.props.history.push('/party')} />
        </form>
      </>
    )
  }
}

export default PartyWrite;