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
  border-radius: 30px;
`;

const Mp = styled.p`
  margin: 0px;
`;

class Boast extends Component {
  render() {
    const backgroundImage = {
      backgroundImage: `url(${this.props.boast.Boast.postImg})`,
    };
    return (
      <Sdiv className="col-md-4 col-lg-3 ">
        <Mp>사진 {this.props.boast.username}</Mp>
        <Bdiv
          style={backgroundImage}
          onClick={() =>
            this.props.history.push(`/boast/${this.props.boast.Boast.bid}`)
          }
        ></Bdiv>
        <FontAwesomeIcon icon={['far', 'eye']} />
        <FontAwesomeIcon icon={['far', 'heart']} />
        <FontAwesomeIcon icon={['fas', 'heart']} />
        <FontAwesomeIcon icon={['fas', 'comment-dots']} />
        <Mp>{this.props.boast.Boast.title}</Mp>
      </Sdiv>
    );
  }
}

export default withRouter(Boast);
