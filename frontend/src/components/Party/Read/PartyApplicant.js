import { Component } from "react";
import React from "react";
import api from '../../../utils/api';

class PartyApplicant extends Component {
  state = {
    data: [],
  }
  componentDidMount() {
    api.get('/hobby/apply/moderator', {
      headers: {
        accessToken: sessionStorage.getItem('token'),
      }
    }).then(({ data }) => {
      console.log(data);
    }).catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <>
      </>
    )
  }
}

export default PartyApplicant;