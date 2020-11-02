import React from 'react';
// import AuthTemplate from '../../components/auth/AuthTemplate';
import RegisterForm from '../../components/auth/RegisterForm';
import styled from 'styled-components';

const UpdateBlock = styled.div`
  width: 50%;
  margin: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Update = () => {
  return (
    <UpdateBlock>
      <h1>회원정보수정</h1>
      <RegisterForm />
    </UpdateBlock>
  );
};

export default Update;