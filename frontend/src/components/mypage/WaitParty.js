import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import api from '../../utils/api';

import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'

class WaitParty extends Component {
  state = {
    parties: [],
  }

  componentDidMount() {
    api.get('/hobby/apply/applicant', {
      headers: {
        accessToken: sessionStorage.getItem('token'),
      }
    }).then(({ data }) => {
      console.log("wait 데이타~" + JSON.stringify(data))
      this.setState({ parties: data });
    }).catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <div>
        {this.state.parties.length > 0 ?
          <GridList cellHeight={200} className="gridList" cols={4}>
            {this.state.parties.map((v, idx) => (
              <GridListTile key={idx}
                onClick={() => this.props.history.push(`/mypage/party/${v.hid}`)}>
                <img src={"https://k3a409.p.ssafy.io" + v.image} alt="" />
                <GridListTileBar
                  title={v.name} />
              </GridListTile>
            ))}
          </GridList>
        : <h1>신청한 파티가 없습니다.</h1> }
      </div>
    )
  }
}

export default withRouter(WaitParty);