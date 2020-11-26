import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import api from 'utils/api';

import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'

function mouseOverHandle(e) {
  e.target.style.opacity = 0.5;
}

function mouseLeaveHandle(e) {
  e.target.style.opacity = 1;
}

class JoinParty extends Component {
  state = {
    parties: [],
  }

  async componentDidMount() {
    let partyList = [];
    // 참가중인 파티
    await api.get('/hobby/enrolment/all', {
      headers: {
        accessToken: sessionStorage.getItem('token'),
      }
    }).then(({ data }) => {
      // console.log("참가한 파티 목록 ", data);
      data.map((party, index) => {
        partyList.push(party);
      })
    }).catch((err) => {
      console.log(err);
    })
    // 내가 연 파티
    await api.get('/hobby/chimi/myParty', {
      headers: {
        accessToken: sessionStorage.getItem('token'),
      }
    }).then(({ data }) => {
      // console.log('내가 연 파티 목록', data.content);
      data.content.map((party) => {
        partyList.push(party);
      })
    }).catch((err) => {
      console.log(err);
    })
    // console.log('party list', partyList);
    this.setState({ parties: partyList });
  }



  render() {
    return (
      <>
        {this.state.parties.length > 0 ?
          <GridList cellHeight={200} className="gridList" cols={4}>
            {this.state.parties.map((v, idx) => (
              <GridListTile key={idx}
                style={{ cursor: "pointer" }}
                onClick={() => this.props.history.push(`/party/join/${v.hid}`)}>
                <img src={"https://k3a409.p.ssafy.io" + v.image} alt=""
                  onMouseOver={mouseOverHandle}
                  onMouseLeave={mouseLeaveHandle}
                />
                <GridListTileBar
                  title={v.name} />
              </GridListTile>
            ))}
          </GridList>
          : <h1>참가중인 파티가 없습니다.</h1>}
      </>
    )
  }
}

export default withRouter(JoinParty)
