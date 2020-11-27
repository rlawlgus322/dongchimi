import React from 'react';
import styled from "styled-components";

const SearchOverlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
`

const CloseButton = styled.button`
  position: absolute;
  top: 40px;
  width: 50px;
  height: 50px;
  background-color: #333333;
  border-radius: 50%;
  color: white;
  font-size: 1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 4px;
`

const SearchBar = styled.input`
  background-color: rgba(0,0,0,0);
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 2px solid #333333;
  height: 65px;
  width: 520px;
  color: #757575;
  font-size: 40px;
  &:focus{
    outline: none;
  }
`


export default (props) => {
  const {closeSearch} = props;

  return (
    <SearchOverlay>
      <CloseButton onClick={closeSearch}>⨉</CloseButton>
      <SearchBar placeholder="검색어를 입력해 주세요..."/>
    </SearchOverlay>
  )
}