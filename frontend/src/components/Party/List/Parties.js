import React, { Component } from 'react';
import styled from "styled-components";
import Party from './Party';

const PartiesBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  height: 100vh;
`

function Parties(props) {
  const {parties} = props;
  console.log(parties);
  return (
    <PartiesBody>
      {parties.map((party, i) => <Party party={party} key={i} />)}
    </PartiesBody>
  )
}

export default Parties;
