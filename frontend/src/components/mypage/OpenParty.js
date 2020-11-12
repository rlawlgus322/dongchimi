import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import { Card, CardDeck } from 'react-bootstrap';
import api from '../../utils/api';

import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'

class OpenParty extends Component {

  // const [parties, setParties] = useState([]);
  state = {
    parties: [],
  }

  // useEffect(() => {
  //   api.get('/hobby/chimi/myParty', {
  //     headers: {
  //       accessToken: sessionStorage.getItem('token'),
  //     }
  //   }).then(({data}) => {
  //     // console.log("res",res);
  //     // console.log("파티 데이터 " + JSON.stringify(res.data))
  //     console.log("파티 데이터 ", data)
  //     setParties(data)
  //     console.log("파티 ", parties)
  //   }).catch((err) => {
  //     console.log(err);
  //   })
  // }, []);
  
  componentDidMount() {
    api.get('/hobby/chimi/myParty', {
      headers: {
        accessToken: sessionStorage.getItem('token'),
      }
    }).then(({data}) => {
      // console.log("res",res);
      // console.log("파티 데이터 " + JSON.stringify(res.data))
      // console.log("파티 데이터 ", data.content)
      this.setState({parties: data.content});
      // setParties(data)
      // console.log("파티 ", this.state.parties)
    }).catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <>
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
        // <CardDeck className="deck" cols={4}>
        //   {this.state.parties.map((v, idx) => {
        //     const imageUrl = "https://k3a409.p.ssafy.io" + v.image
        //     return (
        //       <Card className="card" key={idx}
        //         onClick={() => this.props.history.push(`/mypage/party/${v.hid}`)}>
        //         <Card.Img variant="top" src={imageUrl} />
        //         <Card.Body>
        //           <Card.Title>{v.name}</Card.Title>
        //         </Card.Body>
        //       </Card>
        //     )
        //   })}
        // </CardDeck>
      : <h1>내가 연 파티가 없습니다.</h1> } 
      </>
    )
  }
}

export default withRouter(OpenParty)