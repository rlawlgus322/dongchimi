import React, { Component } from 'react';
import PartyRegister from './PartyRegister';
import PartyMembers from './PartyMembers';


class PartyInfo extends Component {
  render() {
    const type = this.props.type; // 1-신청시상세, 2-신청후
    console.log(type);
    let comp;
    if (type === 1) comp = <PartyRegister></PartyRegister>
    else comp = <PartyMembers></PartyMembers>
    return (
      <div>
        <div className='row'>
          <div className='col-md-5 col-8'>
            사진
          </div>
          <div className='col-md-7 col-8'>
            <h1>{this.props.data.name}</h1>
            <div>
              설명 : {this.props.data.desc} <br></br>
              해시태그 <br></br>
              모임기간 <br></br>
              모집인원 : {this.props.data.total} <br></br>
            </div>
            {comp}
          </div>
        </div>
      </div>
    )
  }
}

export default PartyInfo;
