import React, { Component } from 'react';
import PartyInfo from '../../components/Party/Read/PartyInfo';
import PartyOpener from '../../components/Party/Read/PartyOpener';
import PartyPlan from '../../components/Party/Read/PartyPlan';
import PartyComment from '../../components/Party/Read/PartyComment';

class PartyRead extends Component {

  render() {
    // 통신하여 상세결과값 가져오기
    const data = { id: '1', bangjang: 'a', name: '뜨개질', desc: '뜨개질하자', total: '1', stars: '6', views: '1', imgSrc: 'https://lab.ssafy.com/s03-final/s03p31a409/uploads/3960e6fd2eed33ded85590499d95b729/7FB9DDA2-C9B7-473B-BD78-282A33AA084F-9716-000009E931E8FB4C_file.jpg', };
    console.log(this.props.match.params.id);

    return (
      <>
        <PartyInfo
          type={1}
          data={data}
        ></PartyInfo>
        <button
          onClick={() => this.props.history.push('/party/update')}
        >수정</button>
        <div className='row'>
          <div className='col-6'>
            <PartyOpener></PartyOpener>
            <PartyPlan></PartyPlan>
          </div>
          <div className='col-6'>
            <PartyComment></PartyComment>
          </div>
        </div>
      </>
    )
  }
}

export default PartyRead;