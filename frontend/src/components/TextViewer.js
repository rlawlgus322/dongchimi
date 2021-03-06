import React from 'react';
import styled from 'styled-components';

const TextViewerBody = styled.div`
  // background-color: ivory;
  width: 100%;
  height: 6em;
  margin-top : 20px;
`;

function TextViewer(props) {
  const { text } = props;

  return <TextViewerBody>{text}</TextViewerBody>;
}

export default TextViewer;
