import React, { Component } from 'react';
import Party from './Party';

class Parties extends Component {
  render() {
    // console.log(this.state.parties);
    const mapToComponent = data => {
      return data.map((party, i) => {
        return (<Party party={party} key={i} />);
      });
    }
    return (
      <div className="row chimi d-flex justify-content-center">
        {mapToComponent(this.props.parties)}
      </div>
    )
  }
}

export default Parties;
