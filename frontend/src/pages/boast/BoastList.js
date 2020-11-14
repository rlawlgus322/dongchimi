import React, { Component } from 'react';
import Boasts from '../../components/Boast/List/Boasts';
// import { withRouter } from 'react-router-dom';
import api from 'utils/api';

class BoastList extends Component {
  state = {
    data: [],
  }

  componentDidMount() {
    api.get('/boast/all', {
      headers: {
        accessToken: sessionStorage.getItem('token'),
      }
    }).then(({ data }) => {
      console.log('boast list', data);
      this.setState({ data: data });
    }).catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <>
        자랑하기
        <div style={{ textAlign: "right" }}>
          {/** 정렬 기준 */}
          정렬 기준
          <select>
            <option>최신순</option>
          </select>
          {
            sessionStorage.getItem('token') !== null &&
            <button
              onClick={() => this.props.history.push('/boast/write')}
            >글쓰기</button>
          }
        </div>
        <Boasts boasts={this.state.data}></Boasts>
      </>
    );
  }
}

export default BoastList;

