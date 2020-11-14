import React, { Component } from 'react';
import FaceChat from '../../components/Room/FaceChat';
import TextChat from '../../components/Room/TextChat';
import api from '../../utils/api';

class PartyRoom extends Component {
  state = {
    name: '',
  }
  componentDidMount() {
    api.get('/auth/userinfo', {
      headers: {
        accessToken: sessionStorage.getItem('token'),
      }
    }).then(({ data }) => {
      console.log('userinfo', data);
      this.setState({ name: data.nickname });
    }).catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <div style={{ overflow: "hidden" }}>
        <div className="row">
          <div className="col-md-8">
            <FaceChat roomID={this.props.match.params.id} />
          </div>
          <div className="col-md-4">
            {
              this.state.name !== '' &&
              <TextChat
                roomID={this.props.match.params.id}
                name={this.state.name}
              />
            }
          </div>
        </div>
      </div>
    )
  }
}

export default PartyRoom;