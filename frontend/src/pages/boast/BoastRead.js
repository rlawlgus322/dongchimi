import React from 'react';
import BoastComment from '../../components/Boast/Read/BoastComment';
import UserInfoBar from 'components/UserInfoBar';
import styled from 'styled-components';

const BoastReadBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: teal;
  width: 100%;
`;

function BoastRead() {
  return (
    <BoastReadBody>
      <UserInfoBar
        thumbnail="https://avatars0.githubusercontent.com/u/33210021?s=60&v=4"
        id="hideOnBush"
      />
      <div>
        <BoastComment></BoastComment>
      </div>
    </BoastReadBody>
  );
}

export default BoastRead;
