import React, { Component } from 'react';
import PartyInfo from '../../components/Party/Read/PartyInfo';
import PartyOpener from '../../components/Party/Read/PartyOpener';
import PartyComment from '../../components/Party/Read/PartyComment';
import api from '../../utils/api';

class PartyRead extends Component {
  state = {
    data: [],
  }

  componentDidMount() {
    api.get(`/hobby/chimi/${this.props.match.params.id}`)
      .then(({ data }) => {
        // console.log('party read', data);
        this.setState({ data: data });
      }).catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (
      <>
        <PartyInfo
          type={1}
          data={this.state.data}
        ></PartyInfo>
        <button
          onClick={() => this.props.history.push('/party/update')}
        >수정</button>
        <div className='row'>
          <div className='col-6'>
            <PartyOpener></PartyOpener>
            {this.state.data.chimi !== undefined &&
              <div dangerouslySetInnerHTML={{ __html: this.state.data.chimi.description }} />
            }
          </div>
          <div className='col-6'>
            <PartyComment></PartyComment>
          </div>
        </div>
      </>
    )
  }
}

export default PartyRead;
