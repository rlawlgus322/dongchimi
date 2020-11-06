import React, { Component } from 'react';
import Boast from './Boast';

class Boasts extends Component {
  state = {
    boasts: this.props.boasts,
  }
  render() {
    const mapToComponent = data => {
      return data.map((boast, i) => {
        return (<Boast boast={boast} key={i} />);
      });
    }
    return (
      <div className="row d-flex justify-content-center">
        {mapToComponent(this.state.boasts)}
      </div>
    );
  }
}

export default Boasts;