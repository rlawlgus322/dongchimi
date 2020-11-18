import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import api from 'utils/api';

import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'

class OpenParty extends Component {

  state = {
    parties: [],
  }

  componentDidMount() {
    api.get('/hobby/chimi/myParty', {
      headers: {
        accessToken: sessionStorage.getItem('token'),
      }
    }).then(({ data }) => {
      this.setState({ parties: data.content });
    }).catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <>
        {
          this.state.parties.length > 0 ?
            <GridList cellHeight={200} className="gridList" cols={4}>
              {this.state.parties.map((v, idx) => (
                <GridListTile key={idx}
                  onClick={() => this.props.history.push(`/party/open/${v.hid}`)}>
                  <img src={"https://k3a409.p.ssafy.io" + v.image} alt="" />
                  <GridListTileBar
                    title={v.name} />
                </GridListTile>
              ))}
            </GridList>
            : <h1>내가 연 파티가 없습니다.</h1>
        }
      </>
    )
  }
}

export default withRouter(OpenParty)
