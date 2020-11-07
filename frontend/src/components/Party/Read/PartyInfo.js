import React, { Component } from 'react';
import PartyRegister from './PartyRegister';
import PartyMembers from './PartyMembers';

class PartyInfo extends Component {
  render() {
    return (
      <>
        <div className='row'>
          <div className='col-md-5 col-8'>
            사진
          </div>
          <div className='col-md-7 col-8'>
            {this.props.data.chimi !== undefined &&
              <h1>{this.props.data.chimi.name}</h1> &&
              <div>
                설명 : {this.props.data.chimi.summary} <br></br>
                카테고리 : {this.props.data.chimi.category} <br></br>
                모집인원 : {this.props.data.chimi.totalnum} <br></br>
                현재 신청 인원 : {this.props.data.chimi.curnum} <br></br>
              </div>
            }
            {this.props.type === 1 && <PartyRegister />}
            {this.props.type === 2 && <PartyMembers />}
          </div>
        </div>
      </>
    )
  }
}

export default PartyInfo;
