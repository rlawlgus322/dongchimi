import React, { Component } from 'react';
import Boasts from '../../components/Boast/List/Boasts';
// import { withRouter } from 'react-router-dom';
import api from 'utils/api';

const data = [
  {
    Boast: { bid: 1, userId: 'yunju', hid: 1, title: '뜨개질 성공', postImg: 'https://lab.ssafy.com/s03-final/s03p31a409/uploads/3960e6fd2eed33ded85590499d95b729/7FB9DDA2-C9B7-473B-BD78-282A33AA084F-9716-000009E931E8FB4C_file.jpg', contents: '', createdate: '2020-10-30', category: '', likes: 30, views: 10 },
    username: 'aa',
    profileImage: 'https://lab.ssafy.com/s03-final/s03p31a409/uploads/2a5a9ae107b0392968fccfc0dee82eaf/EDD47C76-370D-4107-B2D8-F7C545E04161-19054-00000F4DB910FE8B_file.jpg',
    isLiked: true,
  },
  {
    Boast: { bid: 2, userId: 'yunju', hid: 1, title: '뜨개질 성공', postImg: 'https://lab.ssafy.com/s03-final/s03p31a409/uploads/f5d5e8813f66f1b203a43d24cdeaad2e/DA87FE56-B1CD-454E-9B25-21795C025FA1-65880-000045972081C515_file.jpg', contents: '', createdate: '2020-10-30', category: '', likes: 30, views: 10 },
    username: 'bb',
    profileImage: 'https://lab.ssafy.com/s03-final/s03p31a409/uploads/2a5a9ae107b0392968fccfc0dee82eaf/EDD47C76-370D-4107-B2D8-F7C545E04161-19054-00000F4DB910FE8B_file.jpg',
    isLiked: false,
  },
  {
    Boast: { bid: 3, userId: 'yunju', hid: 1, title: '뜨개질 성공', postImg: 'https://lab.ssafy.com/s03-final/s03p31a409/uploads/efdbdecdd9a774dfc21f901d1dddd161/06092924-2FB5-4719-9749-0EDD5D99B7AF-70098-000043269120AC52_file.jpg', contents: '', createdate: '2020-10-30', category: '', likes: 30, views: 10 },
    username: 'cc',
    profileImage: 'https://lab.ssafy.com/s03-final/s03p31a409/uploads/2a5a9ae107b0392968fccfc0dee82eaf/EDD47C76-370D-4107-B2D8-F7C545E04161-19054-00000F4DB910FE8B_file.jpg',
    isLiked: false,
  },
  {
    Boast: { bid: 4, userId: 'yunju', hid: 1, title: '뜨개질 성공', postImg: 'https://lab.ssafy.com/s03-final/s03p31a409/uploads/efdbdecdd9a774dfc21f901d1dddd161/06092924-2FB5-4719-9749-0EDD5D99B7AF-70098-000043269120AC52_file.jpg', contents: '', createdate: '2020-10-30', category: '', likes: 30, views: 10 },
    username: 'dd',
    profileImage: 'https://lab.ssafy.com/s03-final/s03p31a409/uploads/2a5a9ae107b0392968fccfc0dee82eaf/EDD47C76-370D-4107-B2D8-F7C545E04161-19054-00000F4DB910FE8B_file.jpg',
    isLiked: true,
  },
  {
    Boast: { bid: 5, userId: 'yunju', hid: 1, title: '뜨개질 성공', postImg: 'https://lab.ssafy.com/s03-final/s03p31a409/uploads/efdbdecdd9a774dfc21f901d1dddd161/06092924-2FB5-4719-9749-0EDD5D99B7AF-70098-000043269120AC52_file.jpg', contents: '', createdate: '2020-10-30', category: '', likes: 30, views: 10 },
    username: 'ee',
    profileImage: 'https://lab.ssafy.com/s03-final/s03p31a409/uploads/2a5a9ae107b0392968fccfc0dee82eaf/EDD47C76-370D-4107-B2D8-F7C545E04161-19054-00000F4DB910FE8B_file.jpg',
    isLiked: false,
  },
]

class BoastList extends Component {
  state = {
    data: [],
  }

  componentDidMount() {
    api.get('/boast/all', {
      headers: {
        accessToken: sessionStorage.getItem('token'),
      }
    }).then(({ data }) => {
      console.log(data);
      this.setState(data);
    }).catch((err) => {
      console.log(err);
    })
  }

  render() {
    console.log('token', sessionStorage.getItem('token'));
    return (
      <>
        자랑하기
        <div style={{ textAlign: "right" }}>
          {/** 정렬 기준 */}
          정렬 기준
          <select>
            <option>최신순</option>
          </select>
          {
            sessionStorage.getItem('token') !== null &&
            <button
              onClick={() => this.props.history.push('/boast/write')}
            >글쓰기</button>
          }
        </div>
        <Boasts boasts={this.state.data}></Boasts>
      </>
    );
  }
}

export default BoastList;

