import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
// import ReactDOM from 'react-dom';
import OpenParty from './OpenParty';
import JoinParty from './JoinParty';
import JoinedParty from './JoinedParty';
import LikeParty from './LikeParty';

const obj = {
  0: <OpenParty />,
  1: <JoinParty />,
  2: <JoinedParty />,
  3: <LikeParty />,
}

class MypageTab extends Component {
  state = {
    activeTab: 0,
  }
  clickHandler = (id) => {
    this.setState({
      activeTab: id
    })
  }
  render() {
    return (
      <Nav className="wrapper">
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link onClick={() => this.clickHandler(0)}>내가 연 파티</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => this.clickHandler(1)}>참가한 파티</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => this.clickHandler(2)}>참가했던 파티</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => this.clickHandler(3)}>찜한 파티</Nav.Link>
          </Nav.Item>
        </Nav>
        <div className="contents">{obj[this.state.activeTab]}</div>
      </Nav>
    );
  }
}

export default MypageTab
