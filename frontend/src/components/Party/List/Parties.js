import React from 'react';
import styled from 'styled-components';
import Party from './Party';

const PartiesBody = styled.div`
  position: relative;
  display: flex;
  width: 100vw;
  height: 70vh;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const FlexBox = styled.div`
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  width: 100%;
  height: 100%;
`;

function Parties(props) {
  const { parties1, parties2, isEven } = props;
  const timeInterval = 50;
  return (
    <PartiesBody>
      <FlexBox>
        {parties1 &&
          parties1.map((party, i) => (
            <Party
              party={party}
              key={i}
              delay={i * timeInterval}
              isShow={!isEven}
            />
          ))}
      </FlexBox>
      <FlexBox>
        {parties2 &&
          parties2.map((party, i) => (
            <Party
              party={party}
              key={i}
              delay={i * timeInterval}
              isShow={isEven}
            />
          ))}
      </FlexBox>
    </PartiesBody>
  );
}

export default Parties;
