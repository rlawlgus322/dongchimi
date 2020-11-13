import React, { Component } from 'react';
import api from '../../utils/api';

class WaitParty extends Component {
  state = {
    data: [],
  }

  componentDidMount() {
    api.get('/hobby/apply/applicant', {
      headers: {
        accessToken: sessionStorage.getItem('token'),
      }
    }).then(({ data }) => {
      console.log(data);
      this.setState({ data: data });
    }).catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <div>
        {
          this.state.parties.length > 0 ?
            <GridList cellHeight={200} className="gridList" cols={4}>
              {this.state.parties.map((v, idx) => (
                <GridListTile key={idx}
                  onClick={() => this.props.history.push(`/party/${v.hid}`)}>
                  <img src={"https://k3a409.p.ssafy.io" + v.image} alt="" />
                  <GridListTileBar
                    title={v.name} />
                </GridListTile>
              ))}
            </GridList>
            : <h1>신청한 파티가 없습니다.</h1>
        }
      </div>
    )
  }
}

export default WaitParty;