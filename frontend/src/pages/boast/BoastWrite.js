import React from 'react';
import styled from 'styled-components';
import ImageUploader from 'components/ImageUploader';

const BoastWriteBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 90vh;
  padding-top: 20px;
  box-sizing:border-box;
`;

function BoastWrite() {
  
  return <BoastWriteBody>
    <ImageUploader/>
  </BoastWriteBody>
}

export default BoastWrite;
