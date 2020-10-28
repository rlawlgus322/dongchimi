import React, { Component } from 'react';
import '../../styles/partycard.css';

class Party extends Component {
  render() {
    const backgroundImage = {
      backgroundImage: `url(${this.props.party.imgSrc})`
    }
    return (
      <div className="col-md-4 col-lg-3 item">
        <div className="box" style={backgroundImage}>
          <div className="cover">
            <h3 className="name">{this.props.party.name}</h3>
            <p className="title">{this.props.party.bangjang}</p>
            <p className="title">모집인원 : {this.props.party.total}</p>
          </div>
        </div>
      </div>
    )
  }
}


class Parties extends Component {
  state = {
    parties: this.props.parties,
  }
  render() {
    console.log(this.state.parties);
    const mapToComponent = data => {
      return data.map((party, i) => {
        return (<Party party={party} key={i} />);
      });
    }
    return (
      <div className="row people d-flex justify-content-center">
        {mapToComponent(this.state.parties)}
      </div>
    )
  }
}

export default Parties;