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

  return (
    <div>찜한 파티</div>
  )
}

export default LikeParty
