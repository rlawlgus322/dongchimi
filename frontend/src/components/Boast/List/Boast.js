import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Sdiv = styled.div`
  margin-bottom: 30px;
`;

const Tdiv = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
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

const Round = styled.div`
border-radius: 10px;
border : 3px solid #d0e7ce;
padding: 5px;
  :hover {
    border : 3px solid #7dbb77;
  }
`

const Mp = styled.p`
  margin: 10px;
  text-align :left;
`;

const ProfileImg = styled.img`
  height: 35px;
  margin: 5px 5px -5px;
  border-radius: 100%;
`;

const IconBox = styled.div`
  margin: 5px 10px;
  text-align: center;
`;

const Icon = styled.div`
  width: 33.3%;
`;

class Boast extends Component {
  render() {
    const path = JSON.parse(this.props.boast.boast.postImg)[0];
    let image = "https://k3a409.p.ssafy.io/file/ed3b2a58-3a53-4b92-987d-b6cd2cf5dcf1.png";
    if (path !== undefined) {
      image = "https://k3a409.p.ssafy.io" + path;
    }
    const backgroundImage = {
      backgroundImage: `url(${image})`,
    };
    let profileImage = "https://k3a409.p.ssafy.io/file/ed3b2a58-3a53-4b92-987d-b6cd2cf5dcf1.png";
    if (this.props.boast.profileImage !== "null") {
      profileImage = "https://k3a409.p.ssafy.io" + this.props.boast.profileImage;
    }
    return (
      <Sdiv className="col-md-4 col-lg-3 ">
        <Mp>
          <ProfileImg src={profileImage} />
          {this.props.boast.nickname}
        </Mp>
        <Round>
          <Bdiv
            style={backgroundImage}
            onClick={() =>
              this.props.history.push(`/boast/${this.props.boast.boast.bid}`)
            }
          ></Bdiv>
          <Tdiv>
            <IconBox className="row">
              <Icon>
                <FontAwesomeIcon icon={['far', 'eye']} size='lg' />&nbsp;&nbsp;
                {this.props.boast.boast.views}
              </Icon>
              <Icon>
                {
                  this.props.boast.liked === true ? <FontAwesomeIcon icon={['fas', 'heart']} color="crimson" size='lg' /> : <FontAwesomeIcon icon={['far', 'heart']} size='lg' />
                }
                &nbsp;&nbsp;
                {this.props.boast.boast.likes}
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={['fas', 'comment-dots']} size='lg' />&nbsp;&nbsp;
              </Icon>
            </IconBox>
          </Tdiv>
          <Mp>{this.props.boast.boast.contents}</Mp>
        </Round>
      </Sdiv>
    );
  }
}

export default withRouter(Boast);
