import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Editor from 'components/Party/Editor';
import multipart from 'utils/multipart';

function PartyUpdate(props) {

  const { preview, setPreview } = useState('');

  function getContents(text) {
    console.log('text', text);
    this.setState({ editorData: text });
  }

  function uploadImage(e) {
    // console.log(e);
    // console.log(e.target.files[0]);
    // console.log(e.target.image);
    this.setState({ preview: URL.createObjectURL(e.target.files[0]) });
    const formDate = new FormData();
    formDate.append('file', e.target.files[0]);
    multipart.post('/hobby/chimi/image', formDate)
      .then(({ data }) => {
        console.log(data);
        this.setState({ image: data });
      }).catch((err) => {
        console.log(err);
      });
  }

  function submit(e) {
    e.preventDefault();
    console.log('submit');
  }

  return (
    <>
      파티 수정 페이지
      <form onSubmit={submit}>
        <div className="row">
          {/** 대표 이미지 */}
          <div className="col-md-5 col-12" style={{ width: "15%", height: "15%" }}>
            {preview !== '' &&
              < img alt="Thumbnail" src={preview} style={{ width: "300px", height: "300px" }} />
            }
            <input type="file" name="image"
              accept=".jpg, .jpeg, .png"
              onChange={uploadImage}
            />
          </div>
          {/** 입력창 */}
          <div className="col-md-7 col-12">
            <div className="row">
              <input type="text" name="name" placeholder="파티 제목" className="col-8" />
              <input type="text" name="summary" placeholder="파티 요약" className="col-8" />
              <select name="category">
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
              </select>
              <input type="number" name="totalnum" placeholder="모집 인원" className="col-8" />
              <div>취미 시작 날짜 : <input type="date" name="startdate" /></div>
            </div>
          </div>
        </div>
        {/** 글쓰기 에디터 */}
        <div style={{ height: "250px", margin: "3rem 0 5rem 0" }}>
          <Editor getContents={getContents} />
        </div>
        <div style={{ textAlign: "center" }}>
          <input type="submit" value="수정하기" />
          <input type="reset" value="취소하기"
            onClick={() => props.history.push('/party')} />
        </div>
      </form>
    </>
  )
}

export default withRouter(PartyUpdate);
