import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Editor from 'components/Party/Editor';
import api from 'utils/api';
import multipart from 'utils/multipart';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const PartyWriteBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80vw;
  margin: 0 10vw;
  min-height: 100vh;
  padding-top: 20px;
  box-sizing:border-box;
`;

const ImageInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  border: none;
  clip: rect(0, 0, 0, 0);
  margin: --1px;
`;

const ImageLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30vw;
  height: 50vh;
  background-color: rgba(0, 0, 0, 0.2);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
  opacity: 0.8;
  &:hover {
    opacity: 0.5;
  }
`;

const EditorDiv = styled.div`
  width: 60vw;
  min-height: 40vh;
  margin: 15px 0;
`;

const InputDiv = styled.div`
  width: 50vw;
  margin: 10px;
`;

const PartyLabel = styled.label`
  font-family:'NanumSquare', sans-serif;
  color: #037c5e;
  font-size: 1.3em;
  letter-spacing: 2px;
  width: 9vw;
`;

const PartyInput = styled.input`
  background: #d0e7ce;
  width: 30vw;
  color: black;
  border: none;
  border-bottom: 1px solid #f6f6f6;
  padding: 9px;
  ::placeholder {
    color:  white;
    letter-spacing: 2px;
    font-size: 1.3em;
    font-weight: 400;
  }
  :focus {
    color: #053101;
    outline: none;
    border-bottom: 1.2px solid #080591;
    font-size: 1em;
    transition: .8s all ease;
  }
  :focus::placeholder {
    opacity: 0;
  }
`;

const PartySelect = styled.select`
  background: #d0e7ce;
  width: 30vw;
  color: black;
  border: none;
  border-bottom: 1px solid #f6f6f6;
  padding: 9px;
  :focus {
    color: #053101;
    outline: none;
    border-bottom: 1.2px solid #080591;
    font-size: 1em;
    transition: .8s all ease;
  }
`;

const PartyButton = styled.input`
  padding: 12px;
  font-family: 'NanumSquare', sans-serif;
  letter-spacing: 3px;
  font-size: 1.3rem;
  border-radius: 10px;
  margin: 0 10px;
  outline: none;
  background: white;
  :hover {
    background: #037c5e;
    color:  #f6f6f6;
    transition: background-color 1s ease-out;
  }
`;

class PartyWrite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorData: '',
      token: sessionStorage.getItem('token'),
      preview: '',
      image: '',
    }
  }

  getContents(text) {
    // console.log('text', text);
    this.setState({ editorData: text });
  }

  submit(e) {
    e.preventDefault();
    api.post('/hobby/chimi', {
      category: e.target.category.value,
      description: this.state.editorData,
      image: this.state.image,
      name: e.target.name.value,
      summary: e.target.summary.value,
      totalnum: e.target.totalnum.value,
      startdate: e.target.startdate.value,
    }, {
      headers: {
        accessToken: sessionStorage.getItem('token')
      }
    }).then((res) => {
      // console.log(res);
      toast.success('✅ 파티 등록 완료', {
        position: "bottom-right",
        autoClose: 3000,
      })
      this.props.history.push('/party');
    }).catch((err) => {
      toast.error('😢 파티 등록 실패', {
        position: "bottom-right",
        autoClose: 3000,
      })
      console.log(err);
    })
  }

  uploadImage(e) {
    const preview = document.getElementById('preview');
    preview.style.backgroundImage = `url(${URL.createObjectURL(e.target.files[0])})`;
    const formDate = new FormData();
    formDate.append('file', e.target.files[0]);
    multipart.post('/hobby/chimi/image', formDate)
      .then(({ data }) => {
        // console.log(data);
        this.setState({ image: data });
      }).catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <PartyWriteBody>
        <form onSubmit={this.submit.bind(this)}>
          <div className="row">
            {/** 대표 이미지 */}
            <div className="col-md-5 col-12">
              <ImageLabel htmlFor="imageInput" id="preview">대표 이미지</ImageLabel>
              <ImageInput type="file" name="image" id="imageInput"
                accept=".jpg, .jpeg, .png, .gif"
                onChange={this.uploadImage.bind(this)}
              />
            </div>
            {/** 입력창 */}
            <div className="col-md-7 col-12">
              <InputDiv>
                <PartyLabel htmlFor="title">파티 이름</PartyLabel>
                <PartyInput type="text" name="name" id="title" placeholder="파티 이름" className="col-8" />
              </InputDiv>
              <InputDiv>
                <PartyLabel htmlFor="summary">파티 요약</PartyLabel>
                <PartyInput type="text" name="summary" id="summary" placeholder="파티 요약" className="col-8" />
              </InputDiv>
              <InputDiv>
                <PartyLabel htmlFor="category">카테고리</PartyLabel>
                <PartySelect name="category" id="category">
                  <option value="유화">유화</option>
                  <option value="수채화">수채화</option>
                  <option value="파스텔">파스텔</option>
                  <option value="가죽">가죽</option>
                  <option value="뜨개질">뜨개질</option>
                  <option value="비즈">비즈</option>
                  <option value="일러스트">일러스트</option>
                  <option value="이모티콘">이모티콘</option>
                  <option value="편집">편집</option>
                  <option value="촬영">촬영</option>
                  <option value="한식">한식</option>
                  <option value="양식">양식</option>
                  <option value="일식">일식</option>
                  <option value="중식">중식</option>
                  <option value="세계음식">세계음식</option>
                  <option value="헬스">헬스</option>
                  <option value="홈트">홈트</option>
                  <option value="다이어트">다이어트</option>
                  <option value="작곡">작곡</option>
                  <option value="작사">작사</option>
                  <option value="타악기">타악기</option>
                  <option value="현악기">현악기</option>
                  <option value="관악기">관악기</option>
                  <option value="댄스">댄스</option>
                </PartySelect>
              </InputDiv>
              <InputDiv>
                <PartyLabel htmlFor="totalnum">모집 인원</PartyLabel>
                <PartyInput type="number" name="totalnum" id="totalnum" placeholder="모집 인원" className="col-8" />
              </InputDiv>
              <InputDiv>
                <PartyLabel htmlFor="startdate">시작 날짜</PartyLabel>
                <PartyInput type="date" name="startdate" id="startdate" />
              </InputDiv>
            </div>
          </div>
          {/** 글쓰기 에디터 */}
          <EditorDiv>
            <Editor getContents={this.getContents.bind(this)} />
          </EditorDiv>
          <div style={{ textAlign: "center" }}>
            <PartyButton type="submit" value="등록하기" />
            <PartyButton type="reset" value="취소하기"
              onClick={() => this.props.history.push('/party')} />
          </div>
        </form>
      </PartyWriteBody>
    )
  }
}

export default withRouter(PartyWrite);
