import { styled } from '@material-ui/core';
import React, { Component } from 'react';
import Boast from './Boast';


class Boasts extends Component {
  
  render() {
    const mapToComponent = data => {
      return data.map((boast, i) => {
        return (<Boast boast={boast} key={i} />);
      });
    }
    return (
      <div className="row d-flex justify-content-center">
        
        {mapToComponent(this.props.boasts)}
        
      </div>
    );
  }
}

export default Boasts;
