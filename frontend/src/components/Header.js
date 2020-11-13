import React from 'react';
import { Link, withRouter } from "react-router-dom";
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: teal;
`

const List = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
`

const Item = styled.li`
  border-bottom: 5px solid ${props => (props.current ? "pink" : "transparent")};
  & + &{
    margin-left: 10px;
  }
  box-sizing: border-box;
`

const SLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
`

const MenuToggleButton = styled.button`

`

export default withRouter(({location:{pathname}}) => (
  <Header>
    <List>
      <Item current={pathname === "/"}>
        <SLink to="/">홈</SLink>
      </Item>
      <Item current={pathname === "/party"}>
        <SLink to="/party">파티</SLink>
      </Item>
      <Item current={pathname === "/boast"}>
        <SLink to="/boast">자랑게시판</SLink>
      </Item>
      <Item current={pathname === "/mypage"}>
        <SLink to="/mypage">마이페이지</SLink>
      </Item>
    </List>

    <MenuToggleButton>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"/></svg>
    </MenuToggleButton>
  </Header>
));