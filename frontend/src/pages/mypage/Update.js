import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import palette from '../../lib/styles/palette';
import api from '../../utils/api';
import multipart from '../../utils/multipart';
import { Button } from 'react-bootstrap'

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
  }
`;

// const StyledInput = styled.input`
//   font-size: 1.25rem;
//   border: none;
//   border-bottom: 1px solid ${palette.gray[5]};
//   padding-bottom: 0.5rem
//   outline: none;
//   width: 100%;
//   %:focus {
//     color $oc-teal-7;
//     border-bottom: 1px solid ${palette.gray[7]};
//   }
//   & + & {
//     margin-top: 1rem;
//   }
// `;

class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: '',
      nickname: '',
      image: '',
      preview: '',
    }
  }

  componentDidMount() {
    const fetchUserinfo = () => {
      const this_token = sessionStorage.getItem('token')
      api.get('auth/userinfo/', {
        headers: {
          accessToken: this_token,
        }
      })
      .then(res => {
        this.setState({userInfo: res.data});
        this.setState({nickname: res.data.nickname})
        // console.log("프로필이미지 " + res.data.profileImage)
        this.setState({preview: 'https://k3a409.p.ssafy.io' + res.data.profileImage})
        // console.log("유저인포 " + JSON.stringify(this.state.userInfo))
      })
      .catch(err => {
        console.log(err)
      })
    }
    fetchUserinfo()
  }


  // useEffect(() => {
  //   const fetchUserinfo = () => {
  //     const this_token = sessionStorage.getItem('token')
  //     api.get('auth/userinfo/', {
  //       headers: {
  //         accessToken: this_token,
  //       }
  //     })
  //     .then(res => {
  //       this.setState({userInfo: res.data});
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  //   }
  //   fetchUserinfo()
  // }, [])

  uploadImage(e) {
    this.setState({ preview: URL.createObjectURL(e.target.files[0]) });
    const formDate = new FormData();
    formDate.append('file', e.target.files[0]);
    multipart.post('auth/userinfo/image', formDate, {
      headers: {
        accessToken: sessionStorage.getItem('token'),
      }
    })
    .then(({ data }) => {
      this.setState({ image: data });
    }).catch((err) => {
      console.log(err);
    });
  }

  setNickname(e) {
    // console.log('onchange nickname', e);
    this.setState({nickname: e.target.value})
  }

  nCheck(e) {
    e.preventDefault();
    // console.log(this.state.nickname)
    api.get(`auth/userinfo/isemail/${this.state.nickname}`)
    .then(({data}) => {
      if (data === true) alert("이미 존재하는 닉네임입니다.")
      else alert("사용 가능한 닉네임입니다.")
    })
    .catch(err => {
      console.log(err)
    })
  }

  changeNickname(e) {
    this.setNickname({nickname: e.target.value})
  }

  update(e) {
    e.preventDefault();
    api.post('auth/signup', {
      nickname: this.state.nickname,
      prefer1: e.target.category1.value,
      prefer2: e.target.category2.value,
      prefer3: e.target.category3.value,
      image: this.state.image
    }).then((res) => {
      alert("성공적으로 수정되었습니다.")
      // history.go(-1)
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
    api.post('auth/userinfo/image', {
      // updateimage
    })
  }

  del_user() {
    // console.log("회원탈퇴 " + this.state.userInfo.email)
    // alert("정말 탈퇴하시겠습니까?")
    api.delete(`auth/userinfo/${this.state.userInfo.eamil}`, {
      headers : {
        accessToken: sessionStorage.getItem('token'),
      }, email: this.state.userInfo.email
    })
    .then(res => {
      console.log(res)
      alert("탈퇴가 완료되었습니다.")
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <div className="col-md-5 col-12" style={{ width: "15%", height: "15%" }}>
              {this.state.preview !== '' &&
                <img src={this.state.preview} alt="" style={{ width: "300px", height: "300px" }} />
              }
              <input type="file" name="image"
                accept=".jpg, .jpeg, .png"
                onChange={this.uploadImage.bind(this)}
              />
            </div>
          </Col>
          <Col>
            <AuthFormBlock>
            <form onSubmit={this.update.bind(this)}>
              <div>이메일: {this.state.userInfo.email}</div>
              <div>이름: {this.state.userInfo.username}</div>
              <div>성별: {this.state.userInfo.gender === 1 ? "여성" : "남성"}</div>
              <div>닉네임: <input type="text" name="nickname" value={this.state.nickname}
                onChange={this.setNickname.bind(this)}
              /></div>
              <Button onClick={this.nCheck.bind(this)}>중복확인</Button>
              선호 카테고리
              <br/>
              <select name="category1">
                <option value={this.state.userInfo.prefer1}>{this.state.userInfo.prefer1}</option>
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
              <select name="category2" label={this.state.userInfo.prefer2}>
                <option value={this.state.userInfo.prefer2}>{this.state.userInfo.prefer2}</option>
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
              <select name="category3" label={this.state.userInfo.prefer3}>
                <option value={this.state.userInfo.prefer3}>{this.state.userInfo.prefer3}</option>
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
              <br/>
              <div className="submit_button">
                <input type="submit" value="수정" />
              </div>
              <Button onClick={this.del_user.bind(this)}>회원탈퇴</Button>
            </form>
            </AuthFormBlock>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default withRouter(Update);