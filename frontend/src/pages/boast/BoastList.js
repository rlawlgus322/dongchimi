import React, { Component } from 'react';
import Boasts from '../../components/Boast/Boasts';
// import { withRouter } from 'react-router-dom';

const data = [
  {
    Boast: { bid: 1, userId: 'yunju', hid: 1, title: '뜨개질 성공', postImg: 'https://lab.ssafy.com/s03-final/s03p31a409/uploads/3960e6fd2eed33ded85590499d95b729/7FB9DDA2-C9B7-473B-BD78-282A33AA084F-9716-000009E931E8FB4C_file.jpg', contents: '', createdate: '2020-10-30', category: '', likes: 30, views: 10 },
    username: 'aa',
    isLiked: false,
  },
  {
    Boast: { bid: 1, userId: 'yunju', hid: 1, title: '뜨개질 성공', postImg: 'https://lab.ssafy.com/s03-final/s03p31a409/uploads/f5d5e8813f66f1b203a43d24cdeaad2e/DA87FE56-B1CD-454E-9B25-21795C025FA1-65880-000045972081C515_file.jpg', contents: '', createdate: '2020-10-30', category: '', likes: 30, views: 10 },
    username: 'bb',
    isLiked: false,
  },
  {
    Boast: { bid: 1, userId: 'yunju', hid: 1, title: '뜨개질 성공', postImg: 'https://lab.ssafy.com/s03-final/s03p31a409/uploads/efdbdecdd9a774dfc21f901d1dddd161/06092924-2FB5-4719-9749-0EDD5D99B7AF-70098-000043269120AC52_file.jpg', contents: '', createdate: '2020-10-30', category: '', likes: 30, views: 10 },
    username: 'cc',
    isLiked: false,
  },
  {
    Boast: { bid: 1, userId: 'yunju', hid: 1, title: '뜨개질 성공', postImg: 'https://lab.ssafy.com/s03-final/s03p31a409/uploads/efdbdecdd9a774dfc21f901d1dddd161/06092924-2FB5-4719-9749-0EDD5D99B7AF-70098-000043269120AC52_file.jpg', contents: '', createdate: '2020-10-30', category: '', likes: 30, views: 10 },
    username: 'dd',
    isLiked: false,
  },
  {
    Boast: { bid: 1, userId: 'yunju', hid: 1, title: '뜨개질 성공', postImg: 'https://lab.ssafy.com/s03-final/s03p31a409/uploads/efdbdecdd9a774dfc21f901d1dddd161/06092924-2FB5-4719-9749-0EDD5D99B7AF-70098-000043269120AC52_file.jpg', contents: '', createdate: '2020-10-30', category: '', likes: 30, views: 10 },
    username: 'ee',
    isLiked: false,
  },
]

class BoastList extends Component {
  render() {
    return (
      <>
        자랑하기
        <div style={{ textAlign: "right" }}>
          {/** 정렬 기준 */}
          정렬 기준
          <select>
            <option>최신순</option>
          </select>
          <button
            onClick={() => this.props.history.push('/boast/write')}
          >파티 만들기</button>
        </div>
        <Boasts boasts={data}></Boasts>
      </>
    );
  }
}

export default BoastList;
