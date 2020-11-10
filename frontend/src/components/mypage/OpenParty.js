import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardDeck } from 'react-bootstrap';
import api from '../../utils/api';

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
        console.log("파티 데이터 ", data)
        this.setState({parties: data.content});
        // setParties(data)
        console.log("파티 ", this.state.parties)
      }).catch((err) => {
        console.log(err);
      })

  }

  render() {
    return (
      <div>
        <CardDeck>
          {this.state.parties.map((v) => {
            const imageUrl = "https://k3a409.p.ssafy.io" + v.image
            return(
              <Card>
                <Link to="/mypage/party">
                  <Card.Img variant="top" src={imageUrl} />
                  <Card.Body>
                    <Card.Title>{v.name}</Card.Title>
                  </Card.Body>
                </Link>
              </Card>
            )
          })}
        </CardDeck>
      </div>
    )
  }
}

export default OpenParty
