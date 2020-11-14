import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Sdiv = styled.div`
  margin-bottom: 30px;
`;

const Bdiv = styled.div`
  cursor: pointer;
  text-align: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 280px;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
`;

const Mp = styled.p`
  margin: 0px;
`;

const ProfileImg = styled.img`
  height: 35px;
  margin: 5px 5px;
  border-radius: 100%;
`;

class Boast extends Component {
  render() {
    const path = JSON.parse(this.props.boast.boast.postImg)[0];
    const image = "https://k3a409.p.ssafy.io" + path;
    const backgroundImage = {
      backgroundImage: `url(${image})`,
    };
    return (
      <Sdiv className="col-md-4 col-lg-3 ">
        <Mp>
          <ProfileImg src={this.props.boast.profileImage} />
          {this.props.boast.nickname}
        </Mp>
        <Bdiv
          style={backgroundImage}
          onClick={() =>
            this.props.history.push(`/boast/${this.props.boast.boast.bid}`)
          }
        ></Bdiv>
        <div className="row">
          <div className="col-4" style={{ padding: "0 20px" }}>
            <FontAwesomeIcon icon={['far', 'eye']} />
            {this.props.boast.boast.views}
          </div>
          <div className="col-4" style={{ padding: "0 20px" }}>
            {
              this.props.liked === true ? <FontAwesomeIcon icon={['fas', 'heart']} /> : <FontAwesomeIcon icon={['far', 'heart']} />
            }
            {this.props.boast.boast.likes}
          </div>
          <div className="col-4" style={{ padding: "0 20px" }}>
            <FontAwesomeIcon icon={['fas', 'comment-dots']} />
          </div>
        </div>
        <Mp>{this.props.boast.boast.contents}</Mp>
      </Sdiv>
    );
  }
}

export default withRouter(Boast);
