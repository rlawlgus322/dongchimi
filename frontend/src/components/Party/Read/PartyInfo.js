import React, { Component } from 'react';
import PartyRegister from './PartyRegister';
import PartyMembers from './PartyMembers';


class PartyInfo extends Component {
  render() {
    return (
      <>
        <div className='row'>
          {
            this.props.data.chimi !== undefined &&
            <div className='col-md-5 col-8'
              style={{
                backgroundImage: `url(https://k3a409.p.ssafy.io${this.props.data.chimi.image !== null ? this.props.data.chimi.image : '/file/ed3b2a58-3a53-4b92-987d-b6cd2cf5dcf1.png'})`,
                textAlign: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "350px",
                position: "relative",
                overflow: "hidden",
              }}
            />
          }
          <div className='col-md-7 col-8'>
            {
              this.props.data.chimi !== undefined &&
              <h1>{this.props.data.chimi.name}</h1> &&
              <div>
                제목 : {this.props.data.chimi.name}<br></br>
                설명 : {this.props.data.chimi.summary} <br></br>
                카테고리 : {this.props.data.chimi.category} <br></br>
                모집인원 : {this.props.data.chimi.totalnum} <br></br>
                현재 신청 인원 : {this.props.data.chimi.curnum} <br></br>
              </div>
            }
            {this.props.type === 1 &&
              this.props.data.chimi !== undefined &&
              <PartyRegister data={this.props.data} />}
            {this.props.type === 2 &&
              this.props.data.chimi !== undefined &&
              <PartyMembers hid={this.props.data.chimi.hid} />}
          </div>
        </div>
      </>
    )
  }
}

export default PartyInfo;
