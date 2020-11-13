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
      <>
        신청한 파티
      </>
    )
  }
}

export default WaitParty;