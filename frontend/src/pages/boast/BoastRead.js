import React, { Component } from 'react';
import BoastComment from '../../components/Boast/Read/BoastComment';

class BoastRead extends Component {
  render() {
    return (
      <>
        자랑하기 읽기
        <div>
          사진
        </div>
        <div>
          글
        </div>
        <div>
          조회수 등등
        </div>
        <div>
          <BoastComment></BoastComment>
        </div>
      </>
    );
  }
}

export default BoastRead;
