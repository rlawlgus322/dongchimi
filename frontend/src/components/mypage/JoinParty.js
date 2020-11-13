import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

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
    <div>참가한 파티</div>
  )
}

export default JoinParty
