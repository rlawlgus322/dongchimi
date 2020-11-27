import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SexyImageCellBody = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 250px;
  transition: left 0.5s ease-in-out;
  background-color: white;
`

const Overlay = styled.div`
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`

const Image = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
`

const ContentOverlay = styled(Link)`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #d0e7ce;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 10px;
  padding-top: 200px;
  transition: all 0.35s ease-in-out;
  opacity: 0;
  font-size:1.5em;
  font-family: 'NanumSquare', sans-serif;
  &:hover{
    opacity: 1;
    padding-top: 10px;
    color: white;
  }
`

function SexyImageCell(props) {
  const { url, className, content, bid } = props;
  return (
    <SexyImageCellBody className={className}>
      <Overlay>
        <Image src={url} />
        <ContentOverlay to={`/boast/${bid}`}>
          {content}
        </ContentOverlay>
      </Overlay>
    </SexyImageCellBody>
  )
}

export default SexyImageCell;