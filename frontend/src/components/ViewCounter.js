import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ViewCounterBody = styled.div`
  display: flex;
  margin: 0px 5px;
`;

const ViewIcon = styled.span`
  margin-right: 5px;
`;

function ViewCounter(props) {
  const { count } = props;

  return (
    <ViewCounterBody>
      <ViewIcon>
        <FontAwesomeIcon icon={['far', 'eye']} size="lg" color="#7dbb77" />
      </ViewIcon>
      {count}
    </ViewCounterBody>
  );
}

export default ViewCounter;
