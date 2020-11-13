import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

function LikeParty() {
  const { parties, setParties } = useState();

  useEffect(() => {
    api.get('/hobby/storage', {
      headers: {
        accessToken: sessionStorage.getItem('token'),
      }
    }).then(({ data }) => {
      console.log(data);
      setParties(data);
    }).catch((err) => {
      console.log(err);
    })
  }, []);

  render() {
    return (
      <>
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
            : <h1>찜한 파티가 없습니다.</h1>
        }
      </>
    )
  }
}

export default LikeParty