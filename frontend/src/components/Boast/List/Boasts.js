import React, { Component } from 'react';
import Boast from './Boast';
import styled from 'styled-components';

const BoastsBody = styled.div`
  position: relative;
  display: flex;
  width: 90vw;
  justify-content: center;
  align-items: center;
  margin: 50px 5vw;
`;

class Boasts extends Component {

  render() {
    const mapToComponent = data => {
      return data.map((boast, i) => {
        return (<Boast boast={boast} key={i} />);
      });
    }
    return (
      <BoastsBody className="row d-flex justify-content-center">
        {mapToComponent(this.props.boasts)}
      </BoastsBody>
    );
  }
}

export default Boasts;
