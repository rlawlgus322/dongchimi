import React, {useState} from 'react';
import { Link, withRouter } from "react-router-dom";
import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 80px;
  margin-top: -50px;
  padding: 0px 10px;
  border: 1px solid lightgray;
`

const Logo = styled(Link)`
  margin-right: auto;
  font-size: 2rem;
`

const List = styled.ul`
  position: relative;
  display: flex;
  list-style: none;
  margin: 0;
`

const Curtain = styled.div`
  position: absolute;
  background-color: white;
  width: 110%;
  height: ${props => (props.isMenuOpened ? "0%" : "150%")};
  bottom: -5px;
  left: -5px;
  transition: all 0.2s ease-in-out;
`

const Item = styled.li`
  & + &{
    margin-left: 10px;
  }
  box-sizing: border-box;
  font-weight: ${props => (props.current ? "600" : "400")}
`

const Bold = styled.span`
  font-weight: 600;
`

const SLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  &:hover{
    opacity: 0.8;
  }
  font-size: inherit;
  margin: 0px 10px;
`

const MenuToggleButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 60px;
  margin-right: 30px;
`

const SearchButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`


export default withRouter(({location:{pathname}}) => {
  const [isMenuOpened, setIsMenuOpend] = useState(true);

  return(
    <Header>
      <Logo><Bold>DONG</Bold>CHIMI</Logo>
      <List isMenuOpened={isMenuOpened}>
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
        <Curtain isMenuOpened={isMenuOpened}/>
      </List>

      <MenuToggleButton onClick={() => setIsMenuOpend(!isMenuOpened)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"/></svg>
      </MenuToggleButton>
      <SearchButton>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468 4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396 3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665 5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z"/></svg>
      </SearchButton>
    </Header>
  )}
);