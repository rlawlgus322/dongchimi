import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { Card, CardDeck } from 'react-bootstrap';

function JoinParty() {
  const { parties, setParties } = useState();

  useEffect(() => {
    api.get('/hobby/enrolment/all', {
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

  return (
    <CardDeck>
      <Card>
        <Link to="/">
          <Card.Img variant="top" src="" />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
          </Card.Body>
        </Link>
      </Card>
      <Card>
        <Link to="/">
          <Card.Img variant="top" src="https://lab.ssafy.com/s03-final/s03p31a409/uploads/3960e6fd2eed33ded85590499d95b729/7FB9DDA2-C9B7-473B-BD78-282A33AA084F-9716-000009E931E8FB4C_file.jpg" />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
          </Card.Body>
        </Link>
      </Card>
      <Card>
        <Link to="/">
          <Card.Img variant="top" src="" />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
          </Card.Body>
        </Link>
      </Card>
      <Card>
        <Link to="/">
          <Card.Img variant="top" src="" />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
          </Card.Body>
        </Link>
      </Card>
    </CardDeck>
  )
}

export default JoinParty
