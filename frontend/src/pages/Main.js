import React, { Component } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import LoginModal from '../components/mypage/LoginModal';

const MainBody = styled.div`
`
function Main() {
  
  const logged = sessionStorage.getItem('token') === null;

  return (
    <MainBody></MainBody>
  )
}

export default Main;

