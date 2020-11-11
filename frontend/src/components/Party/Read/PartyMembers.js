import React, { Component } from 'react';
import api from '../../../utils/api';

class PartyMembers extends Component {

  componentDidMount() {
    api.get(`/hobby/enrolment/${this.props.hid}`)
      .then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      })
  }
  render() {
    return (
      <div>멤버 목록</div>
    )
  }
}

export default PartyMembers;
