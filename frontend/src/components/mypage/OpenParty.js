import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

function OpenParty() {
  const { parties, setParties } = useState();

  useEffect(() => {
    api.get('/hobby/chimi/myParty', {
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
    <div>내가 연 파티</div>
  )
}

export default OpenParty
