import React from 'react';
import styled from 'styled-components';

const UserInfoBarBody = styled.div`
  display: flex;
  width: 100%;
  margin: 10px 0;
`;

const Thumbnail = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;
const UserId = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MoreButton = styled.button`
  border: none;
  background: none;
  margin-left: auto;
  &:focus {
    outline: none;
  }
`;

function UserInfoBar(props) {
  const { thumbnail, id, isMoreButton } = props;

  return (
    <UserInfoBarBody>
      <Thumbnail src={thumbnail} alt="User thumbnail" />
      <UserId>{id}</UserId>
      {isMoreButton && <MoreButton>•••</MoreButton>}
    </UserInfoBarBody>
  );
}

export default UserInfoBar;
